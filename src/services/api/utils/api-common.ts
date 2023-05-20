import { AxiosInstance } from "axios";
import { getJWT } from "./auth";

const getToken = async (jwt?: string | null) => {
	if (jwt) {
		return jwt;
	}

	try {
		return await getJWT();
	} catch {
		return null;
	}
};

export const getWithAuth = async (
	client: AxiosInstance,
	url: string,
	jwt: string | null = null
) => {
	const token = await getToken(jwt);

	return client.get(url, {
		headers: { "X-Properly-Auth": token },
	});
};

export const postWithAuth = async (
	client: AxiosInstance,
	url: string,
	data?: object,
	jwt: string | null = null
) => {
	const token = await getToken(jwt);

	return client.post(url, data, {
		headers: { "X-Properly-Auth": token },
	});
};

export const putWithAuth = async (
	client: AxiosInstance,
	url: string,
	data?: object
) => {
	const token = await getToken();

	return client.put(url, data, {
		headers: { "X-Properly-Auth": token },
	});
};

export const patchWithAuth = async (
	client: AxiosInstance,
	url: string,
	data?: object
) => {
	const token = await getToken();

	return client.patch(url, data, {
		headers: { "X-Properly-Auth": token },
	});
};

export const deleteWithAuth = async (
	client: AxiosInstance,
	url: string,
	config?: object
) => {
	const token = await getToken();

	return client.delete(url, {
		headers: { "X-Properly-Auth": token },
		...config,
	});
};
