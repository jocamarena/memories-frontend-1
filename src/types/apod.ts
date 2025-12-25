export interface Apod {
    date: string
    explanation: string
    hdurl: string
    media_type: string
    service_version: string
    title: string
    url: string
}

export interface ApodErrorResponse {
    code: number
    msg: string
    service_version: string
}