import { createReducer } from '@reduxjs/toolkit'
import { updateMaxPriceAction, updateMinPriceAction, updateRecentSearchesAction, updateResultsAction, updateSearchAction } from './actions'
import { ProductResponse } from '@/lib/utils/types'

export interface SearchState {
    search: string
    minPrice: number
    maxPrice: number
    results: ProductResponse[]
    recentSearches: string[]
}

export const initialState: SearchState = {
    search: '',
    minPrice: 0,
    maxPrice: 0,
    results: [],
    recentSearches: [],
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateSearchAction, (state, { payload }) => {
            state.search = payload
        })
        .addCase(updateResultsAction, (state, { payload }) => {
            state.results = payload
        })
        .addCase(updateMinPriceAction, (state, { payload }) => {
            state.minPrice = payload
        })
        .addCase(updateMaxPriceAction, (state, { payload }) => {
            state.maxPrice = payload
        })
        .addCase(updateRecentSearchesAction, (state, { payload }) => {
            state.recentSearches = payload
        })
)
