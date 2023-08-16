import { Method } from "axios";

export type FetcherParams<RequestData = any> = {
  method?: Method;
  body?: RequestData;
  objectName?: string;
  BUBBLE_API_KEY?: string;
  isDev?: boolean;
  domain?: string;
};

export type FetcherParamsWithoutMethod = Omit<FetcherParams, "method">;

export type FetcherFn = <RequestData = {}>(
  params: FetcherParams<RequestData>
) => Promise<any>;

export type SortOption = {
  key: string;
  order: "ASC" | "DESC";
};
export type ConstraintType = "equals" | "not equal";

export type Constraints = {
  key: string;
  constraint_type: ConstraintType;
  value?: string | boolean;
};
