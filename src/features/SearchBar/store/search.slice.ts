import { SearchResult } from '@core/models'
import { createSlice } from '@reduxjs/toolkit'

interface SearchState {
    searchTerm: string
    debouncedSearchTerm: string
    showDropdown: boolean
    hoveredIndex: number
    isLoading: boolean
    searchResults: SearchResult
    searchError: string | null
    totalResults: number
}
const initialState: SearchState = {
    searchTerm: '',
    debouncedSearchTerm: '',
    showDropdown: false,
    hoveredIndex: -1,
    isLoading: false,
    searchResults: {
        courses: [],
        topics: [],
        subtopics: [],
        learning_objectives: [],
    },
    searchError: null,
    totalResults: 0,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
            state.hoveredIndex = -1
        },
        setDebouncedSearchTerm: (state, action) => {
            state.debouncedSearchTerm = action.payload
        },
        setShowDropdown: (state, action) => {
            state.showDropdown = action.payload
            if (!action.payload) {
                state.hoveredIndex = -1
            }
        },
        setHoveredIndex: (state, action) => {
            state.hoveredIndex = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setSearchResults: (state, action) => {
            state.searchResults =
                action.payload.results || initialState.searchResults
            state.totalResults = action.payload.total_results || 0
            state.searchError = null
        },
        setSearchError: (state, action) => {
            state.searchError = action.payload
            state.searchResults = initialState.searchResults
            state.totalResults = 0
        },
        clearSearch: (state) => {
            state.searchTerm = ''
            state.debouncedSearchTerm = ''
            state.showDropdown = false
            state.hoveredIndex = -1
            state.searchResults = initialState.searchResults
            state.searchError = null
            state.totalResults = 0
        },
        navigateResults: (state, action) => {
            const { direction, totalItems } = action.payload
            if (direction === 'down') {
                state.hoveredIndex =
                    state.hoveredIndex < totalItems - 1
                        ? state.hoveredIndex + 1
                        : 0
            } else if (direction === 'up') {
                state.hoveredIndex =
                    state.hoveredIndex > 0
                        ? state.hoveredIndex - 1
                        : totalItems - 1
            }
        },
    },
})

export const {
    setSearchTerm,
    setDebouncedSearchTerm,
    setShowDropdown,
    setHoveredIndex,
    setIsLoading,
    setSearchResults,
    setSearchError,
    clearSearch,
    navigateResults,
} = searchSlice.actions

export default searchSlice.reducer
