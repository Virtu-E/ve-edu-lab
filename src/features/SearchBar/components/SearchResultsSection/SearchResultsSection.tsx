import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
    selectHoveredIndex,
    selectSearchResults,
} from '@features/SearchBar/store/search.selectors'
import SearchResultItem from '@features/SearchBar/components/SearchResultItem/SearchResultItem'
import { SearchResult } from '@core/models'

interface SearchResultsSectionProps {
    title: string
    arrayType: keyof SearchResult
    iconRenderer: () => React.ReactNode
}
const SearchResultsSection = ({
    title,
    arrayType,
    iconRenderer,
}: SearchResultsSectionProps) => {
    const searchResults = useSelector(selectSearchResults)
    const hoveredIndex = useSelector(selectHoveredIndex)

    const items = searchResults[arrayType] || []

    const getGlobalIndex = useMemo(() => {
        return (localIndex: number) => {
            let globalIndex = 0

            if (arrayType === 'courses') {
                return localIndex
            }
            globalIndex += searchResults.courses.length

            if (arrayType === 'topics') {
                return globalIndex + localIndex
            }
            globalIndex += searchResults.topics.length

            if (arrayType === 'subtopics') {
                return globalIndex + localIndex
            }
            globalIndex += searchResults.subtopics.length

            return globalIndex + localIndex
        }
    }, [searchResults, arrayType])

    if (items.length === 0) return null

    const sectionConfig = {
        courses: { color: 'blue', label: 'Courses' },
        topics: { color: 'purple-', label: 'Topics' },
        subtopics: { color: 'emerald', label: 'Subtopics' },
        learning_objectives: { color: 'red', label: 'Learning Objectives' },
    }

    const config = sectionConfig[arrayType] || { color: 'gray', label: title }

    return (
        <div className="mb-6 last:mb-0">
            <div className="flex items-center justify-between px-6 py-2 mb-3">
                <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full bg-${config.color}-500`}
                    ></span>
                    {config.label}
                </h3>
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full bg-${config.color}-100 text-${config.color}-700`}
                >
                    {items.length}
                </span>
            </div>
            <div className="space-y-1">
                {items.map((item, localIndex) => {
                    const globalIndex = getGlobalIndex(localIndex)
                    return (
                        <SearchResultItem
                            key={`${item.type}-${item.id}`}
                            item={item}
                            index={globalIndex}
                            isHovered={hoveredIndex === globalIndex}
                            iconRenderer={iconRenderer}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SearchResultsSection
