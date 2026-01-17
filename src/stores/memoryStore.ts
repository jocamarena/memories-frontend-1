import { create } from 'zustand'
import type { MemoryResponse } from '../types/memory'

interface MemoryState {
    memories: MemoryResponse[]
    isLoading: boolean
    error: string | null
    addMemory: (memory: MemoryResponse) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    clearError: () => void
}

export const useMemoryStore = create<MemoryState>((set) => ({
    memories: [],
    isLoading: false,
    error: null,
    addMemory: (memory) =>
        set((state) => ({
            memories: [...state.memories, memory],
        })),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
}))
