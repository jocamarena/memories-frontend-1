import type {Apod, ApodErrorResponse} from '../types/apod';


const springBaseUrl : string = import.meta.env.VITE_APP_SPRING_API_BASE_URL;
const apodEndpoint : string = import.meta.env.VITE_APP_SPRING_API_PLANETARY_APOD;

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
 * Handles errors from the Spring APOD API
 * Attempts to extract the error message from the API response
 */
const handleApiError = async (response: Response): Promise<never> => {
    const contentType = response.headers.get('content-type');

    // Try to parse JSON error response if content-type is JSON
    if (contentType && contentType.includes('application/json')) {
        try {
            const data = await response.json();

            // If it's an error response, use their message
            if (isErrorResponse(data)) {
                throw new Error(data.msg);
            }
        } catch (error) {
            // If parsing fails or it's not an error response format, fall through to generic error
            if (error instanceof Error && error.message !== `Failed to fetch APOD: ${response.statusText}`) {
                throw error;
            }
        }
    }

    // Fallback to generic error message
    throw new Error(`Failed to fetch APOD: ${response.statusText}`);
};

export const getApodSpring = async (date: string): Promise<Apod> => {
    if (!springBaseUrl || !apodEndpoint) {
        throw new Error('Missing Spring API configuration. Check your .env file.');
    }

    const url = `${springBaseUrl}${apodEndpoint}?date=${date}`;

    const response = await fetch(url);

    // Handle error responses
    if (!response.ok) {
        await handleApiError(response);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new Error('API did not return JSON. Check API URL configuration.');
    }

    const data = await response.json();

    // Double-check for error response even with 200 status (in case API returns errors with 200)
    if (isErrorResponse(data)) {
        throw new Error(data.msg);
    }

    return data as Apod;
}
