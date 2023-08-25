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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleFetcher = void 0;
var axios_1 = require("axios");
var config_1 = require("./config");
var fetcher = function (_a) {
    var _b = _a.method, method = _b === void 0 ? "GET" : _b, _c = _a.body, body = _c === void 0 ? null : _c, objectName = _a.objectName, sortOption = _a.sortOption, constraints = _a.constraints;
    return __awaiter(void 0, void 0, void 0, function () {
        var apiKey, domain, isDev, baseUrl, encodedConstraints, uri, requestInit, result, response, _d, remaining, count, pages, index, cursor, res, _i, _e, element, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    apiKey = config_1.bubbleConfig.apiKey, domain = config_1.bubbleConfig.domain, isDev = config_1.bubbleConfig.isDev;
                    baseUrl = isDev
                        ? "https://".concat(domain, "/version-test")
                        : "https://".concat(domain);
                    encodedConstraints = constraints
                        ? encodeURIComponent(JSON.stringify(constraints))
                        : "";
                    uri = "".concat(baseUrl, "/api/1.1/obj/").concat(objectName, "?constraints=[").concat(encodedConstraints, "]");
                    requestInit = {
                        method: method,
                        url: uri,
                        data: body,
                        headers: {
                            Authorization: "Bearer ".concat(apiKey),
                        },
                        params: sortOption,
                    };
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 9, , 10]);
                    result = [];
                    return [4 /*yield*/, axios_1.default.request(requestInit)];
                case 2:
                    response = _f.sent();
                    if (!(method.toLowerCase() === "get")) return [3 /*break*/, 7];
                    _d = response.data.response, remaining = _d.remaining, count = _d.count;
                    if (remaining === 0) {
                        result = __spreadArray([], response.data.response.results, true);
                    }
                    if (!(remaining > 0)) return [3 /*break*/, 6];
                    pages = Math.ceil((remaining + count) / 100);
                    index = 0;
                    _f.label = 3;
                case 3:
                    if (!(index <= pages)) return [3 /*break*/, 6];
                    cursor = index * 100;
                    return [4 /*yield*/, (0, axios_1.default)("".concat(uri, "/").concat(objectName, "?cursor=").concat(cursor))];
                case 4:
                    res = _f.sent();
                    for (_i = 0, _e = res.data.response.results; _i < _e.length; _i++) {
                        element = _e[_i];
                        result.push(element);
                    }
                    _f.label = 5;
                case 5:
                    index++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    result = response.data;
                    _f.label = 8;
                case 8: return [2 /*return*/, result];
                case 9:
                    error_1 = _f.sent();
                    console.error("Error:", error_1);
                    throw new Error("Bubble Fetcher Error API Request Failed");
                case 10: return [2 /*return*/];
            }
        });
    });
};
var get = function (objectName, sortOption, constraints) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetcher({
                    method: "GET",
                    objectName: objectName,
                    sortOption: sortOption,
                    constraints: constraints,
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var post = function (_a) {
    var objectName = _a.objectName, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetcher({
                        method: "POST",
                        objectName: objectName,
                        body: body,
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
var patch = function (_a) {
    var objectName = _a.objectName, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetcher({
                        method: "PATCH",
                        objectName: objectName,
                        body: body,
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
var put = function (_a) {
    var objectName = _a.objectName, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetcher({
                        method: "PUT",
                        objectName: objectName,
                        body: body,
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
var deleteTable = function (objectName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetcher({
                    method: "DELETE",
                    objectName: objectName,
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.bubbleFetcher = {
    get: function (objectName, sortOption, constrains) { return get(objectName, sortOption, constrains); },
    post: function (data) { return post(data); },
    patch: function (data) { return patch(data); },
    put: function (data) { return put(data); },
    delete: function (objectName) { return deleteTable(objectName); },
    init: function (_a) {
        var apiKey = _a.apiKey, domain = _a.domain, isDev = _a.isDev;
        config_1.bubbleConfig.apiKey = apiKey;
        config_1.bubbleConfig.domain = domain;
        config_1.bubbleConfig.isDev = isDev;
    },
};
