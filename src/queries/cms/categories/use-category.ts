import { QueryClient, useQuery } from "@tanstack/react-query";
import { getQueryKey } from "../../utils/get-query-key";
import { QUERY_IDS } from "../../utils/query-ids";
import { CmsApi } from "../../../services/api";

interface Props {
	slug: string;
}

export const useCategory = ({ slug }: Props) =>
	useQuery(
		getQueryKey([QUERY_IDS.categories, slug]),
		async () =>
			CmsApi.getCategoryBySlug({
				slug,
			}),
		{
			enabled: !!slug,
		}
	);

interface Params extends Props {
	queryClient: QueryClient;
}

export const getCategorySSR = async ({ queryClient, slug }: Params) => {
	await queryClient.prefetchQuery(
		getQueryKey([QUERY_IDS.categories, slug]),
		async () =>
			CmsApi.getCategoryBySlug({
				slug,
			})
	);
};
