# TAIA Core

Fundación reutilizable para sitios web Astro de alto rendimiento y optimizados para SEO.

## Características

- 🚀 **Rendimiento primero**: Orientado a puntuaciones de 100/100/100/100 en Lighthouse.
- 🔍 **Listo para SEO**: Meta tags completos, JSON-LD, soporte para sitemap.
- ♿ **Accesible**: Componentes que cumplen con WCAG 2.1 AA.
- 📝 **Validación de contenido**: Esquemas Zod para contenido con tipado seguro.
- 🤖 **Amigable para agentes**: Guías y documentación claras para asistentes IA.

## Instalación

### Como submódulo (recomendado)

```bash
git submodule add https://github.com/seacomoseo/taia-core.git vendor/taia-core
```

### Como paquete npm (futuro)

```bash
pnpm add taia-core
```

## Componentes

| Componente | Descripción |
|------------|-------------|
| `SeoHead` | Meta SEO completo, OG, Twitter, JSON-LD |
| `ResponsiveImage` | Imágenes optimizadas con srcset |
| `SmartLink` | Detección automática interno/externo |
| `SectionShell` | Envoltorio de layout consistente |
| `SkipLink` | Navegación de salto para accesibilidad |
| `FocusOutlines` | Estilos de foco para teclado |

## Layouts

| Layout | Caso de Uso |
|--------|-------------|
| `BaseLayout` | Shell HTML raíz |
| `PageLayout` | Páginas individuales |
| `CollectionLayout` | Listados/archivos con paginación |

## Esquemas

Esquemas Zod para validación de contenido:

```typescript
import { pageSchema, postSchema, productSchema } from 'taia-core/schemas'
```

## Herramientas CLI

```bash
pnpm taia:validate          # Validar contenido contra esquemas
pnpm taia:links             # Comprobar enlaces internos rotos
pnpm taia:lighthouse <url>  # Ejecutar Lighthouse con budgets
```

## Puertas de Calidad

```bash
pnpm lint          # ESLint (StandardJS + TypeScript)
pnpm typecheck     # Verificación de TypeScript
pnpm test          # Tests de Vitest
pnpm build         # Verificación de construcción
```

## Objetivos de Rendimiento

| Métrica | Objetivo |
|---------|----------|
| Rendimiento | ≥ 90 |
| Accesibilidad | 100 |
| Mejores Prácticas | 100 |
| SEO | 100 |
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| TBT | ≤ 200ms |

## Documentación

- [Sistema TAIA](./docs/TAIA_SYSTEM.md) - Visión general de la arquitectura
- [SEO Rails](./docs/SEO_RAILS.md) - Guías de SEO
- [Performance Rails](./docs/PERFORMANCE_RAILS.md) - Optimización de rendimiento
- [Content Rails](./docs/CONTENT_RAILS.md) - Estructura de contenido

## Habilidades del Agente

Ubicadas en `.agent/skills/`:

| Habilidad | Propósito |
|-----------|-----------|
| `skill_project_intake` | Recopilar requisitos |
| `skill_brand_and_copy` | Marca y mensajería |
| `skill_seo_strategy` | Investigación de palabras clave y arquitectura de URLs |
| `skill_ux_review` | Auditoría de UX y accesibilidad |
| `skill_performance_audit` | Pruebas de Lighthouse |
| `skill_cms_schema_generator` | Configuración del CMS |
| `skill_pr_workflow` | Estándares de Pull Request |
| `skill_ecommerce_mvp` | Configuración de e-commerce |

## Licencia

MIT
