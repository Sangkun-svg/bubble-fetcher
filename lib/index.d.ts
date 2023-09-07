import { FetcherParamsWithoutMethod, Initialize, Options } from "./types";
export declare const bubbleFetcher: {
    get: (objectName: string, options?: Options) => Promise<any>;
    post: (data: FetcherParamsWithoutMethod) => Promise<any>;
    patch: (data: FetcherParamsWithoutMethod) => Promise<any>;
    put: (data: FetcherParamsWithoutMethod) => Promise<any>;
    delete: (objectName: string) => Promise<any>;
    init: ({ apiKey, domain, isDev }: Initialize) => void;
};
