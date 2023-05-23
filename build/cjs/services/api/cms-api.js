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
exports.getCategoryBySlug = exports.getCategories = void 0;
const api_common_1 = require("./utils/api-common");
const api_client_1 = require("./utils/api-client");
/**
 * Manages requests to the cms service.
 * https://github.com/kaissalha/ribly-cms
 */
const serviceName = "cms";
api_client_1.ApiClient.registerService({
    name: serviceName,
    timeout: 10000,
    environments: {
        staging: "http://localhost:3010/api",
        prod: "http://localhost:3010/api",
    },
});
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, api_common_1.getWithAuth)(api_client_1.ApiClient.getClient(serviceName), "/categories");
    return response.data;
});
exports.getCategories = getCategories;
const getCategoryBySlug = ({ slug, }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, api_common_1.getWithAuth)(api_client_1.ApiClient.getClient(serviceName), `/categories/slug/${slug}`);
    return response.data;
});
exports.getCategoryBySlug = getCategoryBySlug;
//# sourceMappingURL=cms-api.js.map