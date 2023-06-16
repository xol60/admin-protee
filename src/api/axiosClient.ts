import * as React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { LoadingContext } from '../context/LoadingContext'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL
const WithAxios: React.FC<any> = ({ children }) => {
    const { setLoading } = React.useContext(LoadingContext);
    axios.interceptors.request.use((config) => {
        config.headers['Content-Type'] = 'application/json'
        config.headers['Access-Control-Allow-Origin'] = '*'
        const cookies = new Cookies();
        const token = cookies.get('jwt_authentication')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        setLoading(true);
        return config;
    });
    axios.interceptors.response.use(
        (res) => {
            setLoading(false);
            return res;
        },
        (error: AxiosError) => {
            setLoading(false);
            const { status } = error.response!;
            switch (status) {

                case 401:
                    console.error('unauthorised');
                    const cookies = new Cookies();
                    cookies.remove('jwt_authentication')
                    toast.error('Please sign in first!', {
                        position: toast.POSITION.TOP_CENTER,
                        theme: "colored"
                    });
                    break;

                case 403:
                    toast.error('Forbidden! You do not have permission to access!', {
                        position: toast.POSITION.TOP_CENTER,
                        theme: "colored"
                    });
                    break;
                case 404:
                    console.error('/not-found');
                    toast.error('Oops! Something went error. Please contact your administrator!', {
                        position: toast.POSITION.TOP_CENTER,
                        theme: "colored"
                    });
                    break;

                case 500:
                    console.error('/server-error');
                    toast.error('Server is having trouble! Please try again later!', {
                        position: toast.POSITION.TOP_CENTER,
                        theme: "colored"
                    });
                    break;
                default:
                    toast.error('Unknown error. Please check and try again!', {
                        position: toast.POSITION.TOP_CENTER,
                        theme: "colored"
                    });
                    break;
            }
            return Promise.reject(error);
        }
    );
    return children
}
export default WithAxios