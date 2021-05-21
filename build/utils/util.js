"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResData = void 0;
var getResData = function (data, errMsg) {
    if (errMsg) {
        return {
            success: false,
            errMsg: errMsg,
            data: data,
        };
    }
    else {
        return {
            success: true,
            data: data,
        };
    }
};
exports.getResData = getResData;
