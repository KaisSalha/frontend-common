import { QueryClient, useQuery } from "@tanstack/react-query";
import { Locale } from "../../../types";
import { useLocale } from "../../../providers/LocaleProvider";
import { getQueryKey } from "../../utils/get-query-key";
import { QUERY_IDS } from "../../utils/query-ids";
import { CmsApi } from "../../../services/api";

interface Props {
	slug: string;
}

export const useCategory = ({ slug }: Props) => {
	const { locale } = useLocale();

	return useQuery(
		getQueryKey([QUERY_IDS.categories, slug, locale]),
		async () =>
			CmsApi.getCategoryBySlug({
				slug,
				locale,
			}),
		{
			enabled: !!slug,
		}
	);
};

interface Params extends Props {
	queryClient: QueryClient;
	locale: Locale;
}

export const getCategorySSR = async ({ queryClient, slug, locale }: Params) => {
	await queryClient.prefetchQuery(
		getQueryKey([QUERY_IDS.categories, slug]),
		async () =>
			CmsApi.getCategoryBySlug({
				slug,
				locale,
			})
	);
};
