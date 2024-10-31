import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react'; // Importing getSession from NextAuth

interface SendOptions {
    method: string;
    path: string;
    data?: any;
    token?: string;
    formData?: FormData;
    captchaToken?: string;
}

export default class APIClient {
    private static instance: APIClient | null = null;
    private fetch: typeof fetch;
    private baseURL: string;

    private constructor(customFetch: typeof fetch = global.fetch, baseURL: string) {
        this.fetch = customFetch;
        this.baseURL = baseURL;
    }

    public static getInstance(baseURL: string): APIClient {
        if (!APIClient.instance) {
            APIClient.instance = new APIClient(global.fetch, baseURL);
        }
        return APIClient.instance;
    }

    private async send({ method, path, data, token, formData, captchaToken }: SendOptions): Promise<Response> {
        const opts: RequestInit = {
            method,
            headers: {
                'X-Client-Type': 'web',
            },
            credentials: 'include', // This ensures cookies are sent with requests
        };

        if (formData) {
            opts.body = formData;
        } else if (data) {
            opts.body = JSON.stringify(data);
            opts.headers['Content-Type'] = 'application/json';
        }

        if (captchaToken) {
            opts.headers['X-GCAP'] = captchaToken;
        }

        if (token) {
            opts.headers['Authorization'] = `Bearer ${token}`;
        }

        const url = `${this.baseURL}/${path}`;
        return this.fetch(url, opts);
    }

    async get(path: string, token?: string): Promise<Response> {
        return this.send({ method: 'GET', path, token });
    }

    async del(path: string, data?: any, token?: string): Promise<Response> {
        return this.send({ method: 'DELETE', path, data, token });
    }

    async post(path: string, data?: any, token?: string, captchaToken?: string): Promise<Response> {
        return this.send({ method: 'POST', path, data, token, captchaToken });
    }

    async multipartPost(path: string, formData: FormData, token?: string, captchaToken?: string): Promise<Response> {
        return this.send({ method: 'POST', path, formData, token, captchaToken });
    }

    async put(path: string, data?: any, token?: string): Promise<Response> {
        return this.send({ method: 'PUT', path, data, token });
    }

    // Modified getCurrentUser method to check environment and extract token
    async getCurrentUser(context?: GetServerSidePropsContext): Promise<any> {
        let token: string | undefined;

        if (typeof window === 'undefined' && context) {
            // Server-side
            const session = await getSession(context); // Get session from NextAuth
            token = session?.token; // Extract token from session
        } else if (typeof window !== 'undefined') {
            // Client-side
            const session = await getSession(); // Get session from NextAuth
            token = session?.token; // Extract token from session
        }

        const response = await this.get('user', token);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch current user');
        }
    }
}