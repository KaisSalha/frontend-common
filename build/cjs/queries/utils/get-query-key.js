"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryKey = void 0;
const api_client_1 = require("../../services/api/utils/api-client");
const getQueryKey = (components) => [
    ...components,
    api_client_1.ApiClient.getEnvironment(),
];
exports.getQueryKey = getQueryKey;
//# sourceMappingURL=get-query-key.js.map