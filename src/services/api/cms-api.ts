import { AxiosResponse } from "axios";
import { getWithAuth } from "./utils/api-common";
import { ApiClient } from "./utils/api-client";

/**
 * Manages requests to the cms service.
 * https://github.com/kaissalha/ribly-cms
 */

const serviceName = "cms";

ApiClient.registerService({
	name: serviceName,
	timeout: 10000,
	environments: {
		staging: "http://localhost:3010/api",
		prod: "http://localhost:3010/api",
	},
});

export const getCategories = async (): Promise<any> => {
	const response: AxiosResponse<any> = await getWithAuth(
		ApiClient.getClient(serviceName),
		"/categories"
	);

	return response.data;
};

export const getCategoryBySlug = async ({
	slug,
}: {
	slug: string;
}): Promise<any> => {
	const response: AxiosResponse<any> = await getWithAuth(
		ApiClient.getClient(serviceName),
		`/categories/slug/${slug}`
	);

	return response.data;
};
