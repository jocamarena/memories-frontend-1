import { useQuery } from '@tanstack/react-query';
import type { Apod, ApodErrorResponse } from '../types/apod';

const nasaBaseUrl: string = import.meta.env.VITE_APP_NASA_BASE_URL;
const nasaApiKey: string = import.meta.env.VITE_APP_NASA_API_KEY;
const apodEndpoint: string = import.meta.env.VITE_APP_NASA_ENDPOINT_PLANETARY_APOD;

/**
 * Checks if the response is an error response from NASA API
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
 * Fetches APOD data from NASA API
 */
const fetchApod = async (date: string): Promise<Apod> => {
    if (!nasaBaseUrl || !nasaApiKey || !apodEndpoint) {
        throw new Error('Missing NASA API configuration. Check your .env file.');
    }

    const url = `${nasaBaseUrl}${apodEndpoint}?api_key=${nasaApiKey}&date=${date}`;
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
 * React Query hook for fetching NASA APOD data
 */
export const useApodQuery = (date: string) => {
    return useQuery<Apod, Error>({
        queryKey: ['apod', date],
        queryFn: () => fetchApod(date),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });
};
