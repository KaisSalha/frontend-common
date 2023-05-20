import { QueryClient } from "@tanstack/react-query";
import { CapabilitiesApi } from "../../services/api";
interface Props {
    properlyCityCode?: string;
    lat?: number;
    lng?: number;
}
export declare const useCapabilities: ({ properlyCityCode, lat, lng }: Props) => import("@tanstack/react-query").UseQueryResult<CapabilitiesApi.Capabilities, unknown>;
interface Params extends Props {
    queryClient: QueryClient;
}
export declare const getCapabilitiesSSR: ({ queryClient, properlyCityCode, lat, lng, }: Params) => Promise<void>;
export {};
