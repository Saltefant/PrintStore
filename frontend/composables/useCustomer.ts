export const useCustomer = () => {
  const medusa = useMedusa()
  const customer = useState<any>('customer', () => null)

  async function fetchCustomer() {
    try {
      const { customer: me } = await medusa.customers.retrieve()
      customer.value = me
    } catch {
      customer.value = null
    }
  }

  async function login(email: string, password: string) {
    await medusa.auth.authenticate({ email, password })
    await fetchCustomer()
  }

  async function register(data: { email: string; password: string; first_name: string; last_name: string }) {
    await medusa.customers.create(data)
    await login(data.email, data.password)
  }

  async function logout() {
    await medusa.auth.deleteSession()
    customer.value = null
  }

  if (process.client) {
    fetchCustomer()
  }

  return { customer, login, register, logout, fetchCustomer }
}
