import axios, { AxiosRequestConfig } from "axios";
import {
  FetcherParamsWithoutMethod,
  FetcherFn,
  Initialize,
  Options, PageOption,
} from "./types";
import { bubbleConfig } from "./config";

const fetcher: FetcherFn = async ({
  method = "GET",
  body = null,
  objectName,
  options,
}) => {
  const { apiKey, domain, isDev } = bubbleConfig;
  const baseUrl = isDev
    ? `https://${domain}/version-test`
    : `https://${domain}`;

  const encodedConstraints = options?.constraints
    ? encodeURIComponent(JSON.stringify(options?.constraints))
    : ``;

  const pageUri = getPageParams(options?.pageOption);
  const uri = `${baseUrl}/api/1.1/obj${objectName}?constraints=[${encodedConstraints}]${pageUri}`;

  const requestInit: AxiosRequestConfig = {
    method,
    url: uri,
    data: body,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: options?.sortOption,
  };

  try {
    const response = await axios.request(requestInit);
    if (method.toLowerCase() === "get") {
      const { remaining, count } = response.data.response;

      if (pageUri || remaining === 0) {
        return [...response.data.response.results];
      }

      if (!pageUri && remaining > 0) {
        let result: any[] = [];
        const pages = Math.ceil((remaining + count) / 100);
        for (let index = 0; index <= pages; index++) {
          let cursor = index * 100;
          const res = await axios(`${uri}&cursor=${cursor}`);
          for (const element of res.data.response.results) {
            result.push(element);
          }
        }
        return result;
      }
    } else {
      return response.data;
    }
    return response.data.response.results;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Bubble Fetcher Error API Request Failed");
  }
};

const get = async <ResponseData>(objectName: string, options?: Options) => {
  return await fetcher<ResponseData>({
    method: "GET",
    objectName,
    options,
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

const getPageParams = (pageOption: PageOption) => {
  const { cursor, limit } = pageOption;

  if (!cursor && !limit) return ``;

  if (cursor && !limit) return `&cursor=${cursor}`;

  if (!cursor && limit) return `&cursor=0&limit=${limit}`;

  return `&cursor=${cursor}&limit=${limit}`;
};

export const bubbleFetcher = {
  get: (
    objectName: string,
    options?: Options
  ) => get(objectName, options),
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
