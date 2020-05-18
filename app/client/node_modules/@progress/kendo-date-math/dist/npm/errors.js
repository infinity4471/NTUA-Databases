"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @hidden */
exports.NO_TZ_INFO = 'The required {0} timezone information is not provided!';
/** @hidden */
exports.INVALID_TZ_STRUCTURE = 'The provided timezone information has invalid stucture!';
var formatRegExp = /\{(\d+)}?\}/g;
var flatten = function (arr) { return arr.reduce(function (a, b) { return a.concat(b); }, []); };
/** @hidden */
exports.formatMessage = function (message) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var flattenValues = flatten(values);
    return message.replace(formatRegExp, function (_, index) { return flattenValues[parseInt(index, 10)]; });
};
