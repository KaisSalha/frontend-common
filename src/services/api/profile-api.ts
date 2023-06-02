import { ApiClient } from "./utils/api-client";

export interface createProfileParams {
	first_name: string;
	last_name: string;
	birth_date: Date;
	country: string;
}

export type Profile = {
	id: number;
	user_id: string;
	email: string;
	first_name: string;
	last_name: string;
	birth_date: Date;
	country: string;
};

/**
 * Manages requests to the profile api which is currently part of the web app.
 */

const serviceName = "profile";

ApiClient.registerService({
	name: serviceName,
	timeout: 10000,
	environments: {
		staging: "http://localhost:3000/api/profile",
		prod: "http://localhost:3000/api/profile",
	},
});

export const getProfile = async (): Promise<Profile> => {
	const response = await ApiClient.getClient(serviceName).get(`/`);

	return response.data;
};

export const createProfile = async (
	data: createProfileParams
): Promise<Profile> => {
	const response = await ApiClient.getClient(serviceName).post(`/`, data);

	return response.data;
};
