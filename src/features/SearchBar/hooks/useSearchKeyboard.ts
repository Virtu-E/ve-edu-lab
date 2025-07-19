import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectAllItems,
    selectHoveredIndex,
    selectShowDropdown,
} from '@features/SearchBar/store/search.selectors'
import {
    navigateResults,
    setShowDropdown,
} from '@features/SearchBar/store/search.slice'

interface SearchItem {
    id: string | number
    [key: string]: any
}

export const useSearchKeyboard = (
    onItemSelect: (item: SearchItem) => void
): void => {
    const dispatch = useDispatch()
    const showDropdown = useSelector(selectShowDropdown)
    const hoveredIndex = useSelector(selectHoveredIndex)
    const allItems = useSelector(selectAllItems) as SearchItem[]

    const handleKeyDown = useCallback(
        (event: KeyboardEvent): void => {
            if (!showDropdown) return

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault()
                    dispatch(
                        navigateResults({
                            direction: 'down',
                            totalItems: allItems.length,
                        })
                    )
                    break
                case 'ArrowUp':
                    event.preventDefault()
                    dispatch(
                        navigateResults({
                            direction: 'up',
                            totalItems: allItems.length,
                        })
                    )
                    break
                case 'Enter':
                    event.preventDefault()
                    if (hoveredIndex >= 0 && allItems[hoveredIndex]) {
                        onItemSelect(allItems[hoveredIndex])
                    }
                    break
                case 'Escape':
                    dispatch(setShowDropdown(false))
                    break
                default:
                    break
            }
        },
        [showDropdown, hoveredIndex, allItems, onItemSelect, dispatch]
    )

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [showDropdown, handleKeyDown])
}
