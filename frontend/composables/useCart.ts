export const useCart = () => {
  const medusa = useMedusa()
  const cartId = useCookie('medusa_cart_id')
  const cart = useState<any>('cart', () => null)

  async function initCart() {
    if (cartId.value) {
      try {
        const { cart: existingCart } = await medusa.carts.retrieve(cartId.value)
        cart.value = existingCart
        return
      } catch {}
    }
    const { cart: newCart } = await medusa.carts.create({})
    cartId.value = newCart.id
    cart.value = newCart
  }

  async function addToCart(variantId: string, quantity: number) {
    if (!cartId.value) await initCart()
    const { cart: updated } = await medusa.carts.lineItems.create(cartId.value!, {
      variant_id: variantId,
      quantity,
    })
    cart.value = updated
  }

  async function removeFromCart(lineItemId: string) {
    if (!cartId.value) return
    const { cart: updated } = await medusa.carts.lineItems.delete(cartId.value, lineItemId)
    cart.value = updated
  }

  async function updateQuantity(lineItemId: string, quantity: number) {
    if (!cartId.value) return
    if (quantity < 1) {
      await removeFromCart(lineItemId)
      return
    }
    const { cart: updated } = await medusa.carts.lineItems.update(cartId.value, lineItemId, { quantity })
    cart.value = updated
  }

  async function completeCart(shippingAddress: any) {
    if (!cartId.value) throw new Error('No cart')
    await medusa.carts.update(cartId.value, { shipping_address: shippingAddress })
    await medusa.carts.complete(cartId.value)
    cartId.value = null
    cart.value = null
  }

  if (process.client) {
    initCart()
  }

  return { cart, addToCart, removeFromCart, updateQuantity, completeCart, initCart }
}
