import { isCompositeFilterDescriptor } from '../filtering/filter-descriptor.interface';
import { isPresent, isNotNullOrEmptyString, isArray } from '../utils';
import { getter } from '../accessor';
import { compose, ifElse, identity } from '../funcs';
import { isStringValue, isDateValue, quote, serializeFilters, toUTC, encodeValue } from '../filter-serialization.common';
const toQueryString = values => values.reduce((acc, [key, value]) => [...acc, `${key}=${value}`], []);
const toObject = values => values.reduce((acc, [key, value]) => (Object.assign({}, acc, { [key]: value })), {});
const pairwise = key => value => [key, value];
const empty = () => null;
const isNotEmptyArray = value => isPresent(value) && isArray(value) && value.length > 0;
const has = accessor => value => isPresent(accessor(value));
const isNotEmpty = accessor => value => isNotEmptyArray(accessor(value));
const runOrEmpty = (predicate, fn) => ifElse(predicate, fn, empty);
const calcPage = ({ skip, take }) => Math.floor((skip || 0) / take) + 1;
const formatDescriptors = (accessor, formatter) => state => (accessor(state).map(formatter).join("~"));
const removeAfter = (what) => (str) => str.slice(0, str.indexOf(what));
const replace = (patterns) => compose(...patterns.map(([left, right]) => (s) => s.replace(new RegExp(left, "g"), right)));
const sanitizeDateLiterals = replace([["\"", ""], [":", "-"]]);
const removeAfterDot = removeAfter(".");
const directionFormatter = ({ field, dir = "asc" }) => `${field}-${dir}`;
const aggregateFormatter = ({ field, aggregate }) => `${field}-${aggregate}`;
const take = getter("take");
const aggregates = getter("aggregates");
const skip = getter("skip");
const group = getter("group");
const sort = getter("sort", true);
const formatSort = formatDescriptors(sort, directionFormatter);
const formatGroup = formatDescriptors(group, directionFormatter);
const formatAggregates = formatDescriptors(aggregates, aggregateFormatter);
const prefixDateValue = value => `datetime'${value}'`;
const formatDateValue = compose(prefixDateValue, removeAfterDot, sanitizeDateLiterals, JSON.stringify, toUTC);
const formatDate = ({ field, value, ignoreCase, operator }) => ({
    value: formatDateValue(value),
    field,
    ignoreCase,
    operator
});
const normalizeSort = (state) => Object.assign({}, state, {
    sort: (sort(state) || []).filter(({ dir }) => isNotNullOrEmptyString(dir))
});
const transformSkip = compose(pairwise('page'), calcPage);
const transformTake = compose(pairwise('pageSize'), take);
const transformGroup = compose(pairwise('group'), formatGroup);
const transformSort = compose(pairwise('sort'), formatSort);
const transformAggregates = compose(pairwise('aggregate'), formatAggregates);
const serializePage = runOrEmpty(has(skip), transformSkip);
const serializePageSize = runOrEmpty(has(take), transformTake);
const serializeGroup = runOrEmpty(isNotEmpty(group), transformGroup);
const serializeAggregates = runOrEmpty(has(aggregates), transformAggregates);
const serializeSort = compose(runOrEmpty(isNotEmpty(sort), transformSort), normalizeSort);
const hasField = ({ field }) => isNotNullOrEmptyString(field);
const filterFormatter = ({ field, operator, value }) => `${field}~${operator}~${value}`;
const dateFormatter = ifElse(isDateValue, compose(filterFormatter, formatDate), filterFormatter);
const typedFormatter = encode => runOrEmpty(hasField, ifElse(isStringValue, compose(filterFormatter, quote, encode ? encodeValue : identity), dateFormatter));
const join = ({ logic }) => `~${logic}~`;
const serialize = encode => serializeFilters(filter => ifElse(isCompositeFilterDescriptor, serialize(encode), typedFormatter(encode))(filter), join);
const serializeFilter = ({ filter }, encode) => {
    if (filter && filter.filters) {
        const filters = serialize(encode)(filter);
        if (filters.length) {
            return ['filter', filters];
        }
    }
    return null;
};
const rules = (state, encode = true) => key => ({
    "aggregates": serializeAggregates(state),
    "filter": serializeFilter(state, encode),
    "group": serializeGroup(state),
    "skip": serializePage(state),
    "sort": serializeSort(state),
    "take": serializePageSize(state)
}[key]);
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
export const toDataSourceRequestString = (state) => (toQueryString(Object.keys(state)
    .map(rules(state))
    .filter(isPresent)).join('&'));
/**
 * Converts a [`DataSourceRequestState`]({% slug api_kendo-data-query_datasourcerequeststate %}) into an object
 * that is compatible with the `DataSourceRequest` format in UI for ASP.NET MVC.
 *
 * @param {DataRequestState} state - The state that will be serialized.
 * @returns {any} - The serialized state.
 */
export const toDataSourceRequest = (state) => (toObject(Object.keys(state)
    .map(rules(state, false))
    .filter(isPresent)));
