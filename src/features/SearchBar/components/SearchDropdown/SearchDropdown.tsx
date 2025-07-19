import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Search, TrendingUp, Clock } from 'lucide-react'
import {
    selectDebouncedSearchTerm,
    selectHasResults,
    selectIsLoading,
    selectSearchError,
    selectSearchTerm,
    selectShouldShowResults,
    selectTotalResults,
} from '@features/SearchBar/store/search.selectors'
import SearchResultsSection from '@features/SearchBar/components/SearchResultsSection/SearchResultsSection'
import { SearchIcons } from '@features/SearchBar/components/SearchIcons/SearchIcons'

const SearchDropdown = () => {
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Typed selectors
    const shouldShowResults: boolean = useSelector(selectShouldShowResults)
    const searchError: string | null = useSelector(selectSearchError)
    const hasResults: boolean = useSelector(selectHasResults)
    const debouncedSearchTerm: string = useSelector(selectDebouncedSearchTerm)
    const totalResults: number = useSelector(selectTotalResults)
    const isLoading: boolean = useSelector(selectIsLoading)
    const searchTerm: string = useSelector(selectSearchTerm)

    if (!shouldShowResults) return null

    const renderErrorState = (): React.ReactElement => (
        <div className="py-12 text-center font-opensans">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <Search className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm font-medium text-red-600 mb-1">
                Search Error
            </p>
            <p className="text-xs text-red-500">
                Unable to load results. Please try again.
            </p>
        </div>
    )

    const renderResultsHeader = (): React.ReactElement => (
        <div className="px-6 py-3 border-b border-border bg-virtu_grey-50 font-opensans">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-textPrimary">
                    Search Results
                </span>
                <div className="flex items-center gap-3 text-xs text-virtu_grey">
                    <span className="flex items-center gap-1">
                        <TrendingUp size={12} />
                        {totalResults} found
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={12} />
                        for "{debouncedSearchTerm}"
                    </span>
                </div>
            </div>
        </div>
    )

    const renderResultsSections = (): React.ReactElement => (
        <div className="py-2">
            <SearchResultsSection
                title="Courses"
                arrayType="courses"
                iconRenderer={SearchIcons.renderCourseIcon}
            />
            <SearchResultsSection
                title="Topics"
                arrayType="topics"
                iconRenderer={SearchIcons.renderTopicIcon}
            />
            <SearchResultsSection
                title="Subtopics"
                arrayType="subtopics"
                iconRenderer={SearchIcons.renderSubtopicIcon}
            />
            <SearchResultsSection
                title="Learning Objectives"
                arrayType="learning_objectives"
                iconRenderer={SearchIcons.renderLearningObjectiveIcon}
            />
        </div>
    )

    const renderNoResultsState = (): React.ReactElement => (
        <div className="py-12 text-center font-opensans">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-virtu_grey-100 flex items-center justify-center">
                <Search className="w-6 h-6 text-virtu_grey" />
            </div>
            <p className="text-sm font-bold text-textPrimary font-mier mb-2">
                No results found
            </p>
            <p className="text-xs text-virtu_grey mb-4">
                We couldn't find anything matching "{debouncedSearchTerm}"
            </p>
            <div className="text-xs text-virtu_grey-400">
                <p>Try searching for:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-virtu_grey-100 rounded">
                        Course names
                    </span>
                    <span className="px-2 py-1 bg-virtu_grey-100 rounded">
                        Topic keywords
                    </span>
                    <span className="px-2 py-1 bg-virtu_grey-100 rounded">
                        Learning objectives
                    </span>
                </div>
            </div>
        </div>
    )

    const renderLoadingState = (): React.ReactElement => (
        <div className="py-12 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-secondary border-t-transparent" />
                ) : (
                    <Search className="w-5 h-5 text-secondary" />
                )}
            </div>
            <p className="text-sm text-gray-500">
                {searchTerm.length < 2
                    ? 'Type at least 2 characters to start searching'
                    : 'Searching for relevant content...'}
            </p>
        </div>
    )

    const renderContent = (): React.ReactElement => {
        if (searchError) {
            return renderErrorState()
        }

        if (hasResults) {
            return (
                <div className="py-4">
                    {renderResultsHeader()}
                    {renderResultsSections()}
                </div>
            )
        }

        if (debouncedSearchTerm && !isLoading) {
            return renderNoResultsState()
        }

        return renderLoadingState()
    }

    return (
        <div
            ref={dropdownRef}
            className="absolute w-full mt-3 bg-white rounded-2xl shadow-2xl border border-b-border-100 overflow-hidden z-50 max-h-[500px] overflow-y-auto"
            role="listbox"
            aria-label="Search results"
        >
            {renderContent()}
        </div>
    )
}

export default SearchDropdown
