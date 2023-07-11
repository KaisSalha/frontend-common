import { useQuery } from "@tanstack/react-query";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export interface useCensusByGeoIdsParams
	extends Omit<LocationApi.getCensusByGeoIdsParams, "id"> {
	ids: string[];
}

export const useCensusByGeoIds = ({ ids }: useCensusByGeoIdsParams) =>
	useQuery(
		[QUERY_IDS.census, ...ids],
		() => LocationApi.getCensusByGeoIds({ ids }),
		{
			keepPreviousData: true,
			enabled: ids.length > 0,
		}
	);
