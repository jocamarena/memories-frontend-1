import axios, { AxiosError } from 'axios';
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

export const getApodAxios = async (date: string): Promise<Apod> => {
    if (!nasaBaseUrl || !nasaApiKey || !apodEndpoint) {
        throw new Error('Missing NASA API configuration. Check your .env file.');
    }

    const url = `${nasaBaseUrl}${apodEndpoint}`;

    try {
        const response = await axios.get<Apod>(url, {
            params: {
                api_key: nasaApiKey,
                date: date,
            },
        });

        // Check for error response even with 200 status
        if (isErrorResponse(response.data)) {
            throw new Error(response.data.msg);
        }

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // Handle NASA API error response
            if (error.response?.data && isErrorResponse(error.response.data)) {
                throw new Error(error.response.data.msg);
            }
            throw new Error(`Failed to fetch APOD: ${error.message}`);
        }
        throw error;
    }
};
