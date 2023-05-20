import { ApiClient } from "../../services/api/utils/api-client";

export const getQueryKey = (components: Array<unknown>): Array<unknown> => [
	...components,
	ApiClient.getEnvironment(),
];
