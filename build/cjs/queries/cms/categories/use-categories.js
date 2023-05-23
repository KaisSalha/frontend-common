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
exports.getCategoriesSSR = exports.useCategories = void 0;
const react_query_1 = require("@tanstack/react-query");
const get_query_key_1 = require("../../utils/get-query-key");
const query_ids_1 = require("../../utils/query-ids");
const api_1 = require("../../../services/api");
const useCategories = () => (0, react_query_1.useQuery)((0, get_query_key_1.getQueryKey)([query_ids_1.QUERY_IDS.categories]), () => __awaiter(void 0, void 0, void 0, function* () { return api_1.CmsApi.getCategories(); }));
exports.useCategories = useCategories;
const getCategoriesSSR = ({ queryClient }) => __awaiter(void 0, void 0, void 0, function* () {
    yield queryClient.prefetchQuery((0, get_query_key_1.getQueryKey)([query_ids_1.QUERY_IDS.categories]), () => __awaiter(void 0, void 0, void 0, function* () { return api_1.CmsApi.getCategories(); }));
});
exports.getCategoriesSSR = getCategoriesSSR;
//# sourceMappingURL=use-categories.js.map