import * as tslib_1 from "tslib";
import { isCompositeFilterDescriptor } from '../filtering/filter-descriptor.interface';
import { isPresent, isNotNullOrEmptyString, isArray } from '../utils';
import { getter } from '../accessor';
import { compose, ifElse, identity } from '../funcs';
import { isStringValue, isDateValue, quote, serializeFilters, toUTC, encodeValue } from '../filter-serialization.common';
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
var isNotEmptyArray = function (value) { return isPresent(value) && isArray(value) && value.length > 0; };
var has = function (accessor) { return function (value) { return isPresent(accessor(value)); }; };
var isNotEmpty = function (accessor) { return function (value) { return isNotEmptyArray(accessor(value)); }; };
var runOrEmpty = function (predicate, fn) { return ifElse(predicate, fn, empty); };
var calcPage = function (_a) {
    var skip = _a.skip, take = _a.take;
    return Math.floor((skip || 0) / take) + 1;
};
var formatDescriptors = function (accessor, formatter) { return function (state) { return (accessor(state).map(formatter).join("~")); }; };
var removeAfter = function (what) { return function (str) { return str.slice(0, str.indexOf(what)); }; };
var replace = function (patterns) {
    return compose.apply(void 0, patterns.map(function (_a) {
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
var take = getter("take");
var aggregates = getter("aggregates");
var skip = getter("skip");
var group = getter("group");
var sort = getter("sort", true);
var formatSort = formatDescriptors(sort, directionFormatter);
var formatGroup = formatDescriptors(group, directionFormatter);
var formatAggregates = formatDescriptors(aggregates, aggregateFormatter);
var prefixDateValue = function (value) { return "datetime'" + value + "'"; };
var formatDateValue = compose(prefixDateValue, removeAfterDot, sanitizeDateLiterals, JSON.stringify, toUTC);
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
        return isNotNullOrEmptyString(dir);
    })
}); };
var transformSkip = compose(pairwise('page'), calcPage);
var transformTake = compose(pairwise('pageSize'), take);
var transformGroup = compose(pairwise('group'), formatGroup);
var transformSort = compose(pairwise('sort'), formatSort);
var transformAggregates = compose(pairwise('aggregate'), formatAggregates);
var serializePage = runOrEmpty(has(skip), transformSkip);
var serializePageSize = runOrEmpty(has(take), transformTake);
var serializeGroup = runOrEmpty(isNotEmpty(group), transformGroup);
var serializeAggregates = runOrEmpty(has(aggregates), transformAggregates);
var serializeSort = compose(runOrEmpty(isNotEmpty(sort), transformSort), normalizeSort);
var hasField = function (_a) {
    var field = _a.field;
    return isNotNullOrEmptyString(field);
};
var filterFormatter = function (_a) {
    var field = _a.field, operator = _a.operator, value = _a.value;
    return field + "~" + operator + "~" + value;
};
var dateFormatter = ifElse(isDateValue, compose(filterFormatter, formatDate), filterFormatter);
var typedFormatter = function (encode) { return runOrEmpty(hasField, ifElse(isStringValue, compose(filterFormatter, quote, encode ? encodeValue : identity), dateFormatter)); };
var join = function (_a) {
    var logic = _a.logic;
    return "~" + logic + "~";
};
var serialize = function (encode) { return serializeFilters(function (filter) { return ifElse(isCompositeFilterDescriptor, serialize(encode), typedFormatter(encode))(filter); }, join); };
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
export var toDataSourceRequestString = function (state) { return (toQueryString(Object.keys(state)
    .map(rules(state))
    .filter(isPresent)).join('&')); };
/**
 * Converts a [`DataSourceRequestState`]({% slug api_kendo-data-query_datasourcerequeststate %}) into an object
 * that is compatible with the `DataSourceRequest` format in UI for ASP.NET MVC.
 *
 * @param {DataRequestState} state - The state that will be serialized.
 * @returns {any} - The serialized state.
 */
export var toDataSourceRequest = function (state) { return (toObject(Object.keys(state)
    .map(rules(state, false))
    .filter(isPresent))); };
