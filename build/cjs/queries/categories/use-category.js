"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorySSR = exports.useCategory = void 0;
const react_query_1 = require("@tanstack/react-query");
const get_query_key_1 = require("../utils/get-query-key");
const query_ids_1 = require("../utils/query-ids");
const api_1 = require("../../services/api");
const useCategory = ({ slug }) => (0, react_query_1.useQuery)((0, get_query_key_1.getQueryKey)([query_ids_1.QUERY_IDS.categories, slug]), () => __awaiter(void 0, void 0, void 0, function* () {
    return api_1.CmsApi.getCategoryBySlug({
        slug,
    });
}), {
    enabled: !!slug,
});
exports.useCategory = useCategory;
const getCategorySSR = ({ queryClient, slug }) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryClient.prefetchQuery((0, get_query_key_1.getQueryKey)([query_ids_1.QUERY_IDS.categories, slug]), () => __awaiter(void 0, void 0, void 0, function* () {
        return api_1.CmsApi.getCategoryBySlug({
            slug,
        });
    }));
});
exports.getCategorySSR = getCategorySSR;
//# sourceMappingURL=use-category.js.map