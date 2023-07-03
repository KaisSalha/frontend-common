import { useQuery } from "@tanstack/react-query";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export const useGetGeoByPoints = ({
	ne_lat,
	ne_lng,
	sw_lat,
	sw_lng,
	geo_level,
}: LocationApi.getGeoByPointsParams) =>
	useQuery([QUERY_IDS.areas], () =>
		LocationApi.getGeoByPoints({
			ne_lat,
			ne_lng,
			sw_lat,
			sw_lng,
			geo_level,
		})
	);
