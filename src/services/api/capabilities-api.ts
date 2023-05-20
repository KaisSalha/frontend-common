import { AxiosResponse } from "axios";
import { getWithAuth } from "./utils/api-common";
import { ApiClient } from "./utils/api-client";

export interface MinVersion {
	major: number;
	minor: number;
	patch: number;
}

// Move to product schema
export interface MobileCapabilities {
	min_version: MinVersion;
}

// Move to product schema
export interface Capabilities {
	name: string;
	properlyCityCode: string;
	isInBounds: boolean;
	capability: {
		enabled: boolean;
		supportsEstimate: boolean;
		supportsTourBookings: boolean;
		outsideToronto: boolean;
		phoneLink: string;
		phoneDisplay: string;
	};
}

/**
 * Manages requests to the capabilities service.
 * https://github.com/GoProperly/capabilities-v2
 */

const serviceName = "capabilities";

ApiClient.registerService({
	name: serviceName,
	timeout: 10000,
	environments: {
		staging:
			"https://7cx4in3gdl.execute-api.us-east-1.amazonaws.com/staging",
		prod: "https://33boyd70m0.execute-api.us-east-1.amazonaws.com/prod",
	},
});

export const getMobileCapabilities = async (): Promise<MobileCapabilities> => {
	const response: AxiosResponse<MobileCapabilities> = await getWithAuth(
		ApiClient.getClient(serviceName),
		"/mobile"
	);

	return response.data;
};

export const getCapabilitiesByCityCode = async ({
	properlyCityCode,
}: {
	properlyCityCode: string;
}): Promise<Capabilities> => {
	const response: AxiosResponse<Capabilities> = await getWithAuth(
		ApiClient.getClient(serviceName),
		`/capabilities/id/${properlyCityCode}`
	);

	return response.data;
};

export const getCapabilitiesByLatLng = async ({
	lat,
	lng,
}: {
	lat: number;
	lng: number;
}): Promise<Capabilities> => {
	const response: AxiosResponse<Capabilities> = await getWithAuth(
		ApiClient.getClient(serviceName),
		`/capabilities/location?lat=${lat}&lng=${lng}`
	);

	return response.data;
};
