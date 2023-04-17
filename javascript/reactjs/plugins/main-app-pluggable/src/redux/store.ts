import { legacy_createStore as createStore } from '@reduxjs/toolkit'
import reducers from './reducers'

const store = createStore(reducers)

store.subscribe(() => {
    console.log('store changed', store.getState())
})

export default store