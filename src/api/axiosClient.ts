import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { Auth, User } from '../module/user.dto'
import { Query } from '../module/query.dto'
import { CreateLocaitondto } from '../module/location.dto'
axios.defaults.baseURL = `http://localhost:${process.env.BACKEND_PORT || 3001}/api/v1`;
axios.interceptors.request.use((config) => {
    const cookies = new Cookies();
    const token = cookies.get('jwt_authentication')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const { data, status, config } = error.response!;
        switch (status) {
            case 400:
                console.error(data);
                break;

            case 401:
                console.error('unauthorised');
                break;

            case 404:
                console.error('/not-found');

                break;

            case 500:
                console.error('/server-error');
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) =>
        axios.put<T>(url, body).then(responseBody),
};

const auth = {
    login: (data: Auth) => request.post<any>(`/auth/system-user/login`, data),
};
const users = {
    list: (query: any) => request.get<any>(`/users?page=${query.page}&take=${query.take}&filter=${query.filter}&sortField=${query.sortField}`),
    detail: (id: string) => request.get<User>(`/users/${id}`),
    changedetail: (value: any) => request.put<any>('/users', value)
};
const location = {
    list: (query: any) => request.get<any>(`/location?filter=${query.filter}`),
    changedetail: (value: any) => request.put<any>('/location', value),
    create: (data: CreateLocaitondto) => request.post<any>(`/location`, data),
};
const api = {
    auth,
    users,
    location
}
export default api;
