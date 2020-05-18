"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var odata_filtering_operators_1 = require("./odata-filtering.operators");
var funcs_1 = require("./funcs");
var serializeSort = function (orderby) {
    var str = orderby
        .filter(function (sort) { return utils_1.isPresent(sort.dir); })
        .map(function (sort) {
        var order = sort.field.replace(/\./g, "/");
        return sort.dir === "desc" ? order + " desc" : order;
    }).join(",");
    return str ? "$orderby=" + str : str;
};
var emptyString = funcs_1.constant('');
var concat = function (a) { return function (b) { return a + b; }; };
var serializeKey = function (strings, val) { return funcs_1.ifElse(utils_1.isPresent, concat(strings[0]), emptyString)(val); };
var rules = function (settings, state) { return function (key) { return ({
    "filter": odata_filtering_operators_1.serializeFilter(state.filter || {}, settings),
    "skip": serializeKey(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["$skip=", ""], ["$skip=", ""])), state.skip),
    "sort": serializeSort(state.sort || []),
    "take": serializeKey(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["$top=", ""], ["$top=", ""])), state.take)
}[key]); }; };
// tslint:enable:max-line-length
/**
 * Converts a [`State`]({% slug api_kendo-data-query_state %}) into an OData v4 compatible string.
 *
 * @param {State} state - The state that will be serialized.
 * @param {ODataSettings} settings - The settings that are used during the serialization.
 * @returns {string} - The serialized state.
 */
exports.toODataString = function (state, settings) {
    if (settings === void 0) { settings = {}; }
    return (Object.keys(state)
        .map(rules(settings, state))
        .filter(utils_1.isNotNullOrEmptyString)
        .join('&'));
};
var templateObject_1, templateObject_2;
