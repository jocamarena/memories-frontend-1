import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { memorySchema, type MemorySchemaType } from '../../schemas/memorySchema'
import { memoryService } from '../../services/memoryApi'
import { useMemoryStore } from '../../stores/memoryStore'

export function MemoryForm() {
    const navigate = useNavigate()
    const { addMemory, isLoading, error, setLoading, setError, clearError } = useMemoryStore()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MemorySchemaType>({
        resolver: zodResolver(memorySchema),
        defaultValues: {
            title: '',
            description: '',
            images: '',
            dateOfEvent: '',
        },
    })

    const onSubmit = async (data: MemorySchemaType) => {
        clearError()
        setLoading(true)

        const imagesArray = data.images
            .split(',')
            .map((img) => img.trim())
            .filter(Boolean)

        const memoryData = {
            title: data.title,
            description: data.description,
            images: imagesArray,
            dateOfEvent: data.dateOfEvent,
        }

        const response = await memoryService.createMemory(memoryData)

        setLoading(false)

        if (response.success && response.data) {
            addMemory(response.data)
            reset()
            navigate('/memories')
        } else {
            setError(response.error || 'Failed to create memory')
        }
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create New Memory</h2>

            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <div style={styles.field}>
                    <label htmlFor="title" style={styles.label}>
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register('title')}
                        style={styles.input}
                        placeholder="Friday Night"
                    />
                    {errors.title && <span style={styles.fieldError}>{errors.title.message}</span>}
                </div>

                <div style={styles.field}>
                    <label htmlFor="description" style={styles.label}>
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register('description')}
                        style={styles.textarea}
                        placeholder="Making progress on my app on a Friday night"
                        rows={4}
                    />
                    {errors.description && (
                        <span style={styles.fieldError}>{errors.description.message}</span>
                    )}
                </div>

                <div style={styles.field}>
                    <label htmlFor="images" style={styles.label}>
                        Images (comma-separated)
                    </label>
                    <input
                        id="images"
                        type="text"
                        {...register('images')}
                        style={styles.input}
                        placeholder="img1.jpg, img2.jpg, img3.jpg"
                    />
                    {errors.images && <span style={styles.fieldError}>{errors.images.message}</span>}
                </div>

                <div style={styles.field}>
                    <label htmlFor="dateOfEvent" style={styles.label}>
                        Date of Event
                    </label>
                    <input
                        id="dateOfEvent"
                        type="date"
                        {...register('dateOfEvent')}
                        style={styles.input}
                    />
                    {errors.dateOfEvent && (
                        <span style={styles.fieldError}>{errors.dateOfEvent.message}</span>
                    )}
                </div>

                <button type="submit" style={styles.button} disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Memory'}
                </button>
            </form>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '24px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '24px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
    },
    input: {
        padding: '10px 12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        outline: 'none',
    },
    textarea: {
        padding: '10px 12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        backgroundColor: '#646cff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '8px',
    },
    error: {
        padding: '12px',
        backgroundColor: '#fee2e2',
        border: '1px solid #ef4444',
        borderRadius: '6px',
        color: '#dc2626',
        marginBottom: '16px',
    },
    fieldError: {
        fontSize: '12px',
        color: '#dc2626',
    },
}
