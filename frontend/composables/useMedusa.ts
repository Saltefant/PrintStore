import Medusa from '@medusajs/medusa-js'

let client: Medusa | null = null

export function useMedusa() {
  const config = useRuntimeConfig()
  if (!client) {
    client = new Medusa({
      baseUrl: config.public.medusaBackendUrl,
      maxRetries: 3,
    })
  }
  return client
}
