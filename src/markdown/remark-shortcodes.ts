import { SitemapService, renderSitemapTreeHtml, renderSinglesTreeHtml } from '../services/sitemap-service'

interface NodeLike {
  type?: string
  value?: string
  data?: Record<string, any>
  children?: NodeLike[]
}

export function createRemarkShortcodesPlugin (projectRoot: string) {
  const sitemapService = new SitemapService(projectRoot)
  const baseModel = sitemapService.buildModel()
  const supportedLanguages = baseModel.languages
  const defaultLang = baseModel.defaultLang

  return () => {
    return (tree: NodeLike, file: any) => {
      const lang = detectLangFromFile(file.path || '', supportedLanguages, defaultLang)
      walk(tree, (node, parent) => {
        if (!parent || !Array.isArray(parent.children)) return
        const siblings = parent.children

        if (node.type === 'heading' && typeof (node as any).depth === 'number' && (node as any).depth === 1) {
          (node as any).depth = 2
          return
        }

        if (node.type === 'link') {
          const child = node.children?.[0]
          const index = siblings.indexOf(node)
          const nextNode = index >= 0 ? siblings[index + 1] : undefined

          const readClassList = (): string[] => {
            const classValue = ((node.data || {}).hProperties || {}).className
            if (Array.isArray(classValue)) return classValue.map((item) => String(item))
            if (typeof classValue === 'string' && classValue.trim() !== '') return classValue.split(/\s+/)
            return []
          }

          const assignClassList = (values: string[]) => {
            node.data = {
              ...(node.data || {}),
              hProperties: {
                ...((node.data || {}).hProperties || {}),
                className: Array.from(new Set(values.filter(Boolean)))
              }
            }
          }

          const applyClassesFromAttributeBlock = () => {
            if (!nextNode || nextNode.type !== 'text' || typeof nextNode.value !== 'string') return
            const match = nextNode.value.match(/^\s*\{([^}]+)\}(.*)$/)
            if (!match?.[1]) return
            const classes = match[1]
              .split(/\s+/)
              .map((token) => token.trim())
              .filter((token) => token.startsWith('.'))
              .map((token) => token.slice(1))
              .filter(Boolean)
            if (classes.length === 0) return

            assignClassList([...readClassList(), ...classes])

            const rest = (match[2] || '').trimStart()
            if (rest) {
              nextNode.value = rest
            } else if (index >= 0) {
              siblings.splice(index + 1, 1)
            }
          }

          if (node.children?.length === 1 && child?.type === 'text' && typeof child.value === 'string') {
            const match = child.value.match(/^\[(.+)\]$/)
            if (match?.[1]) {
              child.value = match[1]
              assignClassList([...readClassList(), 'is-button'])
            }
          }
          applyClassesFromAttributeBlock()
          return
        }

        if (node.type === 'text' && typeof node.value === 'string') {
          const value = node.value
          if (!value.includes('{{')) return

          const pieces: NodeLike[] = []
          let cursor = 0
          const regex = /{{\s*([a-zA-Z0-9_:-]+)\s*}}/g
          let match: RegExpExecArray | null

          while ((match = regex.exec(value)) !== null) {
            const index = match.index
            if (index > cursor) {
              pieces.push({ type: 'text', value: value.slice(cursor, index) })
            }

            const token = match[1]
            if (token === 'sitemap_tree') {
              const model = sitemapService.buildModel(lang)
              const html = renderSitemapTreeHtml(model)
              pieces.push({
                type: 'html',
                value: `${html}<script>(function(){if(window.__taiaSitemapObfInit)return;window.__taiaSitemapObfInit=true;document.addEventListener('click',function(event){var trigger=event.target&&event.target.closest?event.target.closest('[data-obf]'):null;if(!trigger)return;try{var value=atob((trigger.getAttribute('data-obf')||'').split('').reverse().join(''));if(!value)return;window.location.href=value}catch(e){}})})();</script>`
              })
            } else if (token === 'singles_tree') {
              const model = sitemapService.buildModel(lang)
              const html = renderSinglesTreeHtml(model)
              pieces.push({
                type: 'html',
                value: `${html}<script>(function(){if(window.__taiaSitemapObfInit)return;window.__taiaSitemapObfInit=true;document.addEventListener('click',function(event){var trigger=event.target&&event.target.closest?event.target.closest('[data-obf]'):null;if(!trigger)return;try{var value=atob((trigger.getAttribute('data-obf')||'').split('').reverse().join(''));if(!value)return;window.location.href=value}catch(e){}})})();</script>`
              })
            } else {
              pieces.push({ type: 'text', value: match[0] })
            }

            cursor = regex.lastIndex
          }

          if (cursor < value.length) {
            pieces.push({ type: 'text', value: value.slice(cursor) })
          }

          const indexInParent = siblings.indexOf(node)
          if (indexInParent >= 0 && pieces.length > 0) {
            siblings.splice(indexInParent, 1, ...pieces)
          }
        }
      })
    }
  }
}

function walk (node: NodeLike, visitor: (node: NodeLike, parent?: NodeLike) => void, parent?: NodeLike): void {
  visitor(node, parent)
  if (!Array.isArray(node.children)) return
  for (const child of node.children) {
    walk(child, visitor, node)
  }
}

function detectLangFromFile (filePath: string, languages: string[], defaultLang: string): string {
  const match = filePath.match(/\.([a-zA-Z-]+)\.mdx?$/)
  const lang = match?.[1]
  if (lang && languages.includes(lang)) return lang
  return defaultLang
}
