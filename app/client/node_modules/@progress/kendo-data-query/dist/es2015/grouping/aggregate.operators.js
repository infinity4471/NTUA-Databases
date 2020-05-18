import { exec, map, aggregatesCombinator, expandAggregates } from '../transducers';
const identity = map(x => x);
// tslint:disable:max-line-length
/**
 * Applies the specified [`AggregateDescriptors`]({% slug api_kendo-data-query_aggregatedescriptor %}) to the data. Returns an [`AggregateResult`]({% slug api_kendo-data-query_aggregateresult %}) instance.
 *
 * @example
 * ```ts-no-run
 * const data = [
 *    { unitPrice: 23, unitsInStock: 21 },
 *    { unitPrice: 10, unitsInStock: 12 },
 *    { unitPrice: 20, unitsInStock: 33 }
 * ];
 *
 * const result = aggregateBy(data, [
 *   { aggregate: "sum", field: "unitPrice" },
 *   { aggregate: "sum", field: "unitsInStock" }
 * ]);
 *
 * //output:
 * // {
 * //     "unitPrice": { "sum": 53 },
 * //     "unitsInStock": { "sum": 66 }
 * // }
 * ```
 * @param {T[]} data - The data on which the calculation will be executed.
 * @param {AggregateDescriptor[]} descriptors - The aggregate operations that will be executed.
 * @param {any} transformers - For internal use.
 * @returns {AggregateResult} - The aggregated result.
 * For more information, refer to the [`aggregateresult`]({% slug api_kendo-data-query_aggregateresult %}) configuration.
 */
// tslint:enable:max-line-length
export const aggregateBy = (data, descriptors = [], transformers = identity) => {
    const initialValue = {};
    if (!descriptors.length) {
        return initialValue;
    }
    const result = exec(transformers(aggregatesCombinator(descriptors)), initialValue, data);
    return expandAggregates(result);
};
