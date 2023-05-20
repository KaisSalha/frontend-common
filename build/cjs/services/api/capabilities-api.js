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
exports.getCapabilitiesByLatLng = exports.getCapabilitiesByCityCode = exports.getMobileCapabilities = void 0;
const api_common_1 = require("./utils/api-common");
const api_client_1 = require("./utils/api-client");
/**
 * Manages requests to the capabilities service.
 * https://github.com/GoProperly/capabilities-v2
 */
const serviceName = "capabilities";
api_client_1.ApiClient.registerService({
    name: serviceName,
    timeout: 10000,
    environments: {
        staging: "https://7cx4in3gdl.execute-api.us-east-1.amazonaws.com/staging",
        prod: "https://33boyd70m0.execute-api.us-east-1.amazonaws.com/prod",
    },
});
const getMobileCapabilities = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, api_common_1.getWithAuth)(api_client_1.ApiClient.getClient(serviceName), "/mobile");
    return response.data;
});
exports.getMobileCapabilities = getMobileCapabilities;
const getCapabilitiesByCityCode = ({ properlyCityCode, }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, api_common_1.getWithAuth)(api_client_1.ApiClient.getClient(serviceName), `/capabilities/id/${properlyCityCode}`);
    return response.data;
});
exports.getCapabilitiesByCityCode = getCapabilitiesByCityCode;
const getCapabilitiesByLatLng = ({ lat, lng, }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, api_common_1.getWithAuth)(api_client_1.ApiClient.getClient(serviceName), `/capabilities/location?lat=${lat}&lng=${lng}`);
    return response.data;
});
exports.getCapabilitiesByLatLng = getCapabilitiesByLatLng;
//# sourceMappingURL=capabilities-api.js.map