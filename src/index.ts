import axios, { AxiosRequestConfig } from "axios";
import {
  FetcherParamsWithoutMethod,
  FetcherFn,
  SortOption,
  Constraints,
  Initialize,
} from "./types";
import { bubbleConfig } from "./config";

const fetcher: FetcherFn = async ({
  method = "GET",
  body = null,
  objectName,
  sortOption,
  constraints,
}) => {
  const { apiKey, domain, isDev } = bubbleConfig;
  const baseUrl = isDev
    ? `https://${domain}/version-test`
    : `https://${domain}`;

  const encodedConstraints = constraints
    ? encodeURIComponent(JSON.stringify(constraints))
    : ``;

  const uri = `${baseUrl}/api/1.1/obj/${objectName}?constraints=[${encodedConstraints}]`;

  const requestInit: AxiosRequestConfig = {
    method,
    url: uri,
    data: body,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: sortOption,
  };

  try {
    let result: any[] = [];
    const response = await axios.request(requestInit);
    if (method.toLowerCase() === "get") {
      const { remaining, count } = response.data.response;
      if (remaining === 0) {
        result = [...response.data.response.results];
      }

      if (remaining > 0) {
        const pages = Math.ceil((remaining + count) / 100);
        for (let index = 0; index <= pages; index++) {
          let cursor = index * 100;
          const res = await axios(`${uri}/${objectName}?cursor=${cursor}`);
          for (const element of res.data.response.results) {
            result.push(element);
          }
        }
      }
    } else {
      result = response.data;
    }
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Bubble Fetcher Error API Request Failed");
  }
};

const get = async <ResponseData>(
  objectName: string,
  sortOption?: SortOption,
  constraints?: Constraints
) => {
  return await fetcher<ResponseData>({
    method: "GET",
    objectName,
    sortOption,
    constraints,
  });
};

const post = async <RequestData>({
  objectName,
  body,
}: FetcherParamsWithoutMethod) => {
  return await fetcher<RequestData>({
    method: "POST",
    objectName,
    body,
  });
};

const patch = async <RequestData>({
  objectName,
  body,
}: FetcherParamsWithoutMethod) => {
  return await fetcher<RequestData>({
    method: "PATCH",
    objectName,
    body,
  });
};

const put = async <RequestData>({
  objectName,
  body,
}: FetcherParamsWithoutMethod) => {
  return await fetcher<RequestData>({
    method: "PUT",
    objectName,
    body,
  });
};

const deleteTable = async <RequestData>(objectName: string) => {
  return await fetcher<RequestData>({
    method: "DELETE",
    objectName,
  });
};

export const bubbleFetcher = {
  get: (
    objectName: string,
    sortOption?: SortOption,
    constrains?: Constraints
  ) => get(objectName, sortOption, constrains),
  post: (data: FetcherParamsWithoutMethod) => post(data),
  patch: (data: FetcherParamsWithoutMethod) => patch(data),
  put: (data: FetcherParamsWithoutMethod) => put(data),
  delete: (objectName: string) => deleteTable(objectName),
  init: ({ apiKey, domain, isDev }: Initialize) => {
    bubbleConfig.apiKey = apiKey;
    bubbleConfig.domain = domain;
    bubbleConfig.isDev = isDev;
  },
};
