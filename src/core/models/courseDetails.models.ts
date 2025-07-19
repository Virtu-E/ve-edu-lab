export interface CourseMedia {
    banner_image?: {
        uri: string
        uri_absolute: string
    }
    course_image?: {
        uri: string
    }
    course_video?: {
        uri: string | null
    }
    image?: {
        raw: string
        small: string
        large: string
    }
}

export interface CourseDetails {
    blocks_url: string
    effort: string | null
    end: string
    enrollment_start: string
    enrollment_end: string
    id: string
    media: CourseMedia
    name: string
    number: string
    org: string
    short_description: string
    start: string
    start_display: string
    start_type: string
    pacing: string
    mobile_available: boolean
    hidden: boolean
    invitation_only: boolean
    course_id: string
    overview: string
    is_enrolled: boolean
}
