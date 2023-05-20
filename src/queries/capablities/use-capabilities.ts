import { QueryClient, useQuery } from "@tanstack/react-query";
import { getQueryKey } from "../utils/get-query-key";
import { QUERY_IDS } from "../utils/query-ids";
import { CapabilitiesApi } from "../../services/api";

interface Props {
	properlyCityCode?: string;
	lat?: number;
	lng?: number;
}

export const useCapabilities = ({ properlyCityCode, lat, lng }: Props) =>
	useQuery(
		getQueryKey([QUERY_IDS.capabilities, !!lat, !!lng, !!properlyCityCode]),
		async () => {
			if (properlyCityCode) {
				return CapabilitiesApi.getCapabilitiesByCityCode({
					properlyCityCode,
				});
			}
			if (lat && lng) {
				return CapabilitiesApi.getCapabilitiesByLatLng({
					lat,
					lng,
				});
			}

			throw new Error("Invalid query params");
		},
		{
			enabled: !!properlyCityCode || (!!lat && !!lng),
		}
	);

interface Params extends Props {
	queryClient: QueryClient;
}

export const getCapabilitiesSSR = async ({
	queryClient,
	properlyCityCode,
	lat,
	lng,
}: Params) => {
	await queryClient.prefetchQuery(
		getQueryKey([QUERY_IDS.capabilities, !!lat, !!lng, !!properlyCityCode]),
		async () => {
			if (properlyCityCode) {
				return CapabilitiesApi.getCapabilitiesByCityCode({
					properlyCityCode,
				});
			}
			if (lat && lng) {
				return CapabilitiesApi.getCapabilitiesByLatLng({
					lat,
					lng,
				});
			}

			throw new Error("Invalid query params");
		}
	);
};
