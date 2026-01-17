import { useEffect, useState } from 'react'
import { memoryService } from '../../services/memoryApi'
import type { MemoryResponse } from '../../types/memory'

export function Memories() {
    const [memories, setMemories] = useState<MemoryResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchMemories() {
            const result = await memoryService.getMemories()
            setIsLoading(false)

            if (result.success && result.data) {
                setMemories(result.data)
            } else {
                setError(result.error || 'Failed to fetch memories')
            }
        }

        fetchMemories()
    }, [])

    if (isLoading) {
        return <div style={styles.loading}>Loading memories...</div>
    }

    if (error) {
        return <div style={styles.error}>{error}</div>
    }

    if (memories.length === 0) {
        return <div style={styles.empty}>No memories found. Create your first memory!</div>
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Memories</h2>
            <div style={styles.grid}>
                {memories.map((memory) => (
                    <div key={memory.id} style={styles.card}>
                        <h3 style={styles.cardTitle}>{memory.title}</h3>
                        <p style={styles.cardDescription}>{memory.description}</p>
                        <div style={styles.cardMeta}>
                            <span>Date: {memory.dateOfEvent}</span>
                        </div>
                        {memory.images.length > 0 && (
                            <div style={styles.images}>
                                <span style={styles.imagesLabel}>Images:</span>
                                <span>{memory.images.join(', ')}</span>
                            </div>
                        )}
                        <div style={styles.cardFooter}>
                            <span>Created by: {memory.createdByUsername}</span>
                            <span>Created: {new Date(memory.createdDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '24px',
        textAlign: 'center',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '12px',
        color: '#333',
    },
    cardDescription: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '12px',
        lineHeight: '1.5',
    },
    cardMeta: {
        fontSize: '13px',
        color: '#888',
        marginBottom: '8px',
    },
    images: {
        fontSize: '12px',
        color: '#888',
        marginBottom: '12px',
    },
    imagesLabel: {
        fontWeight: '500',
        marginRight: '4px',
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: '#999',
        borderTop: '1px solid #eee',
        paddingTop: '12px',
        marginTop: '8px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#666',
    },
    error: {
        padding: '20px',
        backgroundColor: '#fee2e2',
        border: '1px solid #ef4444',
        borderRadius: '8px',
        color: '#dc2626',
        textAlign: 'center',
        margin: '20px',
    },
    empty: {
        textAlign: 'center',
        padding: '40px',
        fontSize: '16px',
        color: '#666',
    },
}
