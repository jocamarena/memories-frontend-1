import type { MemoryRequest, MemoryResponse } from '../types/memory'

const API_BASE_URL = import.meta.env.VITE_APP_SPRING_API_BASE_URL
const MEMORIES_ENDPOINT = import.meta.env.VITE_APP_SPRING_API_MEMORIES

export interface CreateMemoryResult {
    success: boolean
    data?: MemoryResponse
    error?: string
}

export interface GetMemoriesResult {
    success: boolean
    data?: MemoryResponse[]
    error?: string
}

class MemoryService {
    private baseUrl: string
    private memoriesEndpoint: string

    constructor() {
        this.baseUrl = API_BASE_URL
        this.memoriesEndpoint = MEMORIES_ENDPOINT
    }

    async createMemory(memory: MemoryRequest): Promise<CreateMemoryResult> {
        try {
            const response = await fetch(`${this.baseUrl}${this.memoriesEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memory),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`,
                }
            }

            const data: MemoryResponse = await response.json()
            return {
                success: true,
                data,
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    }

    async getMemories(): Promise<GetMemoriesResult> {
        try {
            const response = await fetch(`${this.baseUrl}${this.memoriesEndpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                return {
                    success: false,
                    error: errorData.message || `HTTP error: ${response.status}`,
                }
            }

            const data: MemoryResponse[] = await response.json()
            return {
                success: true,
                data,
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    }
}

export const memoryService = new MemoryService()
