import { Method } from "axios";
export type FetcherParams<RequestData = any> = {
    method?: Method;
    body?: RequestData;
    objectName: string;
    options?: Options;
};
export type FetcherParamsWithoutMethod = Omit<FetcherParams, "method" | "objectName">;
export type FetcherFn = <RequestData = {}>(params: FetcherParams<RequestData>) => Promise<any>;
export type Options = {
    sortOption?: SortOption;
    constraints?: Constraints;
    pageOption?: PageOption;
};
export type SortOption = {
    sort_field: string;
    descending: boolean;
    additional_sort_fields?: string[];
};
export type PageOption = {
    cursor?: number;
    limit?: number;
};
export type Constraints = {
    key: string;
    constraint_type: ConstraintType;
    value?: string | boolean;
};
export type Initialize = {
    apiKey: string;
    domain: string;
    isDev?: boolean;
};
export type ConstraintType = "equals" | "not equal" | "is_empty" | "is_not_empty" | "text contains" | "not text contains" | "greater than" | "less than" | "in" | "not in" | "contains" | "not contains" | "empty" | "not empty" | "geographic_search";
