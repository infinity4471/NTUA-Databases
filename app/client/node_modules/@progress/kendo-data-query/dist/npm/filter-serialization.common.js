"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
/**
 * @hidden
 * Creates a single arity function which wraps the value based on the provided predicate.
 * @example
 * ```
 * wrapIf(() => ignoreCase) `tolower(${field})`
 * //ignoreCase=true -> tolower(${field})`
 * //ignoreCase=false -> ${field}`
 * ```
 */
exports.wrapIf = function (predicate) { return function (str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return predicate() ? "" + str[0] + args[0] + str[1] : args[0];
}; };
/**
 * @hidden
 */
exports.toUTC = function (date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
};
/**
 * @hidden
 */
exports.quote = function (_a) {
    var field = _a.field, value = _a.value, ignoreCase = _a.ignoreCase, operator = _a.operator;
    return ({
        value: "'" + value.replace(/'/g, "''") + "'",
        field: field,
        ignoreCase: ignoreCase,
        operator: operator
    });
};
/**
 * @hidden
 */
exports.encodeValue = function (_a) {
    var field = _a.field, value = _a.value, ignoreCase = _a.ignoreCase, operator = _a.operator;
    return ({
        value: "" + encodeURIComponent(value),
        field: field,
        ignoreCase: ignoreCase,
        operator: operator
    });
};
/**
 * @hidden
 */
exports.toLower = function (_a) {
    var field = _a.field, value = _a.value, ignoreCase = _a.ignoreCase, operator = _a.operator;
    return ({
        field: exports.wrapIf(function () { return ignoreCase; })(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["tolower(", ")"], ["tolower(", ")"])), field),
        value: value,
        ignoreCase: ignoreCase,
        operator: operator
    });
};
/**
 * @hidden
 */
exports.normalizeField = function (_a) {
    var field = _a.field, value = _a.value, ignoreCase = _a.ignoreCase, operator = _a.operator;
    return ({
        value: value,
        field: field.replace(/\./g, "/"),
        ignoreCase: ignoreCase,
        operator: operator
    });
};
/**
 * @hidden
 */
exports.isStringValue = function (x) { return utils_1.isString(x.value); };
/**
 * @hidden
 */
exports.isDateValue = function (x) { return utils_1.isDate(x.value); };
/**
 * @hidden
 */
exports.serializeFilters = function (map, join) { return function (filter) {
    var brackets = exports.wrapIf(function () { return filter.filters.length > 1; });
    return brackets(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["(", ")"], ["(",
        ")"])), filter.filters
        .map(map)
        .join(join(filter)));
}; };
var templateObject_1, templateObject_2;
