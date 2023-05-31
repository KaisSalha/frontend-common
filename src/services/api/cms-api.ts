import { AxiosResponse } from "axios";
import { Content, Locale } from "../../types";
import { getWithAuth } from "./utils/api-common";
import { ApiClient } from "./utils/api-client";

export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
	content: Content[];
}

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

export const getCategories = async ({
	locale,
}: {
	locale: Locale;
}): Promise<Category[]> => {
	const response: AxiosResponse<{
		docs: Category[];
	}> = await getWithAuth(
		ApiClient.getClient(serviceName),
		`/categories?locale=${locale}`
	);

	return response.data?.docs;
};

export const getCategoryBySlug = async ({
	slug,
	locale,
}: {
	slug: string;
	locale: Locale;
}): Promise<Category> => {
	const response: AxiosResponse<{
		docs: Category[];
	}> = await getWithAuth(
		ApiClient.getClient(serviceName),
		`/categories/slug/${slug}?locale=${locale}`
	);

	return response.data?.docs[0];
};
