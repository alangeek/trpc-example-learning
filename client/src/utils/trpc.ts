import { createReactQueryHooks } from '@trpc/react'

import { AppRouter } from '../../../server/src/index'

export const trpc = createReactQueryHooks<AppRouter>()