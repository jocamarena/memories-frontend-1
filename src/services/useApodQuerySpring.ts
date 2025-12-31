import { useQuery } from '@tanstack/react-query';
import type { Apod, ApodErrorResponse } from '../types/apod';

const springBaseUrl: string = import.meta.env.VITE_APP_SPRING_API_BASE_URL;
const apodEndpoint: string = import.meta.env.VITE_APP_SPRING_API_PLANETARY_APOD;

/**
 * Checks if the response is an error response from Spring API
 */
const isErrorResponse = (data: unknown): data is ApodErrorResponse => {
    return (
        typeof data === 'object' &&
        data !== null &&
        'code' in data &&
        'msg' in data
    );
};

/**
 * Fetches APOD data from Spring API
 */
const fetchApodSpring = async (date: string): Promise<Apod> => {
    if (!springBaseUrl || !apodEndpoint) {
        throw new Error('Missing Spring API configuration. Check your .env file.');
    }

    const url = `${springBaseUrl}${apodEndpoint}?date=${date}`;
    const response = await fetch(url);

    if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (isErrorResponse(data)) {
                throw new Error(data.msg);
            }
        }
        throw new Error(`Failed to fetch APOD: ${response.statusText}`);
    }

    const data = await response.json();

    if (isErrorResponse(data)) {
        throw new Error(data.msg);
    }

    return data as Apod;
};

/**
 * React Query hook for fetching APOD data from Spring API
 */
export const useApodQuerySpring = (date: string) => {
    return useQuery<Apod, Error>({
        queryKey: ['apod-spring', date],
        queryFn: () => fetchApodSpring(date),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });
};
