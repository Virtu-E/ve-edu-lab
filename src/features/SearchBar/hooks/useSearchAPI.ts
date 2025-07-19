import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchContentQuery } from '@core/services/search.api'
import {
    selectDebouncedSearchTerm,
    selectIsLoading,
} from '@features/SearchBar/store/search.selectors'
import {
    setIsLoading,
    setSearchError,
    setSearchResults,
} from '@features/SearchBar/store/search.slice'

export const useSearchAPI = () => {
    const dispatch = useDispatch()
    const debouncedSearchTerm = useSelector(selectDebouncedSearchTerm)
    const isLoadingState = useSelector(selectIsLoading)

    const {
        data: searchData,
        error: searchError,
        isLoading: searchLoading,
        isFetching: searchFetching,
    } = useSearchContentQuery(
        { q: debouncedSearchTerm },
        {
            skip: !debouncedSearchTerm || debouncedSearchTerm.length < 2,
            refetchOnMountOrArgChange: true,
        }
    )

    useEffect(() => {
        const isLoading = searchLoading || searchFetching
        if (isLoading !== isLoadingState) {
            dispatch(setIsLoading(isLoading))
        }
    }, [searchLoading, searchFetching, isLoadingState, dispatch])

    useEffect(() => {
        if (searchError) {
            dispatch(setSearchError(searchError))
        } else if (searchData) {
            dispatch(setSearchResults(searchData))
        }
    }, [searchData, searchError, dispatch])

    return {
        isLoading: searchLoading || searchFetching,
        error: searchError,
        data: searchData,
    }
}
