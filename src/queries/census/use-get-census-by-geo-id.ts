import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export interface useGetGeoByParentIdsParams
	extends Omit<LocationApi.getGeoByParentIdParams, "id"> {
	ids: string[];
}

export const useGetGeoByParentIds = ({ ids }: useGetGeoByParentIdsParams) => {
	const responses = useQueries({
		queries: ids.map((id) => ({
			queryKey: [QUERY_IDS.census, id],
			queryFn: () =>
				LocationApi.getCensusByGeoId({
					id,
				}),
			keepPreviousData: true,
			staleTime: Infinity,
			cacheTime: Infinity,
			retry: 2,
			retryDelay: 500,
			meta: {
				persist: true,
			},
		})),
	});

	const data = useMemo(
		() =>
			responses?.reduce((acc, response) => {
				if (response.data) {
					acc[response.data?.id] = response.data?.census;
				}

				return acc;
			}, {} as any),
		[responses]
	);

	return {
		data,
		errors: responses
			?.map((response) => response.error)
			.filter((error) => !!error),
		isLoading: responses.some((response) => response.isLoading),
		isFetching: responses.some((response) => response.isFetching),
		refetch() {
			responses.forEach((response) => {
				response.refetch();
			});
		},
	};
};
