import express from 'express'
import * as trpc from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import { z } from 'zod'

const app = express()

let products = [
  {
    id: 1,
    name: 'product 1',
    description: 'description 1'
  },
  {
    id: 2,
    name: 'product 2',
    description: 'description 2'
  }
]

const appRouter = trpc
  .router()
  .query('hello', {
    resolve() {
      return 'Hello World é Top de linha'
    }
  })
  .query('getProducts', {
    resolve() {
      // DATABASE QUERY
      // EXTERN URL
      return products
    }
  })
  .mutation('createProduct', {
    input: z.string(),
    resolve({ input }) {
      products.push({
        id: products.length,
        name: input,
        description: ''
      })
      return 'product created'
    }
  })

export type AppRouter = typeof appRouter

app.use(cors())
app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext: () => null,
}))

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Started in port ${port}`)
})