import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'
import { useSearchState } from '../state/search/hooks'
import { ProductResponse } from '../utils/types'

interface SearchContextType {
    search: string
    location: string
    minPrice: number
    maxPrice: number
    results: ProductResponse[]
    recentSearches: string[]
    isLoading: boolean
    isErrorFetching: boolean
    handleSearch: (params?: HandleSearchInterace) => Promise<void>
    setSearch: (search: string) => void
    setMinPrice: (minPrice: number) => void
    setMaxPrice: (maxPrice: number) => void
}

export interface HandleSearchInterace {
    minPrice?: number
    maxPrice?: number
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isErrorFetching, setIsError] = useState<boolean>(false)
    const [location, setLocation] = useState<string>('')

    const [search, minPrice, maxPrice, results, recentSearches, setSearch, setMinPrice, setMaxPrice, setResults, setRecentSearches] = useSearchState()

    // Hydration state
    const [hydratedResults, setHydratedResults] = useState<ProductResponse[]>(results)
    const [hydratedRecentSearches, setHydratedRecentSearches] = useState<string[]>(recentSearches)

    // Effect to handle hydration
    useEffect(() => {
        setHydratedResults(results)
        setHydratedRecentSearches(recentSearches)
    }, [results, recentSearches])

    const handleSearch = useCallback(
        async (params?: HandleSearchInterace) => {
            const search_ = search.trim()
            if (search_.length <= 3) return

            try {
                setIsLoading(true)
                setIsError(false)
                setRecentSearches(search_)
                setResults([])

                let url = `/api?keyword=${search}`
                if (!!params?.minPrice && !!params?.maxPrice) url = `${url}&minPrice=${params.minPrice}&maxPrice=${params.maxPrice}`

                const api = await fetch(url)
                const { error, result } = await api.json()

                if (error) throw error

                setResults(result.products as ProductResponse[])
                setLocation(result?.location as string)
            } catch (error) {
                console.error('Search failed:', error)
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        },
        [search, minPrice, maxPrice, setResults, setSearch],
    )

    return (
        <SearchContext.Provider
            value={{
                search,
                location,
                minPrice,
                maxPrice,
                results: hydratedResults,
                recentSearches: hydratedRecentSearches,
                isLoading,
                isErrorFetching,
                handleSearch,
                setSearch,
                setMinPrice,
                setMaxPrice,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}
