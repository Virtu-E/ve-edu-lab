import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchTerm } from '@features/SearchBar/store/search.selectors'
import { setDebouncedSearchTerm } from '@features/SearchBar/store/search.slice'
import useDebounce from '@core/hooks/useDebounce'

export const useSearchDebounce = (delay = 300) => {
    const dispatch = useDispatch()
    const searchTerm = useSelector(selectSearchTerm)

    const debouncedSetSearch = useDebounce((term) => {
        dispatch(setDebouncedSearchTerm(term))
    }, delay)

    useEffect(() => {
        debouncedSetSearch(searchTerm)
    }, [searchTerm, debouncedSetSearch])
}
