import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export const useCensusByGeoIds = ({
	ids,
}: LocationApi.getCensusByGeoIdsParams) => {
	// Split ids into chunks of 30
	const chunkSize = 30;
	const idChunks = Array(Math.ceil(ids.length / chunkSize))
		.fill(null)
		.map((_, index) =>
			ids.slice(index * chunkSize, (index + 1) * chunkSize)
		);

	// Create queries for each chunk
	const queries = idChunks.map((idChunk, index) => ({
		queryKey: [QUERY_IDS.census, index, ...idChunk],
		queryFn: () => LocationApi.getCensusByGeoIds({ ids: idChunk }),
		keepPreviousData: true,
		enabled: idChunk.length > 0,
	}));

	const results = useQueries({ queries });

	const data = useMemo(
		() =>
			results.reduce((acc, result) => {
				if (result.data) {
					return { ...acc, ...result.data.census };
				}

				return acc;
			}, {}),
		[results]
	);

	return {
		data,
		isLoading: results.some((result) => result.isLoading),
		isError: results.some((result) => result.isError),
	};
};
