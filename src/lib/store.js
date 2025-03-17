import {proxy} from 'valtio'
import { devtools } from 'valtio/utils'

export const store = proxy({
    userId: 1,
})

devtools(store, { name: 'My Store' })

