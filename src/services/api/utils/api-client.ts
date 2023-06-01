import axios, {
	AxiosHeaders,
	AxiosInstance,
	HeadersDefaults,
	RawAxiosRequestHeaders,
} from "axios";

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

const ApiClientsManager = () => {
	const clients = new Map<string, AxiosInstance>();
	const services = new Map<string, RegisterServiceParams>();

	let config: Config = {
		env: "prod",
		headers: {
			Accept: "application/json",
		},
	};

	const setConfig = (newConfig: Partial<Config>) => {
		config = { ...config, ...newConfig };
	};

	const setHeaders = (newHeaders: RawAxiosRequestHeaders) => {
		config.headers = { ...config.headers, ...newHeaders };
	};

	const getEnvironment = (): string => config.env;

	const registerService = (service: RegisterServiceParams) => {
		const key = service.name;

		if (!services.has(key)) {
			services.set(key, service);
		}
	};

	const getClient = (serviceName: string) => {
		const key = `${serviceName}-${config.env}`;

		if (!clients.has(key)) {
			const service = services.get(serviceName); // Fallback to prod for services with no staging

			if (!service) {
				throw new Error(`Service ${serviceName} not registered`);
			}

			const environment =
				service.environments[config.env] ?? service.environments.prod;

			const client = axios.create({
				baseURL: environment,
				timeout: service.timeout,
				headers: { ...config.headers, ...service.headers },
			});

			clients.set(key, client);
		}

		return clients.get(key) as AxiosInstance;
	};

	return {
		setConfig,
		setHeaders,
		getEnvironment,
		registerService,
		getClient,
	};
};

export const ApiClient = ApiClientsManager();
