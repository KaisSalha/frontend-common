import { QueryClient, useQuery } from "@tanstack/react-query";
import { getQueryKey } from "../../utils/get-query-key";
import { QUERY_IDS } from "../../utils/query-ids";
import { CmsApi } from "../../../services/api";

export const useCategories = () =>
	useQuery(getQueryKey([QUERY_IDS.categories]), async () =>
		CmsApi.getCategories()
	);

interface Params {
	queryClient: QueryClient;
}

export const getCategoriesSSR = async ({ queryClient }: Params) => {
	await queryClient.prefetchQuery(
		getQueryKey([QUERY_IDS.categories]),
		async () => CmsApi.getCategories()
	);
};
