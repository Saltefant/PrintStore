export const useOrders = () => {
  const medusa = useMedusa()

  const { data, pending } = useAsyncData('orders', () =>
    medusa.customers.listOrders(),
  )

  const orders = computed(() => data.value?.orders || [])

  return { orders, pending }
}

export const useOrder = (id: string) => {
  const medusa = useMedusa()

  const { data, pending } = useAsyncData(`order-${id}`, () =>
    medusa.orders.retrieve(id),
  )

  const order = computed(() => data.value?.order || null)

  return { order, pending }
}
