import { isString, isDate } from './utils';
/**
 * @hidden
 * Creates a single arity function which wraps the value based on the provided predicate.
 * @example
 * ```
 * wrapIf(() => ignoreCase) `tolower(${field})`
 * //ignoreCase=true -> tolower(${field})`
 * //ignoreCase=false -> ${field}`
 * ```
 */
export const wrapIf = predicate => (str, ...args) => predicate() ? `${str[0]}${args[0]}${str[1]}` : args[0];
/**
 * @hidden
 */
export const toUTC = (date) => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
/**
 * @hidden
 */
export const quote = ({ field, value, ignoreCase, operator }) => ({
    value: `'${value.replace(/'/g, "''")}'`,
    field,
    ignoreCase,
    operator
});
/**
 * @hidden
 */
export const encodeValue = ({ field, value, ignoreCase, operator }) => ({
    value: `${encodeURIComponent(value)}`,
    field,
    ignoreCase,
    operator
});
/**
 * @hidden
 */
export const toLower = ({ field, value, ignoreCase, operator }) => ({
    field: wrapIf(() => ignoreCase) `tolower(${field})`,
    value,
    ignoreCase,
    operator
});
/**
 * @hidden
 */
export const normalizeField = ({ field, value, ignoreCase, operator }) => ({
    value,
    field: field.replace(/\./g, "/"),
    ignoreCase,
    operator
});
/**
 * @hidden
 */
export const isStringValue = x => isString(x.value);
/**
 * @hidden
 */
export const isDateValue = x => isDate(x.value);
/**
 * @hidden
 */
export const serializeFilters = (map, join) => (filter) => {
    const brackets = wrapIf(() => filter.filters.length > 1);
    return brackets `(${filter.filters
        .map(map)
        .join(join(filter))})`;
};
