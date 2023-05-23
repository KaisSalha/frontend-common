var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getWithAuth } from "./utils/api-common";
import { ApiClient } from "./utils/api-client";
/**
 * Manages requests to the cms service.
 * https://github.com/kaissalha/ribly-cms
 */
const serviceName = "cms";
ApiClient.registerService({
    name: serviceName,
    timeout: 10000,
    environments: {
        staging: "http://localhost:3010/api",
        prod: "http://localhost:3010/api",
    },
});
export const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield getWithAuth(ApiClient.getClient(serviceName), "/categories");
    return response.data;
});
export const getCategoryBySlug = ({ slug, }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield getWithAuth(ApiClient.getClient(serviceName), `/categories/slug/${slug}`);
    return response.data;
});
//# sourceMappingURL=cms-api.js.map