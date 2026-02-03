import type { APIRoute } from 'astro'
import { ConfigService } from '../../services/config-service'

export const GET: APIRoute = async () => {
  const configService = new ConfigService(process.cwd())
  const configYaml = configService.generateConfigYml()

  return new Response(configYaml, {
    headers: {
      'Content-Type': 'text/yaml'
    }
  })
}
