import { State } from '../state';
import { AggregateDescriptor } from '../grouping/aggregate.operators';
/**
 * Represents the operation descriptors that will be sent
 * ([see example]({% slug api_kendo-data-query_todatasourcerequeststring %})).
 *
 * Extends [`State`]({% slug api_kendo-data-query_state %}) by adding the `aggregates` descriptors&mdash;
 * an array of [`AggregateDescriptor`]({% slug api_kendo-data-query_aggregatedescriptor %}).
 */
export declare type DataSourceRequestState = State & {
    /**
     * The descriptors used for aggregation.
     * @type {Array<AggregateDescriptor>}
     */
    aggregates?: Array<AggregateDescriptor>;
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
export declare const toDataSourceRequestString: (state: DataSourceRequestState) => string;
/**
 * Converts a [`DataSourceRequestState`]({% slug api_kendo-data-query_datasourcerequeststate %}) into an object
 * that is compatible with the `DataSourceRequest` format in UI for ASP.NET MVC.
 *
 * @param {DataRequestState} state - The state that will be serialized.
 * @returns {any} - The serialized state.
 */
export declare const toDataSourceRequest: (state: DataSourceRequestState) => any;
