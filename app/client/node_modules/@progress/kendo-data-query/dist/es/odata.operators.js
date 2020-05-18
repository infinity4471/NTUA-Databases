import * as tslib_1 from "tslib";
import { isPresent, isNotNullOrEmptyString } from './utils';
import { serializeFilter } from './odata-filtering.operators';
import { ifElse, constant } from './funcs';
var serializeSort = function (orderby) {
    var str = orderby
        .filter(function (sort) { return isPresent(sort.dir); })
        .map(function (sort) {
        var order = sort.field.replace(/\./g, "/");
        return sort.dir === "desc" ? order + " desc" : order;
    }).join(",");
    return str ? "$orderby=" + str : str;
};
var emptyString = constant('');
var concat = function (a) { return function (b) { return a + b; }; };
var serializeKey = function (strings, val) { return ifElse(isPresent, concat(strings[0]), emptyString)(val); };
var rules = function (settings, state) { return function (key) { return ({
    "filter": serializeFilter(state.filter || {}, settings),
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
export var toODataString = function (state, settings) {
    if (settings === void 0) { settings = {}; }
    return (Object.keys(state)
        .map(rules(settings, state))
        .filter(isNotNullOrEmptyString)
        .join('&'));
};
var templateObject_1, templateObject_2;
