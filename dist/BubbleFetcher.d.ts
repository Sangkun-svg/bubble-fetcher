import { FetcherParamsWithoutMethod, SortOption, Constraints } from "./types";
export type { Constraints };
export declare const bubbleFetcher: {
    get: (objectName: string) => Promise<any>;
    post: (data: FetcherParamsWithoutMethod) => Promise<any>;
    patch: (data: FetcherParamsWithoutMethod) => Promise<any>;
    put: (data: FetcherParamsWithoutMethod) => Promise<any>;
    delete: (objectName: string) => Promise<any>;
    getWithConstraints: (objectName: string, constraints: Constraints[], sortOption?: SortOption) => Promise<any>;
};
