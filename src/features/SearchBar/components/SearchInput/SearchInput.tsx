import React, { useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from 'lucide-react'
import {
    selectIsLoading,
    selectSearchTerm,
} from '@features/SearchBar/store/search.selectors'
import { useClickOutside } from '@features/SearchBar/hooks/useClickOutside'
import {
    setSearchTerm,
    setShowDropdown,
} from '@features/SearchBar/store/search.slice'

const SearchInput = () => {
    const dispatch = useDispatch()
    const searchTerm = useSelector(selectSearchTerm)
    const isLoading = useSelector(selectIsLoading)
    const searchRef = useRef(null)

    useClickOutside(searchRef)

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            const value = e.target.value
            dispatch(setSearchTerm(value))
            dispatch(setShowDropdown(value.length > 0))
        },
        [dispatch]
    )

    const handleInputFocus = useCallback(() => {
        if (searchTerm.length > 0) {
            dispatch(setShowDropdown(true))
        }
    }, [searchTerm, dispatch])

    return (
        <div className="relative" ref={searchRef}>
            <div className="relative group">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Search for courses or topics"
                    className="w-full px-10 py-2.5 text-sm rounded-lg border border-[#e5e7eb] focus:outline-none focus:border-secondary focus:border-textSecondary focus:ring-2 focus:ring-secondary-50 transition-all duration-200 bg-white shadow-sm group-hover:shadow-md font-opensans"
                    aria-label="Search learning content"
                    aria-expanded={false}
                    aria-haspopup="listbox"
                    role="combobox"
                    autoComplete="off"
                />

                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Search
                        size={16}
                        className={`transition-all duration-200 ${
                            isLoading
                                ? 'text-secondary animate-pulse'
                                : searchTerm
                                  ? 'text-secondary'
                                  : 'text-virtu_grey'
                        }`}
                        aria-hidden="true"
                    />
                </div>

                {isLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-textSecondary border-t-transparent"></div>
                    </div>
                )}

                {!searchTerm && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-virtu_grey hidden sm:flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 text-xs font-semibold text-textPrimary bg-gray-100 border border-border rounded">
                            ⌘K
                        </kbd>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchInput
