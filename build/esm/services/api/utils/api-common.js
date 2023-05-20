var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getJWT } from "./auth";
const getToken = (jwt) => __awaiter(void 0, void 0, void 0, function* () {
    if (jwt) {
        return jwt;
    }
    try {
        return yield getJWT();
    }
    catch (_a) {
        return null;
    }
});
export const getWithAuth = (client, url, jwt = null) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken(jwt);
    return client.get(url, {
        headers: { "X-Properly-Auth": token },
    });
});
export const postWithAuth = (client, url, data, jwt = null) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken(jwt);
    return client.post(url, data, {
        headers: { "X-Properly-Auth": token },
    });
});
export const putWithAuth = (client, url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken();
    return client.put(url, data, {
        headers: { "X-Properly-Auth": token },
    });
});
export const patchWithAuth = (client, url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken();
    return client.patch(url, data, {
        headers: { "X-Properly-Auth": token },
    });
});
export const deleteWithAuth = (client, url, config) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken();
    return client.delete(url, Object.assign({ headers: { "X-Properly-Auth": token } }, config));
});
//# sourceMappingURL=api-common.js.map