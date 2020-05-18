"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var filter_descriptor_interface_1 = require("./filtering/filter-descriptor.interface");
var funcs_1 = require("./funcs");
var filter_serialization_common_1 = require("./filter-serialization.common");
var formatDate = function (_a) {
    var utcDates = _a.utcDates;
    return function (_a) {
        var field = _a.field, value = _a.value, ignoreCase = _a.ignoreCase, operator = _a.operator;
        return ({
            value: JSON.stringify(!utcDates ? filter_serialization_common_1.toUTC(value) : value).replace(/"/g, ""),
            field: field,
            ignoreCase: ignoreCase,
            operator: operator
        });
    };
};
var fnFormatter = function (_a) {
    var operator = _a.operator;
    return function (_a) {
        var field = _a.field, value = _a.value;
        return operator + "(" + field + "," + value + ")";
    };
};
var singleOperatorFormatter = function (_a) {
    var operator = _a.operator;
    return function (_a) {
        var field = _a.field, value = _a.value;
        return field + " " + operator + " " + value;
    };
};
var stringFormat = function (formatter) { return funcs_1.compose(formatter, filter_serialization_common_1.encodeValue, filter_serialization_common_1.quote, filter_serialization_common_1.toLower, filter_serialization_common_1.normalizeField); };
var stringFnOperator = function (settings) { return stringFormat(fnFormatter(settings)); };
var stringOperator = function (settings) { return stringFormat(singleOperatorFormatter(settings)); };
var numericOperator = function (settings) { return funcs_1.compose(singleOperatorFormatter(settings), filter_serialization_common_1.normalizeField); };
var dateOperator = function (settings) { return funcs_1.compose(singleOperatorFormatter(settings), filter_serialization_common_1.normalizeField, formatDate(settings)); };
var ifDate = function (settings) { return funcs_1.ifElse(filter_serialization_common_1.isDateValue, dateOperator(settings), numericOperator(settings)); };
var typedOperator = function (settings) { return funcs_1.ifElse(filter_serialization_common_1.isStringValue, stringOperator(settings), ifDate(settings)); };
var appendEqual = function (str) { return str + " eq -1"; };
var nonValueExpression = function (formatter) { return funcs_1.compose(formatter, filter_serialization_common_1.normalizeField); };
var filterOperators = function (operator, settings) { return ({
    contains: stringFnOperator(tslib_1.__assign({}, settings, { operator: "contains" })),
    doesnotcontain: funcs_1.compose(appendEqual, stringFnOperator(tslib_1.__assign({}, settings, { operator: "indexof" }))),
    endswith: stringFnOperator(tslib_1.__assign({}, settings, { operator: "endswith" })),
    eq: typedOperator(tslib_1.__assign({}, settings, { operator: "eq" })),
    gt: typedOperator(tslib_1.__assign({}, settings, { operator: "gt" })),
    gte: typedOperator(tslib_1.__assign({}, settings, { operator: "ge" })),
    isempty: nonValueExpression(function (_a) {
        var field = _a.field;
        return field + " eq ''";
    }),
    isnotempty: nonValueExpression(function (_a) {
        var field = _a.field;
        return field + " ne ''";
    }),
    isnotnull: nonValueExpression(function (_a) {
        var field = _a.field;
        return field + " ne null";
    }),
    isnull: nonValueExpression(function (_a) {
        var field = _a.field;
        return field + " eq null";
    }),
    lt: typedOperator(tslib_1.__assign({}, settings, { operator: "lt" })),
    lte: typedOperator(tslib_1.__assign({}, settings, { operator: "le" })),
    neq: typedOperator(tslib_1.__assign({}, settings, { operator: "ne" })),
    startswith: stringFnOperator(tslib_1.__assign({}, settings, { operator: "startswith" }))
}[operator]); };
var join = function (x) { return " " + x.logic + " "; };
var serialize = function (settings) { return function (x) { return filterOperators(x.operator, settings)(x); }; };
var serializeAll = function (settings) { return filter_serialization_common_1.serializeFilters(function (filter) { return funcs_1.ifElse(filter_descriptor_interface_1.isCompositeFilterDescriptor, serializeAll(settings), serialize(settings))(filter); }, join); };
/**
 * @hidden
 */
exports.serializeFilter = function (filter, settings) {
    if (settings === void 0) { settings = {}; }
    if (filter.filters && filter.filters.length) {
        return "$filter=" + serializeAll(settings)(filter);
    }
    return "";
};
