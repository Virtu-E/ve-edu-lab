import { edxApiService } from '@core/services/ApiService'
import { CourseDetails } from '@core/models/courseDetails.models'
import { createApiHook } from '@core/HooksFactory'

export const useCourseDetails = createApiHook<CourseDetails>({
    apiService: edxApiService,
    endpoint: ({ courseId, userName }) =>
        `/api/courses/v1/courses/${encodeURIComponent(courseId)}?username=${userName}`,
    paramKeys: ['courseId', 'userName'],
})
