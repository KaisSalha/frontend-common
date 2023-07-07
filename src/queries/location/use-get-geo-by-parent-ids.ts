import { useQueries } from "@tanstack/react-query";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export interface useGetGeoByParentIdsParams
	extends Omit<LocationApi.getGeoByParentIdParams, "id" | "signal"> {
	ids: string[];
	enabled?: boolean;
}

export const useGetGeoByParentIds = ({
	ids,
	geo_level,
	parent_level,
	enabled = true,
}: useGetGeoByParentIdsParams) => {
	const responses = useQueries({
		queries: ids.map((id) => ({
			queryKey: [QUERY_IDS.geos, id, geo_level, parent_level],
			queryFn: ({ signal }: { signal?: any }) =>
				LocationApi.getGeosByParentId({
					id,
					geo_level,
					parent_level,
					signal,
				}),
			enabled,
			keepPreviousData: true,
			staleTime: Infinity,
			cacheTime: Infinity,
			retry: 2,
			retryDelay: 1000,
			meta: {
				persist: true,
			},
		})),
	});

	return {
		data: {
			polygons: responses
				.map((response) => response?.data?.polygons)
				.flat()
				.filter((polygon) => !!polygon),
		},
		errors: responses
			?.map((response) => response.error)
			.filter((error) => !!error),
		isLoading: responses.some((response) => response.isLoading),
		isFetching: responses.some((response) => response.isFetching),
		refetch() {
			responses
				.filter((response) => response.isError)
				.forEach((response) => {
					response.refetch();
				});
		},
	};
};