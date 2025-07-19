import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import userProfileReducer from '@features/UserProfile/userProfileSlice'
import userCourseProgressReducer from '@features/Courses/userCourseProgressSlice'
import { baseApi } from '@core/services/api'

import { assessmentReducer } from '@features/Assessment'
import {
    activeAssessmentReducer,
    assessmentUI,
    resourcesReducer,
    topicDataReducer,
    topicNavigationReducer,
} from '@features/TopicDetail/store'
import { searchReducer } from '@features/SearchBar/store'
import { studyReducer } from '@features/StudyTimetable/store'
import { courseHomePageReducer } from '@features/CourseHomePage'

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        userCourseProgress: userCourseProgressReducer,
        topicNavigation: topicNavigationReducer,
        topicData: topicDataReducer,
        resources: resourcesReducer,
        assessment: assessmentReducer,
        activeAssessment: activeAssessmentReducer,
        assessmentUI: assessmentUI,
        courseHomePage: courseHomePageReducer,
        search: searchReducer,
        study: studyReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for serializable check
                ignoredActions: [
                    'study/setCurrentDate',
                    'study/setSelectedDate',
                    'study/setHoveredDate',
                ],
                // Ignore these field paths in all actions
                ignoredActionsPaths: ['payload.timestamp', 'meta.arg'],
                // Ignore these paths in the state
                ignoredPaths: [
                    'study.currentDate',
                    'study.selectedDate',
                    'study.hoveredDate',
                ],
            },
        }).concat(baseApi.middleware), // Use only the base API middleware
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
