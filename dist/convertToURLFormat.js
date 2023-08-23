"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertToURLFormat = (text) => {
    return text.replace(/ /g, "%20").replace(/"/g, "%22");
};
exports.default = convertToURLFormat;
//# sourceMappingURL=convertToURLFormat.js.map