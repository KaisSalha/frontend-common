import {
	calculateHaversineDistance,
	calculateBearingSWtoNE,
	calculateBearingNEtoSW,
	calculateOutboundCoordinate,
} from "./get-padded-bounds";

// Results validated via these calculators:
// https://www.fcc.gov/media/radio/distance-and-azimuths
// https://www.sunearthtools.com/tools/distance.php#txtDist_3

describe("Map padding Utils", () => {
	it("calculates distance between SW and NE points (miles)", () => {
		const SW = { latitude: 43.6098999, longitude: -79.4166741 };
		const NE = { latitude: 43.702302, longitude: -79.3497262 };
		const expectedDistance = 7.208;

		const distance = calculateHaversineDistance(NE, SW);
		expect(distance).toBeCloseTo(expectedDistance, 3);
	});

	it("calculates bearing between SW and NE points", () => {
		const SW = { latitude: 43.6098999, longitude: -79.4166741 };
		const NE = { latitude: 43.702302, longitude: -79.3497262 };
		const expectedBearing = 0.48240901;

		const bearing = calculateBearingSWtoNE(SW, NE);
		expect(bearing).toBeCloseTo(expectedBearing, 3);
	});

	it("calculates reverse bearing between NE and SW points", () => {
		const SW = { latitude: 43.6098999, longitude: -79.4166741 };
		const NE = { latitude: 43.702302, longitude: -79.3497262 };
		const expectedReverseBearing = 3.62435072;

		const reverseBearing = calculateBearingNEtoSW(SW, NE);
		expect(reverseBearing).toBeCloseTo(expectedReverseBearing, 3);
	});

	it("calculates out of bounds coordinates", () => {
		const SW = { latitude: 43.6098999, longitude: -79.4166741 };
		const expectedReverseBearing = 3.62435072;
		const expectedDistance = 7.208;
		const expectedBearing = 0.48240901;
		const extension = expectedDistance * 0.5;
		const expectedPaddedNE = {
			latitude: 43.74848835543009,
			longitude: -79.316174793491,
		};
		const expectedPaddedSW = {
			latitude: 43.56356698919514,
			longitude: -79.44976111641115,
		};

		const distanceExtendedNE = expectedDistance + extension;
		const distanceExtendedSW = distanceExtendedNE + extension;
		const paddedNE = calculateOutboundCoordinate(
			SW,
			distanceExtendedNE,
			expectedBearing
		);
		const paddedSW = calculateOutboundCoordinate(
			paddedNE,
			distanceExtendedSW,
			expectedReverseBearing
		);

		expect(paddedNE.latitude).toBeCloseTo(expectedPaddedNE.latitude);
		expect(paddedNE.longitude).toBeCloseTo(expectedPaddedNE.longitude);
		expect(paddedSW.latitude).toBeCloseTo(expectedPaddedSW.latitude);
		expect(paddedSW.longitude).toBeCloseTo(expectedPaddedSW.longitude);
	});
});
