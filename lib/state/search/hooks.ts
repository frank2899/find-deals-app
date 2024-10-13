import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { AppDispatch, AppState } from '..'
import { updateMaxPriceAction, updateMinPriceAction, updateRecentSearchesAction, updateResultsAction, updateSearchAction } from './actions'
import { ProductResponse } from '@/lib/utils/types'

type SearchState = [
    string,
    number,
    number,
    ProductResponse[],
    string[],
    (payload: string) => void,
    (payload: number) => void,
    (payload: number) => void,
    (payload: ProductResponse[]) => void,
    (payload: string) => void
]

export const useSearchState = (): SearchState => {
    const dispatch = useDispatch<AppDispatch>()
    const search = useSelector<AppState, AppState['search']['search']>((state) => state.search.search)
    const minPrice = useSelector<AppState, AppState['search']['minPrice']>((state) => state.search.minPrice)
    const maxPrice = useSelector<AppState, AppState['search']['maxPrice']>((state) => state.search.maxPrice)
    const results = useSelector<AppState, AppState['search']['results']>((state) => state.search.results)
    const recentSearches = useSelector<AppState, AppState['search']['recentSearches']>((state) => state.search.recentSearches)

    const setSearch = useCallback(
        (payload: string) => {
            dispatch(updateSearchAction(payload))
        },
        [dispatch],
    )

    const setMinPrice = useCallback(
        (payload: number) => {
            dispatch(updateMinPriceAction(payload))
        },
        [dispatch],
    )

    const setMaxPrice = useCallback(
        (payload: number) => {
            dispatch(updateMaxPriceAction(payload))
        },
        [dispatch],
    )

    const setResults = useCallback(
        (payload: ProductResponse[]) => {
            dispatch(updateResultsAction(payload))
        },
        [dispatch],
    )

    const setRecentSearches = useCallback(
        (payload: string) => {
            let list: string[] = [...recentSearches]

            if(payload){
                list.unshift(payload)
                list = list.slice(0, 10)
            }
            console.log(list)
            dispatch(updateRecentSearchesAction(list))
        },
        [dispatch],
    )

    return [search, minPrice, maxPrice, results, recentSearches, setSearch, setMinPrice, setMaxPrice, setResults, setRecentSearches]
}
