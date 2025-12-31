import { useState } from 'react';
import { useApodQuerySpring } from '../../services/useApodQuerySpring';
import { ApodErrorResponse } from './ApodErrorResponse';

export const ApodListReactQuerySpring = () => {
    // Set default date to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const [selectedDate, setSelectedDate] = useState<string>(
        yesterday.toISOString().split('T')[0]
    );

    const { data: apod, isLoading, error } = useApodQuerySpring(selectedDate);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ApodErrorResponse message={error.message} />;
    if (!apod) return <div>No data available</div>;

    return (
        <div>
            <h3>Using React Query (Spring API)</h3>
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
