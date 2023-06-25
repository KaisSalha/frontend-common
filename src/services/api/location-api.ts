import { ApiClient } from "./utils/api-client";

export interface getPolygonsResult {
	message: string;
	polygons: {
		id: number;
		geo_name: string;
		land_area: number;
		geom: string;
	};
}

/**
 * Manages requests to the location api.
 */

const serviceName = "location";

ApiClient.registerService({
	name: serviceName,
	timeout: 10000,
	environments: {
		staging: "http://localhost:3011",
		prod: "http://localhost:3011",
	},
});

export const getAreas = async (): Promise<getPolygonsResult> => {
	const response = await ApiClient.getClient(serviceName).get(`/dev/hello`);

	return response.data;
};
