import { ApiClient } from "./utils/api-client";

interface Census {
	characteristic_id: number;
	characteristic_name: string;
	total: number;
	men: number;
	women: number;
}
export interface getCensusResult {
	id: string;
	census: Record<number, Census>;
}

export type CensusData = Record<string, getCensusResult>;

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

export interface getCensusByGeoIdsParams {
	ids: string[];
	signal?: AbortSignal;
}

export const getCensusByGeoIds = async ({
	ids,
	signal,
}: getCensusByGeoIdsParams): Promise<getCensusResult> => {
	const response = await ApiClient.getClient(serviceName).get(
		`/getCensusByGeoIds?ids=${ids.join(",")}`,
		{
			signal,
		}
	);

	return response.data;
};
