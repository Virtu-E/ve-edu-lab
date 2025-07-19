import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'

const selectSearchState = (state: RootState) => state.search

export const selectSearchTerm = createSelector(
    [selectSearchState],
    (search) => search.searchTerm
)

export const selectDebouncedSearchTerm = createSelector(
    [selectSearchState],
    (search) => search.debouncedSearchTerm
)

export const selectShowDropdown = createSelector(
    [selectSearchState],
    (search) => search.showDropdown
)

export const selectHoveredIndex = createSelector(
    [selectSearchState],
    (search) => search.hoveredIndex
)

export const selectIsLoading = createSelector(
    [selectSearchState],
    (search) => search.isLoading
)

export const selectSearchResults = createSelector(
    [selectSearchState],
    (search) => search.searchResults
)

export const selectSearchError = createSelector(
    [selectSearchState],
    (search) => search.searchError
)

export const selectTotalResults = createSelector(
    [selectSearchState],
    (search) => search.totalResults
)

export const selectHasResults = createSelector(
    [selectSearchResults],
    (results) => Object.values(results).some((arr) => arr.length > 0)
)

export const selectAllItems = createSelector(
    [selectSearchResults],
    (results) => {
        const items = [
            ...results.courses,
            ...results.topics,
            ...results.subtopics,
            ...results.learning_objectives,
        ]

        return items.sort(
            (a, b) =>
                (b.rank || b.similarity || 0) - (a.rank || a.similarity || 0)
        )
    }
)

export const selectShouldShowResults = createSelector(
    [
        selectShowDropdown,
        selectSearchTerm,
        selectDebouncedSearchTerm,
        selectIsLoading,
    ],
    (
        showDropdown: boolean,
        searchTerm: string,
        debouncedSearchTerm: string,
        isLoading: boolean
    ): boolean =>
        Boolean(
            showDropdown &&
                searchTerm.length > 0 &&
                (debouncedSearchTerm.length > 0 || isLoading)
        )
)
