import { useState, useEffect } from 'react';
import { getApodAxios } from '../../services/apodApiAxios';
import type { Apod } from '../../types/apod';
import { ApodErrorResponse } from './ApodErrorResponse';

export const ApodListAxios = () => {
    const [apod, setApod] = useState<Apod | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Set default date to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const [selectedDate, setSelectedDate] = useState<string>(
        yesterday.toISOString().split('T')[0]
    );

    useEffect(() => {
        const fetchApod = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getApodAxios(selectedDate);
                setApod(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchApod();
    }, [selectedDate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <ApodErrorResponse message={error} />;
    if (!apod) return <div>No data available</div>;

    return (
        <div>
            <h3>Using Axios</h3>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
            />
            <h2>{apod.title}</h2>
            <p>{apod.date}</p>
            {apod.media_type === 'image' ? (
                <img
                    src={apod.url}
                    alt={apod.title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            ) : (
                <iframe
                    src={apod.url}
                    title={apod.title}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    allowFullScreen
                />
            )}
            <p>{apod.explanation}</p>
        </div>
    );
};
