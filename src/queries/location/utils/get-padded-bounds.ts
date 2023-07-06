interface LatLng {
	latitude: number;
	longitude: number;
}

const R = 3958.8; // Approximate Earth radius in miles

const toRadians = (degrees: number) => degrees * (Math.PI / 180);
const toDegrees = (radians: number) => radians * (180 / Math.PI);

/**
 * Calculates the approximate distance between the visible SW and NE corner points using the Haversine formula.
 * @reference https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
 * @returns distance between NE and SW in miles
 */
export const calculateHaversineDistance = (NE: LatLng, SW: LatLng): number => {
	// convert lat and lng values from degrees to radians.
	const rLat1 = toRadians(NE.latitude);
	const rLng1 = toRadians(NE.longitude);
	const rLat2 = toRadians(SW.latitude);
	const rLng2 = toRadians(SW.longitude);

	const diffLat = rLat2 - rLat1;
	const diffLng = rLng2 - rLng1;

	const distance =
		2 *
		R *
		Math.asin(
			Math.sqrt(
				Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
					Math.cos(rLat1) *
						Math.cos(rLat2) *
						Math.sin(diffLng / 2) *
						Math.sin(diffLng / 2)
			)
		);

	return distance;
};

/**
 * Calculates the bearing between SW -> NE coordinate points.
 * @reference https://www.sunearthtools.com/tools/distance.php#txtDist_3
 * @returns bearing in radians
 */
export const calculateBearingSWtoNE = (SW: LatLng, NE: LatLng) => {
	const startLat = toRadians(SW.latitude);
	const startLng = toRadians(SW.longitude);
	const endLat = toRadians(NE.latitude);
	const endLng = toRadians(NE.longitude);

	const dLng = endLng - startLng;

	const x =
		Math.cos(startLat) * Math.sin(endLat) -
		Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
	const y = Math.sin(dLng) * Math.cos(endLat);
	const bearing = Math.atan2(y, x);

	return bearing;
};

// Calculates the bearing between NE -> SW coordinate points.
export const calculateBearingNEtoSW = (SW: LatLng, NE: LatLng) => {
	const Y = Math.PI;
	const bearing = calculateBearingSWtoNE(SW, NE);

	return bearing + Y;
};

/**
 * Calculates a new extended coordinate point given a known opposite coordinate,
 * extended distance, and the expected bearing between known point and new point
 * @reference https://www.sunearthtools.com/tools/distance.php#txtDist_5
 * @returns extended outer bound coordinate
 */
export const calculateOutboundCoordinate = (
	knownCoordinate: LatLng,
	distance: number,
	bearing: number
): LatLng => {
	const rLat = toRadians(knownCoordinate.latitude);
	const rLng = toRadians(knownCoordinate.longitude);

	const newLat = Math.asin(
		Math.sin(rLat) * Math.cos(distance / R) +
			Math.cos(rLat) * Math.sin(distance / R) * Math.cos(bearing)
	);
	const newLng =
		rLng +
		Math.atan2(
			Math.sin(bearing) * Math.sin(distance / R) * Math.cos(rLat),
			Math.cos(distance / R) - Math.sin(rLat) * Math.sin(newLat)
		);

	return {
		latitude: toDegrees(newLat),
		longitude: toDegrees(newLng),
	};
};

// Util function to get padded SW and NE coordinates
export const getPaddedBounds = (NE: LatLng, SW: LatLng, factor = 0.25) => {
	const distance = calculateHaversineDistance(NE, SW);
	const bearing = calculateBearingSWtoNE(SW, NE); // Going from SW -> NE

	const reverseBearing = calculateBearingNEtoSW(SW, NE); // Going from NE -> SW
	const extension = distance * factor; // extended distance outside visible bounds by a factor of 0.5

	// starting at known SW, extend beyond visible bounds at SW -> NE bearing
	const distanceExtendedNE = distance + extension;
	const paddedNE = calculateOutboundCoordinate(
		SW,
		distanceExtendedNE,
		bearing
	);

	// staring at new NE, extended beyond visible bounds at NE -> SW reverse bearing
	const distanceExtendedSW = distanceExtendedNE + extension;
	const paddedSW = calculateOutboundCoordinate(
		paddedNE,
		distanceExtendedSW,
		reverseBearing
	);

	return { paddedNE, paddedSW };
};
