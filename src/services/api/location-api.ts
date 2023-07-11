import { ApiClient } from "./utils/api-client";

export interface getCensusResult {
	id: string;
	census: {
		dguid: number;
		characteristic_id: number;
		characteristic_name: string;
		total: number;
		men: number;
		women: number;
	}[];
}

/**
 * Manages requests to the location api.
 */

const serviceName = "location";

ApiClient.registerService({
	name: serviceName,
	timeout: 10000,
	environments: {
		staging: "http://localhost:3011/dev",
		prod: "http://localhost:3011/dev",
	},
});

export interface getGeoByParentIdParams {
	id: string;
}

export const getCensusByGeoId = async ({
	id,
}: getGeoByParentIdParams): Promise<getCensusResult> => {
	const response = await ApiClient.getClient(serviceName).get(
		`/getCensusByGeoId?id=${id}`
	);

	return response.data;
};
