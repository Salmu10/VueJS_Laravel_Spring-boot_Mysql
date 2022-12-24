import axios from 'axios'
import { useStore } from "vuex";
import { createToaster } from "@meforma/vue-toaster";
import Constant from '../Constant.js';


export default (URL) => {
    const store = useStore();
    const toaster = createToaster({ "position": "top-right", "duration": 1500 });

    const axiosInstance = axios.create({
        baseURL: URL
    })

    const token = localStorage.getItem('token');
    if (token) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    } 

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
        console.log(error)
        if (error.response.status === 401) {
            toaster.error('Unauthorized action');
            store.dispatch("user/" + Constant.LOGOUT, {succes: true });
        }
        return Promise.reject(error)
        }
    )

    return axiosInstance
}