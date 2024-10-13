import { ProductResponse } from '@/lib/utils/types'
import { createAction } from '@reduxjs/toolkit'

export const updateSearchAction = createAction<string>('search/updateSearchAction')
export const updateMinPriceAction = createAction<number>('search/updateMinPriceAction')
export const updateMaxPriceAction = createAction<number>('search/updateMaxPriceAction')
export const updateResultsAction = createAction<ProductResponse[]>('search/updateResultsAction')
export const updateRecentSearchesAction = createAction<string[]>('search/updateRecentSearchesAction')
