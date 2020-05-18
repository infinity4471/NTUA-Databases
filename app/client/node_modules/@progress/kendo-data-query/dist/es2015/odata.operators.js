import { isPresent, isNotNullOrEmptyString } from './utils';
import { serializeFilter } from './odata-filtering.operators';
import { ifElse, constant } from './funcs';
const serializeSort = (orderby) => {
    const str = orderby
        .filter(sort => isPresent(sort.dir))
        .map(sort => {
        const order = sort.field.replace(/\./g, "/");
        return sort.dir === "desc" ? order + " desc" : order;
    }).join(",");
    return str ? `$orderby=${str}` : str;
};
const emptyString = constant('');
const concat = a => b => a + b;
const serializeKey = (strings, val) => ifElse(isPresent, concat(strings[0]), emptyString)(val);
const rules = (settings, state) => (key) => ({
    "filter": serializeFilter(state.filter || {}, settings),
    "skip": serializeKey `$skip=${state.skip}`,
    "sort": serializeSort(state.sort || []),
    "take": serializeKey `$top=${state.take}`
}[key]);
// tslint:enable:max-line-length
/**
 * Converts a [`State`]({% slug api_kendo-data-query_state %}) into an OData v4 compatible string.
 *
 * @param {State} state - The state that will be serialized.
 * @param {ODataSettings} settings - The settings that are used during the serialization.
 * @returns {string} - The serialized state.
 */
export const toODataString = (state, settings = {}) => (Object.keys(state)
    .map(rules(settings, state))
    .filter(isNotNullOrEmptyString)
    .join('&'));
