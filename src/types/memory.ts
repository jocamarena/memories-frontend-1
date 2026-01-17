export interface MemoryRequest {
    title: string
    description: string
    images: string[]
    dateOfEvent: string
}

export interface MemoryResponse {
    id: number
    title: string
    description: string
    images: string[]
    dateOfEvent: string
    createdByUsername: string
    createdDate: string
    lastModifiedByUsername: string
    lastModifiedDate: string
}

export interface MemoryFormData {
    title: string
    description: string
    images: string
    dateOfEvent: string
}
