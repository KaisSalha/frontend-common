import { ApiClient } from "../../services/api/utils/api-client";
export const getQueryKey = (components) => [
    ...components,
    ApiClient.getEnvironment(),
];
//# sourceMappingURL=get-query-key.js.map