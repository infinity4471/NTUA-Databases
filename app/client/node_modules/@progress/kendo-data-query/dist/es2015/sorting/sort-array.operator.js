import { isPresent, isBlank } from '../utils';
import { getter } from '../accessor';
const compare = (a, b) => {
    if (isBlank(a)) {
        return a === b ? 0 : -1;
    }
    if (isBlank(b)) {
        return 1;
    }
    if (a.localeCompare) {
        return a.localeCompare(b);
    }
    return a > b ? 1 : (a < b ? -1 : 0);
};
const compareDesc = (a, b) => compare(b, a);
const descriptorAsFunc = (descriptor) => {
    const prop = getter(descriptor.field, true);
    return (a, b) => (descriptor.dir === 'asc' ? compare : compareDesc)(prop(a), prop(b));
};
const initial = (_a, _b) => 0;
// tslint:disable:max-line-length
/**
 * Converts the `SortDescriptors` into a [`Comparer`]({% slug api_kendo-data-query_comparer %}) function that can be used through `Array.sort`. If multiple descriptors are provided, sorting is applied in a right-to-left order.
 * @param {SortDescriptor[]} descriptors - The descriptors which will be converted.
 * @returns {Comparer} - The produced function.
 *
 * @example
 * ```ts-no-run
 * import { composeSortDescriptors } from '@progress/kendo-data-query';
 *
 * const data = [{ name: "Pork" }, { name: "Pepper" }, { name: "Beef" } ];
 * const comparer = composeSortDescriptors([{ field: "name", dir: "asc" }]);
 * const result = data.sort(comparer);
 * // output: [{ name: "Beef" }, { name: "Pepper" }, { name: "Pork" }];
 * ```
 */
// tslint:enable:max-line-length
export const composeSortDescriptors = (descriptors) => (descriptors
    .filter(x => isPresent(x.dir))
    .map((descriptor) => descriptorAsFunc(descriptor))
    .reduce((acc, curr) => (a, b) => acc(a, b) || curr(a, b), initial));
