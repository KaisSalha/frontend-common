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
exports.deleteWithAuth = exports.patchWithAuth = exports.putWithAuth = exports.postWithAuth = exports.getWithAuth = void 0;
const auth_1 = require("./auth");
const getToken = (jwt) => __awaiter(void 0, void 0, void 0, function* () {
    if (jwt) {
        return jwt;
    }
    try {
        return yield (0, auth_1.getJWT)();
    }
    catch (_a) {
        return null;
    }
});
const getWithAuth = (client, url, jwt = null) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken(jwt);
    return client.get(url, {
        headers: { "X-Properly-Auth": token },
    });
});
exports.getWithAuth = getWithAuth;
const postWithAuth = (client, url, data, jwt = null) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken(jwt);
    return client.post(url, data, {
        headers: { "X-Properly-Auth": token },
    });
});
exports.postWithAuth = postWithAuth;
const putWithAuth = (client, url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken();
    return client.put(url, data, {
        headers: { "X-Properly-Auth": token },
    });
});
exports.putWithAuth = putWithAuth;
const patchWithAuth = (client, url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken();
    return client.patch(url, data, {
        headers: { "X-Properly-Auth": token },
    });
});
exports.patchWithAuth = patchWithAuth;
const deleteWithAuth = (client, url, config) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield getToken();
    return client.delete(url, Object.assign({ headers: { "X-Properly-Auth": token } }, config));
});
exports.deleteWithAuth = deleteWithAuth;
//# sourceMappingURL=api-common.js.map