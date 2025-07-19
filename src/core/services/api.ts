import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_EDU_VAULT_URL}`,
        prepareHeaders: (headers) => {
            const token = ''
            if (token) {
                headers.set('authorization', `Token ${token}`)
            }
            return headers
        },
    }),
    tagTypes: [
        'AssessmentQuestions',
        'QuestionAttempts',
        'ActiveAssessment',
        'ObjectiveResources',
        'SubtopicObjectives',
        'AllObjectives',
        'Search',
        'Subject',
        'Topic',
        'Subtopic',
        'Objective',
        'StreakData',
        'UpcomingTasks',
        'TaskTypes',
        'LastAccessedCourse',
    ],
    endpoints: () => ({}),
})
