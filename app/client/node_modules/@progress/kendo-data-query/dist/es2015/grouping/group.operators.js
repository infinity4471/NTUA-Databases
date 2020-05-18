import { exec, map, groupCombinator } from '../transducers';
import { isArray, isPresent } from '../utils';
import { aggregateBy } from './aggregate.operators';
import { filterBy } from '../filtering/filter-expression.factory';
/**
 * @hidden
 */
export const normalizeGroups = (descriptors) => {
    descriptors = isArray(descriptors) ? descriptors : [descriptors];
    return descriptors.map(x => Object.assign({ dir: "asc" }, x));
};
const identity = map(x => x);
/**
 * Groups the provided data according to the specified descriptors.
 *
 * @param {Array} data - The data that will be grouped.
 * @param {GroupDescriptor[]} descriptors - The descriptors.
 * @param {any} transformers - For internal use.
 * @param {Array} originalData - For internal use.
 * @returns {(Array<GroupResult<T>> | T[])} - The grouped data.
 *
 * @example
 * ```ts-no-run
 *
 * import { groupBy } from '@progress/kendo-data-query';
 *
 * const data = [
 *     { name: "Pork", category: "Food", subcategory: "Meat" },
 *     { name: "Pepper", category: "Food", subcategory: "Vegetables" },
 *     { name: "Beef", category: "Food", subcategory: "Meat" }
 * ];
 *
 * const result = groupBy(data, [{ field: "subcategory" }]);
 * ```
 */
export const groupBy = (data, descriptors = [], transformers = identity, originalData = data) => {
    descriptors = normalizeGroups(descriptors);
    if (!descriptors.length) {
        return data;
    }
    const descriptor = descriptors[0];
    const initialValue = {};
    const view = exec(transformers(groupCombinator(descriptor.field)), initialValue, data);
    const result = [];
    Object.keys(view).forEach(field => {
        Object.keys(view[field]).forEach(value => {
            const group = view[field][value];
            let aggregateResult = {};
            let filteredData = originalData;
            if (isPresent(descriptor.aggregates)) {
                filteredData = filterBy(originalData, {
                    field: descriptor.field,
                    ignoreCase: false,
                    operator: 'eq',
                    value: group.value
                });
                aggregateResult = aggregateBy(filteredData, descriptor.aggregates);
            }
            result[group.__position] = {
                aggregates: aggregateResult,
                field: field,
                items: descriptors.length > 1 ?
                    groupBy(group.items, descriptors.slice(1), identity, filteredData)
                    : group.items,
                value: group.value
            };
        });
    });
    return result;
};
