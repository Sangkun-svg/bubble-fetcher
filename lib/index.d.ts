import { FetcherParamsWithoutMethod, Initialize, Options } from "./types";
export declare const bubbleFetcher: {
    get: (objectName: string, options?: Options) => Promise<any>;
    post: (objectName: string, data: FetcherParamsWithoutMethod) => Promise<any>;
    patch: (objectName: string, data: FetcherParamsWithoutMethod) => Promise<any>;
    put: (objectName: string, data: FetcherParamsWithoutMethod) => Promise<any>;
    delete: (objectName: string) => Promise<any>;
    init: ({ apiKey, domain, isDev }: Initialize) => void;
};
