import { useContext } from "react"
import { SearchContext } from "../context/searchContext"

export const useSearch = () => {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider')
    }

    return context
}