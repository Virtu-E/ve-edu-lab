import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setHoveredIndex } from '@features/SearchBar/store/search.slice'
import { SearchItem } from '@features/Assessment/store/types'

interface SearchResultItemProps {
    item: SearchItem
    index: number
    isHovered: boolean
    iconRenderer: () => React.ReactNode
}

const SearchResultItem = memo(
    ({ item, index, isHovered, iconRenderer }: SearchResultItemProps) => {
        const dispatch = useDispatch()
        const handleItemClick = useCallback(
            (item: any) => {
                console.log('handleItemClick', item)
            },
            [dispatch]
        )

        const getSubtitle = () => {
            switch (item.type) {
                case 'course':
                    return item.course_key
                        ? `Course Code: ${item.course_key}`
                        : 'Course'
                case 'topic':
                    return item.course_name ? `in ${item.course_name}` : 'Topic'
                case 'subtopic':
                    return item.topic_name
                        ? `in ${item.topic_name}`
                        : 'Subtopic'
                case 'learning_objective':
                    return item.subtopic_name
                        ? `from ${item.subtopic_name}`
                        : 'Learning Objective'
                default:
                    return ''
            }
        }

        const getTypeLabel = () => {
            return item.type
                .replace('_', ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())
        }

        const handleMouseEnter = () => {
            dispatch(setHoveredIndex(index))
        }

        return (
            <div
                className={`group flex items-center justify-between px-6 py-4 cursor-pointer font-opensans transition-all duration-150 mx-2 rounded-xl ${
                    isHovered
                        ? 'bg-secondary-50 shadow-sm transform translate-x-1'
                        : 'hover:bg-virtu_grey-50'
                }`}
                onClick={() => handleItemClick(item)}
                onMouseEnter={handleMouseEnter}
                role="option"
                aria-selected={isHovered}
            >
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                    {iconRenderer()}
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold font-mier text-textPrimary truncate mb-1 group-hover:text-textSecondary transition-colors">
                            {item.name}
                        </div>
                        {getSubtitle() && (
                            <div className="text-xs text-virtu_grey-600 truncate">
                                {getSubtitle()}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
                    <span className="text-xs font-medium text-virtu_grey bg-virtu_grey-100 px-2 py-1 rounded-full">
                        {getTypeLabel()}
                    </span>
                    {(item.rank || item.similarity) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-tertiary-500"></div>
                    )}
                </div>
            </div>
        )
    }
)

SearchResultItem.displayName = 'SearchResultItem'
export default SearchResultItem
