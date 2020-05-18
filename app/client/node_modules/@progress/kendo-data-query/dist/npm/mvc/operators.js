"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var filter_descriptor_interface_1 = require("../filtering/filter-descriptor.interface");
var utils_1 = require("../utils");
var accessor_1 = require("../accessor");
var funcs_1 = require("../funcs");
var filter_serialization_common_1 = require("../filter-serialization.common");
var toQueryString = function (values) { return values.reduce(function (acc, _a) {
    var key = _a[0], value = _a[1];
    return acc.concat([key + "=" + value]);
}, []); };
var toObject = function (values) { return values.reduce(function (acc, _a) {
    var key = _a[0], value = _a[1];
    var _b;
    return (tslib_1.__assign({}, acc, (_b = {}, _b[key] = value, _b)));
}, {}); };
var pairwise = function (key) { return function (value) { return [key, value]; }; };
var empty = function () { return null; };
var isNotEmptyArray = function (value) { return utils_1.isPresent(value) && utils_1.isArray(value) && value.length > 0; };
var has = function (accessor) { return function (value) { return utils_1.isPresent(accessor(value)); }; };
var isNotEmpty = function (accessor) { return function (value) { return isNotEmptyArray(accessor(value)); }; };
var runOrEmpty = function (predicate, fn) { return funcs_1.ifElse(predicate, fn, empty); };
var calcPage = function (_a) {
    var skip = _a.skip, take = _a.take;
    return Math.floor((skip || 0) / take) + 1;
};
var formatDescriptors = function (accessor, formatter) { return function (state) { return (accessor(state).map(formatter).join("~")); }; };
var removeAfter = function (what) { return function (str) { return str.slice(0, str.indexOf(what)); }; };
var replace = function (patterns) {
    return funcs_1.compose.apply(void 0, patterns.map(function (_a) {
        var left = _a[0], right = _a[1];
        return function (s) { return s.replace(new RegExp(left, "g"), right); };
    }));
};
var sanitizeDateLiterals = replace([["\"", ""], [":", "-"]]);
var removeAfterDot = removeAfter(".");
var directionFormatter = function (_a) {
    var field = _a.field, _b = _a.dir, dir = _b === void 0 ? "asc" : _b;
    return field + "-" + dir;
};
var aggregateFormatter = function (_a) {
    var field = _a.field, aggregate = _a.aggregate;
    return field + "-" + aggregate;
};
var take = accessor_1.getter("take");
var aggregates = accessor_1.getter("aggregates");
var skip = accessor_1.getter("skip");
var group = accessor_1.getter("group");
var sort = accessor_1.getter("sort", true);
var formatSort = formatDescriptors(sort, directionFormatter);
var formatGroup = formatDescriptors(group, directionFormatter);
var formatAggregates = formatDescriptors(aggregates, aggregateFormatter);
var prefixDateValue = function (value) { return "datetime'" + value + "'"; };
var formatDateValue = funcs_1.compose(prefixDateValue, removeAfterDot, sanitizeDateLiterals, JSON.stringify, filter_serialization_common_1.toUTC);
var formatDate = function (_a) {
    var field = _a.field, value = _a.value, ignoreCase = _a.ignoreCase, operator = _a.operator;
    return ({
        value: formatDateValue(value),
        field: field,
        ignoreCase: ignoreCase,
        operator: operator
    });
};
var normalizeSort = function (state) { return Object.assign({}, state, {
    sort: (sort(state) || []).filter(function (_a) {
        var dir = _a.dir;
        return utils_1.isNotNullOrEmptyString(dir);
    })
}); };
var transformSkip = funcs_1.compose(pairwise('page'), calcPage);
var transformTake = funcs_1.compose(pairwise('pageSize'), take);
var transformGroup = funcs_1.compose(pairwise('group'), formatGroup);
var transformSort = funcs_1.compose(pairwise('sort'), formatSort);
var transformAggregates = funcs_1.compose(pairwise('aggregate'), formatAggregates);
var serializePage = runOrEmpty(has(skip), transformSkip);
var serializePageSize = runOrEmpty(has(take), transformTake);
var serializeGroup = runOrEmpty(isNotEmpty(group), transformGroup);
var serializeAggregates = runOrEmpty(has(aggregates), transformAggregates);
var serializeSort = funcs_1.compose(runOrEmpty(isNotEmpty(sort), transformSort), normalizeSort);
var hasField = function (_a) {
    var field = _a.field;
    return utils_1.isNotNullOrEmptyString(field);
};
var filterFormatter = function (_a) {
    var field = _a.field, operator = _a.operator, value = _a.value;
    return field + "~" + operator + "~" + value;
};
var dateFormatter = funcs_1.ifElse(filter_serialization_common_1.isDateValue, funcs_1.compose(filterFormatter, formatDate), filterFormatter);
var typedFormatter = function (encode) { return runOrEmpty(hasField, funcs_1.ifElse(filter_serialization_common_1.isStringValue, funcs_1.compose(filterFormatter, filter_serialization_common_1.quote, encode ? filter_serialization_common_1.encodeValue : funcs_1.identity), dateFormatter)); };
var join = function (_a) {
    var logic = _a.logic;
    return "~" + logic + "~";
};
var serialize = function (encode) { return filter_serialization_common_1.serializeFilters(function (filter) { return funcs_1.ifElse(filter_descriptor_interface_1.isCompositeFilterDescriptor, serialize(encode), typedFormatter(encode))(filter); }, join); };
var serializeFilter = function (_a, encode) {
    var filter = _a.filter;
    if (filter && filter.filters) {
        var filters = serialize(encode)(filter);
        if (filters.length) {
            return ['filter', filters];
        }
    }
    return null;
};
var rules = function (state, encode) {
    if (encode === void 0) { encode = true; }
    return function (key) { return ({
        "aggregates": serializeAggregates(state),
        "filter": serializeFilter(state, encode),
        "group": serializeGroup(state),
        "skip": serializePage(state),
        "sort": serializeSort(state),
        "take": serializePageSize(state)
    }[key]); };
};
/**
 * Converts a [`DataSourceRequestState`]({% slug api_kendo-data-query_datasourcerequeststate %}) into a string
 * that is comparable with the `DataSourceRequest` format in UI for ASP.NET MVC.
 *
 * @param {DataRequestState} state - The state that will be serialized.
 * @returns {string} - The serialized state.
 *
 * @example
 * {% platform_content angular %}
 * ```ts-no-run
 *  import {
 *      toDataSourceRequestString,
 *      translateDataSourceResultGroups,
 *      translateAggregateResults
 * } from '@progress/kendo-data-query';
 *
 * export class Service {
 *  private BASE_URL: string = '...';
 *
 *  constructor(private http: Http) { }
 *
 *  // Omitted for brevity...
 *
 *  private fetch(state: DataSourceRequestState): Observable<DataResult> {
 *   const queryStr = `${toDataSourceRequestString(state)}`; //serialize the state
 *   const hasGroups = state.group && state.group.length;
 *
 *   return this.http
 *       .get(`${this.BASE_URL}?${queryStr}`) //send the state to the server
 *       .map(response => response.json())
 *       .map(({Data, Total, AggregateResults}) => // process the response
 *           (<GridDataResult>{
 *               //if there are groups convert them to compatible format
 *               data: hasGroups ? translateDataSourceResultGroups(Data) : Data,
 *               total: Total,
 *               // convert the aggregates if such exists
 *               aggregateResult: translateAggregateResults(AggregateResults)
 *           })
 *       );
 *  }
 * }
 * ```
 * {% endplatform_content %}
 *
 * {% platform_content react %}
 * ```jsx-no-run
 * import React from 'react';
 * import { toDataSourceRequestString, translateDataSourceResultGroups } from '@progress/kendo-data-query';
 *
 * export function withState(WrappedGrid) {
 *     return class StatefullGrid extends React.Component {
 *         constructor(props) {
 *             super(props);
 *             this.state = { dataState: { skip: 0, take: 20 } };
 *         }
 *
 *         render() {
 *             return (
 *                 <WrappedGrid
 *                     filterable={true}
 *                     sortable={true}
 *                     pageable={{ pageSizes: true }}
 *                     {...this.props}
 *                     total={this.state.total}
 *                     data={this.state.data}
 *                     skip={this.state.dataState.skip}
 *                     pageSize={this.state.dataState.take}
 *                     filter={this.state.dataState.filter}
 *                     sort={this.state.dataState.sort}
 *                     dataStateChange={this.dataStateChange}
 *                 />
 *             );
 *         }
 *
 *         componentDidMount() {
 *             this.fetchData(this.state.dataState);
 *         }
 *
 *         dataStateChange = (changeEvent) => {
 *             this.setState({ dataState: changeEvent.data });
 *             this.fetchData(changeEvent.data);
 *         }
 *
 *         fetchData(dataState) {
 *             const queryStr = `${toDataSourceRequestString(dataState)}`; // Serialize the state
 *             const hasGroups = dataState.group && dataState.group.length;
 *
 *             const base_url = 'api/Products';
 *             const init = { method: 'GET', accept: 'application/json', headers: {} };
 *
 *             fetch(`${base_url}?${queryStr}`, init)
 *                 .then(response => response.json())
 *                 .then(({ data, total }) => {
 *                     this.setState({
 *                         data: hasGroups ? translateDataSourceResultGroups(data) : data,
 *                         total,
 *                         dataState
 *                     });
 *                 });
 *         }
 *     }
 * }
 * ```
 * {% endplatform_content %}
 */
exports.toDataSourceRequestString = function (state) { return (toQueryString(Object.keys(state)
    .map(rules(state))
    .filter(utils_1.isPresent)).join('&')); };
/**
 * Converts a [`DataSourceRequestState`]({% slug api_kendo-data-query_datasourcerequeststate %}) into an object
 * that is compatible with the `DataSourceRequest` format in UI for ASP.NET MVC.
 *
 * @param {DataRequestState} state - The state that will be serialized.
 * @returns {any} - The serialized state.
 */
exports.toDataSourceRequest = function (state) { return (toObject(Object.keys(state)
    .map(rules(state, false))
    .filter(utils_1.isPresent))); };
