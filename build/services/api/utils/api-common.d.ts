import { AxiosInstance } from "axios";
export declare const getWithAuth: (client: AxiosInstance, url: string, jwt?: string | null) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const postWithAuth: (client: AxiosInstance, url: string, data?: object, jwt?: string | null) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const putWithAuth: (client: AxiosInstance, url: string, data?: object) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const patchWithAuth: (client: AxiosInstance, url: string, data?: object) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const deleteWithAuth: (client: AxiosInstance, url: string, config?: object) => Promise<import("axios").AxiosResponse<any, any>>;
