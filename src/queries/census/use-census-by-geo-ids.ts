import { useQueries } from "@tanstack/react-query";
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

	return {
		data: results.map((result) => result.data),
		isLoading: results.some((result) => result.isLoading),
		isError: results.some((result) => result.isError),
	};
};
