import type { MultiPolygon } from "geojson";
import { ApiClient } from "./utils/api-client";

export interface getPolygonsResult {
	polygons: {
		id: number;
		geo_name: string;
		land_area: number;
		geom: MultiPolygon;
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

export type GeoLevel = "tract" | "division" | "subdivision";

export interface getGeoByPointsParams {
	ne_lat: number;
	ne_lng: number;
	sw_lat: number;
	sw_lng: number;
	geo_level: GeoLevel;
}

export const getGeoByPoints = async ({
	ne_lat,
	ne_lng,
	sw_lat,
	sw_lng,
	geo_level,
}: getGeoByPointsParams): Promise<getPolygonsResult> => {
	const response = await ApiClient.getClient(serviceName).get(
		`/getGeoByPoints?ne_lat=${ne_lat}&ne_lng=${ne_lng}&sw_lat=${sw_lat}&sw_lng=${sw_lng}&geo_level=${geo_level}`
	);

	return response.data;
};

export interface getGeoByParentIdParams {
	geo_level: GeoLevel;
	parent_level: Omit<GeoLevel, "tract">;
	id: string;
}

export const getGeosByParentId = async ({
	id,
	geo_level,
	parent_level,
}: getGeoByParentIdParams): Promise<getPolygonsResult> => {
	const response = await ApiClient.getClient(serviceName).get(
		`/getGeosByParentId?id=${id}&geo_level=${geo_level}&parent_level=${parent_level}`
	);

	return response.data;
};
