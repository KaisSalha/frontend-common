import { QueryClient, useQuery } from "@tanstack/react-query";
import { Locale, useLocale } from "providers/LocaleProvider";
import { getQueryKey } from "../../utils/get-query-key";
import { QUERY_IDS } from "../../utils/query-ids";
import { CmsApi } from "../../../services/api";

export const useCategories = () => {
	const { locale } = useLocale();

	return useQuery(getQueryKey([QUERY_IDS.categories, locale]), async () =>
		CmsApi.getCategories({ locale })
	);
};

interface Params {
	queryClient: QueryClient;
	locale: Locale;
}

export const getCategoriesSSR = async ({ queryClient, locale }: Params) => {
	await queryClient.prefetchQuery(
		getQueryKey([QUERY_IDS.categories]),
		async () =>
			CmsApi.getCategories({
				locale,
			})
	);
};
