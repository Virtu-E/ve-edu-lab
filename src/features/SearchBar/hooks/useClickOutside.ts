import { useEffect, RefObject } from 'react'
import { useDispatch } from 'react-redux'
import { setShowDropdown } from '@features/SearchBar/store/search.slice'

export const useClickOutside = (ref: RefObject<HTMLElement>): void => {
    const dispatch = useDispatch()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                dispatch(setShowDropdown(false))
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [ref, dispatch])
}
