import { FetcherParamsWithoutMethod, SortOption, Constraints, Initialize } from "./types";
export declare const bubbleFetcher: {
    get: (objectName: string, sortOption?: SortOption, constrains?: Constraints) => Promise<any>;
    post: (data: FetcherParamsWithoutMethod) => Promise<any>;
    patch: (data: FetcherParamsWithoutMethod) => Promise<any>;
    put: (data: FetcherParamsWithoutMethod) => Promise<any>;
    delete: (objectName: string) => Promise<any>;
    init: ({ apiKey, domain, isDev }: Initialize) => void;
};
