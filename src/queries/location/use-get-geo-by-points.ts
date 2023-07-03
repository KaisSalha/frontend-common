import { useQuery } from "@tanstack/react-query";
import { getPaddedBounds } from "./utils/get-padded-bounds";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export const useGetGeoByPoints = ({
	ne_lat,
	ne_lng,
	sw_lat,
	sw_lng,
	geo_level,
}: LocationApi.getGeoByPointsParams) => {
	const paddedBounds = getPaddedBounds(
		{
			latitude: ne_lat,
			longitude: ne_lng,
		},
		{
			latitude: sw_lat,
			longitude: sw_lng,
		}
	);

	return useQuery(
		[QUERY_IDS.geos, ne_lat, ne_lng, sw_lat, sw_lng, geo_level],
		() =>
			LocationApi.getGeoByPoints({
				ne_lat: paddedBounds.paddedNE.latitude,
				ne_lng: paddedBounds.paddedNE.longitude,
				sw_lat: paddedBounds.paddedSW.latitude,
				sw_lng: paddedBounds.paddedSW.longitude,
				geo_level,
			}),
		{
			keepPreviousData: true,
		}
	);
};
