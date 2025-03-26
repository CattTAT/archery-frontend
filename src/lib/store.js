import {proxy} from 'valtio'
import { devtools } from 'valtio/utils'

export const store = proxy({
  userId: "",
});

devtools(store, { name: 'My Store' })

