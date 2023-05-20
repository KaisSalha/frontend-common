import axios from "axios";
const ApiClientsManager = () => {
    const clients = new Map();
    const services = new Map();
    let config = {
        env: "prod",
        headers: {
            Accept: "application/json",
        },
    };
    const setConfig = (newConfig) => {
        config = Object.assign(Object.assign({}, config), newConfig);
    };
    const getEnvironment = () => config.env;
    const registerService = (service) => {
        const key = service.name;
        if (!services.has(key)) {
            services.set(key, service);
        }
    };
    const getClient = (serviceName) => {
        var _a;
        const key = `${serviceName}-${config.env}`;
        if (!clients.has(key)) {
            const service = services.get(serviceName); // Fallback to prod for services with no staging
            if (!service) {
                throw new Error(`Service ${serviceName} not registered`);
            }
            const environment = (_a = service.environments[config.env]) !== null && _a !== void 0 ? _a : service.environments.prod;
            const client = axios.create({
                baseURL: environment,
                timeout: service.timeout,
                headers: Object.assign(Object.assign({}, config.headers), service.headers),
            });
            clients.set(key, client);
        }
        return clients.get(key);
    };
    return { setConfig, getEnvironment, registerService, getClient };
};
export const ApiClient = ApiClientsManager();
//# sourceMappingURL=api-client.js.map