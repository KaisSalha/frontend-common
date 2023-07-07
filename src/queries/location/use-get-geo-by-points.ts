import { useQuery } from "@tanstack/react-query";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

interface useGetGeoByPointsParams
	extends Omit<LocationApi.getGeoByPointsParams, "signal"> {
	enabled?: boolean;
}

export const useGetGeoByPoints = ({
	ne_lat,
	ne_lng,
	sw_lat,
	sw_lng,
	geo_level,
	enabled = true,
}: useGetGeoByPointsParams) =>
	useQuery({
		queryKey: [QUERY_IDS.geos, ne_lat, ne_lng, sw_lat, sw_lng, geo_level],
		queryFn: ({ signal }: { signal?: any }) =>
			LocationApi.getGeoByPoints({
				ne_lat,
				ne_lng,
				sw_lat,
				sw_lng,
				geo_level,
				signal,
			}),
		keepPreviousData: true,
		enabled,
		retry: 2,
		retryDelay: 1000,
	});
