import { isPresent, isString } from './utils';
import { composeSortDescriptors } from './sorting/sort-array.operator';
import { groupBy, normalizeGroups } from './grouping/group.operators';
import { normalizeFilters } from './filtering/filter.operators';
import { compileFilter } from './filtering/filter-expression.factory';
import { exec, skip, take, filter, concat } from './transducers';
import { getter } from './accessor';
import { compose } from './funcs';
import { sort } from './sorting/sort';
/**
 * Orders the specified array according to the provided sort descriptors.
 *
 * @param {T[]} data - The data to be sorted.
 * @param {SortDescriptor[]} descriptors - The descriptors by which the data will be sorted.
 * @returns {T[]} - The sorted data.
 *
 * @example
 * ```ts-no-run
 * import { orderBy } from '@progress/kendo-data-query';
 *
 * const data = [
 *     { name: "Pork", category: "Food", subcategory: "Meat" },
 *     { name: "Pepper", category: "Food", subcategory: "Vegetables" },
 *     { name: "Beef", category: "Food", subcategory: "Meat" }
 * ];
 *
 * const result = orderBy(data, [{ field: "name", dir: "asc" }]);
 * ```
 */
export const orderBy = (data, descriptors) => {
    if (descriptors.some(x => isPresent(x.dir))) {
        data = data.slice(0);
        const comparer = composeSortDescriptors(descriptors);
        sort(data, 0, data.length, comparer);
    }
    return data;
};
const defaultComparer = (a, b) => a === b;
const normalizeComparer = (comparer) => {
    if (isString(comparer)) {
        const accessor = getter(comparer);
        comparer = (a, b) => accessor(a) === accessor(b);
    }
    return comparer;
};
const _distinct = (data, comparer) => data.filter((x, idx, xs) => xs.findIndex(comparer.bind(null, x)) === idx);
/**
 * Reduces the provided array so it contains only unique values.
 *
 * @param {T[]} data - The array that will be reduced.
 * @param {(Comparer | string)} comparer - An optional custom comparer function or the field name that will be used for comparison.
 * @returns {T[]} - The reduced data.
 *
 * @example
 * ```ts-no-run
 * import { distinct } from '@progress/kendo-data-query';
 *
 * const data = [
 *     { name: "Pork", category: "Food", subcategory: "Meat" },
 *     { name: "Pepper", category: "Food", subcategory: "Vegetables" },
 *     { name: "Beef", category: "Food", subcategory: "Meat" }
 * ];
 *
 * const result = distinct(data, "subcategory");
 *
 * // output:
 * // result => [
 * //     { name: "Pork", category: "Food", subcategory: "Meat" },
 * //     { name: "Pepper", category: "Food", subcategory: "Vegetables" }
 * // ];
 * ```
 */
export const distinct = (data, comparer = defaultComparer) => _distinct(data, normalizeComparer(comparer));
/**
 * @hidden
 */
export const count = (data, predicate) => {
    let counter = 0;
    for (let idx = 0, length = data.length; idx < length; idx++) {
        if (predicate(data[idx])) {
            counter++;
        }
    }
    return counter;
};
/**
 * @hidden
 */
export const limit = (data, predicate) => {
    if (predicate) {
        return data.filter(predicate);
    }
    return data;
};
/**
 * Applies the specified operation descriptors to the data.
 *
 * @param {T[]} data - The data to be processed.
 * @param {State} state - The operation descriptors that will be applied to the data.
 * @returns {DataResult} - The processed data.
 *
 * @example
 * ```ts-no-run
 *
 * const result = process(data, {
 *     skip: 10,
 *     take: 20,
 *     group: [{
 *       field: 'category.categoryName',
 *             aggregates: [
 *                   { aggregate: "sum", field: "unitPrice" },
 *                   { aggregate: "sum", field: "unitsInStock" }
 *             ]
 *       }],
 *     sort: [{ field: 'productName', dir: 'desc' }],
 *     filter: {
 *         logic: "or",
 *         filters: [
 *           { field: "discontinued", operator: "eq", value: true },
 *           { field: "unitPrice", operator: "lt", value: 22 }
 *         ]
 *     }
 * });
 *
 * ```
 */
export const process = (data, state) => {
    const { skip: skipCount, take: takeCount, filter: filterDescriptor, sort, group } = state;
    const sortDescriptors = [...normalizeGroups(group || []), ...sort || []];
    if (sortDescriptors.length) {
        data = orderBy(data, sortDescriptors);
    }
    const hasFilters = isPresent(filterDescriptor) && filter.length;
    const hasGroups = isPresent(group) && group.length;
    if (!hasFilters && !hasGroups) {
        return {
            data: takeCount ? data.slice(skipCount, skipCount + takeCount) : data,
            total: data.length
        };
    }
    let total;
    const transformers = [];
    let predicate;
    if (hasFilters) {
        predicate = compileFilter(normalizeFilters(filterDescriptor));
        total = count(data, predicate);
        transformers.push(filter(predicate));
    }
    else {
        total = data.length;
    }
    if (isPresent(skipCount) && isPresent(takeCount)) {
        transformers.push(skip(skipCount));
        transformers.push(take(takeCount));
    }
    if (transformers.length) {
        const transform = compose(...transformers);
        const result = hasGroups ?
            groupBy(data, group, transform, limit(data, predicate)) :
            exec(transform(concat), [], data);
        return { data: result, total: total };
    }
    return {
        data: hasGroups ? groupBy(data, group) : data,
        total: total
    };
};
