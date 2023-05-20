import { AxiosHeaders, AxiosInstance, HeadersDefaults, RawAxiosRequestHeaders } from "axios";
type Environment = "staging" | "prod";
interface RegisterServiceParams {
    name: string;
    timeout?: number;
    headers?: Record<string, string>;
    environments: {
        staging?: string;
        prod: string;
    };
}
interface Config {
    env: Environment;
    headers: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;
}
export declare const ApiClient: {
    setConfig: (newConfig: Partial<Config>) => void;
    getEnvironment: () => string;
    registerService: (service: RegisterServiceParams) => void;
    getClient: (serviceName: string) => AxiosInstance;
};
export {};
