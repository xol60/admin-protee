import * as React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { User } from '../module/user.dto'
import { CreateLocaitondto } from '../module/location.dto'
import { RequestResetPassword, RequestLogin, ResetPassword } from '../module/auth.dto'



const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) =>
        axios.put<T>(url, body).then(responseBody),
};

const auth = {
    login: (data: RequestLogin) => request.post<any>(`/auth/system-user/login`, data),
    requestResetPassword: (data: RequestResetPassword) => request.post<boolean>(`/auth/system-user/request-reset-password`, data),
    resetPassword: (data: ResetPassword) => request.post<boolean>(`/auth/system-user/reset-password`, data),
};
const users = {
    list: (query: any) => request.get<any>(`/users?page=${query.page}&take=${query.take}&filter=${query.filter}&sortField=${query.sortField}`),
    detail: (id: string) => request.get<User>(`/users/${id}`),
    changedetail: (value: any) => request.put<any>('/users', value)
};
const location = {
    list: (query: any) => request.get<any>(`/location/system-user?filter=${query.filter}&sortField=${query.sortField}&status=${query.status}`),
    changedetail: (value: any) => request.put<any>('/location/system-user', value),
    create: (data: CreateLocaitondto) => request.post<any>(`/location`, data),
};
const analytics = {
    user: () => request.get<number>(`/analytics/admin/number-user`),
    family: () => request.get<number>(`/analytics/admin/number-family`),
    location: () => request.get<number>(`/analytics/admin/number-location`)
};
const settings={
    getRadius:()=>request.get<any>(`/settings/radius`),
    setRadius:(value:any)=>request.put<any>(`/settings/radius`,value)
}
const api = {
    auth,
    users,
    location,
    analytics,
    settings

}
export default api;
