"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var funcs_1 = require("../funcs");
// tslint:enable:max-line-length
var set = function (field, target, value) {
    target[field] = value;
    return target;
};
var toCamelCase = function (str) { return str.replace(/(^[A-Z])/g, function (_, g1) { return g1.toLowerCase(); }); };
var prop = function (fieldName) { return function (obj) {
    var value = obj[fieldName];
    if (utils_1.isPresent(value)) {
        return value;
    }
    return obj[toCamelCase(fieldName)];
}; };
var member = prop("Member");
var aggregateMethodName = prop("AggregateMethodName");
var value = prop("Value");
var convert = function (mapper) { return function (values) { return Object.keys(values).reduce(mapper.bind(null, values), {}); }; };
var translateAggregate = convert(function (source, acc, field) { return set(field.toLowerCase(), acc, source[field]); });
var translateAggregates = convert(function (source, acc, field) { return set(field, acc, translateAggregate(source[field])); });
var valueOrDefault = function (value, defaultValue) { return utils_1.isPresent(value) ? value : defaultValue; };
var normalizeGroup = function (group) { return ({
    aggregates: group.Aggregates || group.aggregates,
    field: group.Member || group.member || group.field,
    hasSubgroups: group.HasSubgroups || group.hasSubgroups || false,
    items: group.Items || group.items,
    value: valueOrDefault(group.Key, valueOrDefault(group.key, group.value))
}); };
var translateGroup = funcs_1.compose(function (_a) {
    var field = _a.field, hasSubgroups = _a.hasSubgroups, value = _a.value, aggregates = _a.aggregates, items = _a.items;
    return ({
        aggregates: translateAggregates(aggregates),
        field: field,
        items: hasSubgroups ? items.map(translateGroup) : items,
        value: value
    });
}, normalizeGroup);
// tslint:disable:max-line-length
/**
 * Converts the grouped result, which is returned into the `Data` field of the UI for ASP.NET MVC `ToDataSourceResult` method, to a comparable format.
 * @param data - The value of the `Data` field of the response.
 * @returns {GroupResult[]} - The converted result.
 */
exports.translateDataSourceResultGroups = function (data) { return data.map(translateGroup); };
/**
 * Converts the `AggregateResults` field content, which is returned by the UI for ASP.NET MVC `ToDataSourceResult` method, to a comparable format.
 * @param data - The value of the `AggregateResults` field of the response.
 * @returns {AggregateResult} - The converted result.
 */
// tslint:enable:max-line-length
exports.translateAggregateResults = function (data) { return ((data || []).reduce(function (acc, x) { return set(member(x), acc, set(aggregateMethodName(x).toLowerCase(), acc[member(x)] || {}, value(x))); }, {})); };
