var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useQuery } from "@tanstack/react-query";
import { getQueryKey } from "../utils/get-query-key";
import { QUERY_IDS } from "../utils/query-ids";
import { CapabilitiesApi } from "../../services/api";
export const useCapabilities = ({ properlyCityCode, lat, lng }) => useQuery(getQueryKey([QUERY_IDS.capabilities, !!lat, !!lng, !!properlyCityCode]), () => __awaiter(void 0, void 0, void 0, function* () {
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
}), {
    enabled: !!properlyCityCode || (!!lat && !!lng),
});
export const getCapabilitiesSSR = ({ queryClient, properlyCityCode, lat, lng, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryClient.prefetchQuery(getQueryKey([QUERY_IDS.capabilities, !!lat, !!lng, !!properlyCityCode]), () => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
});
//# sourceMappingURL=use-capabilities.js.map