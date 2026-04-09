import { createDirectus, rest, readItems } from '@directus/sdk'

let directusClient: ReturnType<typeof createDirectus> | null = null

export function useDirectus() {
  const config = useRuntimeConfig()
  if (!directusClient) {
    directusClient = createDirectus(config.public.directusUrl).with(rest())
  }
  return directusClient
}

export async function usePage(slug: string, locale = 'da') {
  const directus = useDirectus()
  const items = await (directus as any).request(
    readItems('pages', {
      filter: { slug: { _eq: slug } },
      fields: ['*', 'translations.*'],
    }),
  )
  return items?.[0] || null
}

export async function useSeoData(slug: string) {
  const directus = useDirectus()
  const items = await (directus as any).request(
    readItems('seo', {
      filter: { slug: { _eq: slug } },
      fields: ['*', 'translations.*'],
    }),
  )
  return items?.[0] || null
}
