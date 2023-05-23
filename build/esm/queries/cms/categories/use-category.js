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
import { getQueryKey } from "../../utils/get-query-key";
import { QUERY_IDS } from "../../utils/query-ids";
import { CmsApi } from "../../../services/api";
export const useCategory = ({ slug }) => useQuery(getQueryKey([QUERY_IDS.categories, slug]), () => __awaiter(void 0, void 0, void 0, function* () {
    return CmsApi.getCategoryBySlug({
        slug,
    });
}), {
    enabled: !!slug,
});
export const getCategorySSR = ({ queryClient, slug }) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryClient.prefetchQuery(getQueryKey([QUERY_IDS.categories, slug]), () => __awaiter(void 0, void 0, void 0, function* () {
        return CmsApi.getCategoryBySlug({
            slug,
        });
    }));
});
//# sourceMappingURL=use-category.js.map