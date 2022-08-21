import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { trpc } from './utils/trpc'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3001/trpc'
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

function AppContent() {
  const [newProduct, setNewProduct] = useState('')

  const getProducts = trpc.useQuery(['getProducts'])
  const addProduct = trpc.useMutation(['createProduct'])
  const client = trpc.useContext()

  if (getProducts.isLoading) {
    return <h1>Loading...</h1>
  }
  console.log(getProducts)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          console.log(newProduct)
          addProduct.mutate(newProduct, {
            onSuccess(value) {
              client.invalidateQueries(['getProducts'])
            }
          })
        }}
      >
        <input type="text" onChange={e => setNewProduct(e.target.value)} />
        <button>Botãozinho</button>
      </form>
      <h1>{JSON.stringify(getProducts.data)}</h1>
    </div>
  )
}

export default App
