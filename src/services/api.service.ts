import axios, { AxiosRequestConfig } from "axios";
import {store} from '@/store';
import TokenService from "@/services/token.service";
import {loadingController} from "@ionic/vue";

const ApiService = {
    _requestInterceptor: 0,
    _401interceptor: 0,
    init(baseURL: string | undefined) {
        axios.defaults.baseURL = baseURL;
    },
    setHeader() {
        const token: any = TokenService.getToken();
        if (token === null) return;
        axios.defaults.headers.common["access-token"] = token.access_token;
        axios.defaults.headers.common["client"] = token.client;
        axios.defaults.headers.common["uid"] = token.uid;
        axios.defaults.headers.common["Accept"] = "application/json";
    },
    removeHeader() {
        axios.defaults.headers.common = {};
    },
    get(resource: string) {
        return axios.get(resource);
    },
    post(resource: string, data: any) {
        return axios.post(resource, data);
    },
    put(resource: string, data: any) {
        return axios.put(resource, data);
    },
    delete(resource: string) {
        return axios.delete(resource);
    },
    customRequest(data: AxiosRequestConfig) {
        return axios(data);
    },
    mountRequestInterceptor() {
        this._requestInterceptor = axios.interceptors.request.use(async config => {
            console.log("show loading");
            const loading = await loadingController.create({
                message: 'Porfavor espere...'
            });
            await loading.present();

            return config;
        });
    },
    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            async response => {
                loadingController.dismiss().then(r => console.log(r))
                .catch((error: any) => {
                    console.log(error);
                });
                return response;
            },
            async error => {
                loadingController.dismiss().then(r => console.log(r))
                .catch((error: any) => {
                    console.log(error);
                });
                if (error.request.status === 401) {
                    await store.dispatch("auth/signOut");
                    await store.dispatch("auth/cleanState");
                    throw error;
                }
                throw error;
            }
        );
    },
    unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor);
    }
}

export default ApiService;