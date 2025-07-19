import { baseApi } from '@core/services'

export interface StreakData {
    current_streak: number
    longest_streak: number
    last_activity_date: string
    streak_start_date: string
    is_active: boolean
}

export interface CalendarDay {
    code: string
    highlighted: boolean
    currentDay: boolean
}

export interface StreakResponse {
    streak: StreakData
    calendar: CalendarDay[]
}

export const streakApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchStreakData: builder.query<StreakResponse, void>({
            query: () => '/api/v1/user/streak/data/',
            providesTags: ['StreakData'],
        }),
    }),
})

export const { useFetchStreakDataQuery } = streakApi
