import { configureStore } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import { useDispatch } from 'react-redux'
import search from './search/reducer'

const PERSISTED_KEYS: string[] = ['search']

const store = configureStore({
    reducer: {
        search,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
    preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true }),
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
