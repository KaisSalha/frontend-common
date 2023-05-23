import { QueryClient } from "@tanstack/react-query";
export declare const useCategories: () => import("@tanstack/react-query").UseQueryResult<any, unknown>;
interface Params {
    queryClient: QueryClient;
}
export declare const getCategoriesSSR: ({ queryClient }: Params) => Promise<void>;
export {};
