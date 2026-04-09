export function useProducts(filters?: { category?: string; min_price?: number; max_price?: number }) {
  const medusa = useMedusa()
  const route = useRoute()

  const query: Record<string, any> = {
    limit: 20,
    expand: 'variants,variants.prices,images',
  }

  const category = filters?.category || (route.query.category as string)
  const minPrice = filters?.min_price || Number(route.query.min_price) || undefined
  const maxPrice = filters?.max_price || Number(route.query.max_price) || undefined

  if (category) query.category_id = [category]

  const { data: productsData, pending } = useAsyncData(
    `products-${category}-${minPrice}-${maxPrice}`,
    () => medusa.products.list(query),
  )

  const { data: categoriesData } = useAsyncData(
    'product-categories',
    () => medusa.productCategories.list({ limit: 100 }),
  )

  const products = computed(() => productsData.value?.products || [])
  const categories = computed(() => categoriesData.value?.product_categories || [])

  return { products, categories, pending }
}

export function useProduct(handle: string) {
  const medusa = useMedusa()

  const { data, pending } = useAsyncData(
    `product-${handle}`,
    () => medusa.products.list({ handle, expand: 'variants,variants.prices,images,categories' }),
  )

  const product = computed(() => data.value?.products?.[0] || null)

  return { product, pending }
}
