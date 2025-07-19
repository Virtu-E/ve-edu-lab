import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchAPI } from '@features/SearchBar/hooks/useSearchAPI'
import { useSearchDebounce } from '@features/SearchBar/hooks/useSearchDebounce'
import { clearSearch } from '@features/SearchBar/store/search.slice'
import { useSearchKeyboard } from '@features/SearchBar/hooks/useSearchKeyboard'
import SearchInput from '@features/SearchBar/components/SearchInput/SearchInput'
import SearchDropdown from '@features/SearchBar/components/SearchDropdown/SearchDropdown'
import { SearchItem } from '@features/Assessment/store/types'

const SearchBar = () => {
    const dispatch = useDispatch()

    useSearchAPI()
    useSearchDebounce(300)

    const handleItemClick = useCallback(
        (item: SearchItem) => {
            console.log('Selected item:', item)
            dispatch(clearSearch())

            switch (item.type) {
                case 'course':
                    console.log(`Navigate to course: ${item.course_key}`)
                    break
                case 'topic':
                    console.log(
                        `Navigate to topic: ${item.block_id} in course: ${item.course_name}`
                    )
                    break
                case 'subtopic':
                    console.log(
                        `Navigate to subtopic: ${item.block_id} in topic: ${item.topic_name}`
                    )
                    break
                case 'learning_objective':
                    console.log(
                        `Navigate to learning objective: ${item.block_id}`
                    )
                    break
                default:
                    break
            }
        },
        [dispatch]
    )

    useSearchKeyboard(handleItemClick)

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <SearchInput />
            <SearchDropdown />
        </div>
    )
}

export default SearchBar
