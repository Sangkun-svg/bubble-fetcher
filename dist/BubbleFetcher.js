"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleFetcher = void 0;
const axios_1 = require("axios");
const convertToURLFormat_1 = require("./convertToURLFormat");
const fetcher = ({ method = "GET", body = null, objectName, BUBBLE_API_KEY, isDev = false, domain, }) => __awaiter(void 0, void 0, void 0, function* () {
    const uri = isDev
        ? `https://${domain}/version-test/api/1.1/obj/${objectName}`
        : `https://${domain}/api/1.1/obj/${objectName}`;
    const requestInit = {
        method,
        url: uri,
        data: body,
        headers: {
            Authorization: `Bearer ${BUBBLE_API_KEY}`,
        },
    };
    try {
        let result = [];
        const response = yield axios_1.default.request(requestInit);
        if (method.toLowerCase() === "get") {
            const { remaining, count } = response.data.response;
            if (remaining === 0) {
                result = [...response.data.response.results];
            }
            if (remaining > 0) {
                const pages = Math.ceil((remaining + count) / 100);
                for (let index = 0; index <= pages; index++) {
                    const cursor = index * 100;
                    const customInit = Object.assign({ url: `${requestInit.url}?cursor=${cursor}` }, requestInit);
                    const response = yield (0, axios_1.default)(customInit);
                    result = [...response.data.response.results];
                }
            }
        }
        else {
            result = response.data;
        }
        return result;
    }
    catch (error) {
        console.error("Error:", error);
        throw new Error("Bubble Fetcher Error API Request Failed");
    }
});
const get = (objectName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher({ method: "GET", objectName });
});
const post = ({ objectName, body, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher({ method: "POST", objectName, body });
});
const patch = ({ objectName, body, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher({
        method: "PATCH",
        objectName,
        body,
    });
});
const put = ({ objectName, body, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher({ method: "PUT", objectName, body });
});
const deleteTable = (objectName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetcher({ method: "DELETE", objectName });
});
const constraintsDefaultFormat = ({ key, constraint_type, value, }) => {
    return `{ "key": "${key}", "constraint_type": "${constraint_type}", "value": "${value}" } `;
};
const getWithConstraints = (objectName, constraints, sortOption) => __awaiter(void 0, void 0, void 0, function* () {
    const formattedConstraints = constraints
        .map((el) => constraintsDefaultFormat(el))
        .join(",");
    const formattedParameter = (0, convertToURLFormat_1.default)(`${objectName}?constraints=[${formattedConstraints}]`);
    return yield fetcher({
        method: "GET",
        objectName: sortOption
            ? `${formattedParameter}&sort_field=${sortOption.key}&=${(sortOption === null || sortOption === void 0 ? void 0 : sortOption.order) === "ASC" ? true : false}`
            : formattedParameter,
    });
});
exports.bubbleFetcher = {
    get: (objectName) => get(objectName),
    post: (data) => post(data),
    patch: (data) => patch(data),
    put: (data) => put(data),
    delete: (objectName) => deleteTable(objectName),
    getWithConstraints: (objectName, constraints, sortOption) => getWithConstraints(objectName, constraints, sortOption),
};
//# sourceMappingURL=BubbleFetcher.js.map