import { QueryClient } from "@tanstack/react-query";
interface Props {
    slug: string;
}
export declare const useCategory: ({ slug }: Props) => import("@tanstack/react-query").UseQueryResult<any, unknown>;
interface Params extends Props {
    queryClient: QueryClient;
}
export declare const getCategorySSR: ({ queryClient, slug }: Params) => Promise<void>;
export {};
