import { z } from 'zod'

export const memorySchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must be 100 characters or less'),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(1000, 'Description must be 1000 characters or less'),
    images: z
        .string()
        .min(1, 'At least one image is required')
        .refine(
            (val) => {
                const items = val.split(',').map((s) => s.trim()).filter(Boolean)
                return items.length > 0
            },
            { message: 'Enter at least one image filename' }
        ),
    dateOfEvent: z
        .string()
        .min(1, 'Date of event is required')
        .refine(
            (val) => !isNaN(Date.parse(val)),
            { message: 'Invalid date format' }
        ),
})

export type MemorySchemaType = z.infer<typeof memorySchema>
