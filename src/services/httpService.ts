import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpService {
    private httpInstance;

    constructor(httpInstance: AxiosInstance) {
        this.httpInstance = httpInstance;
    }

    async get<T>(
        endpoint: string,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        try {
            const response = await this.httpInstance.get<T>(
                `search.php?s=${endpoint}`,
                options
            );

            return response.data;
        } catch (error) {
            throw this.getErrorData(error);
        }
    }

    getErrorData = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }

        return error;
    };
}

export const httpService = new HttpService(
    axios.create({
        baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
    })
);
