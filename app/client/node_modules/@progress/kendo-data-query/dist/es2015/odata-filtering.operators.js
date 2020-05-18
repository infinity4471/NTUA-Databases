import { isCompositeFilterDescriptor } from './filtering/filter-descriptor.interface';
import { compose, ifElse } from './funcs';
import { normalizeField, quote, toLower, isDateValue, isStringValue, serializeFilters, encodeValue, toUTC } from './filter-serialization.common';
const formatDate = ({ utcDates }) => ({ field, value, ignoreCase, operator }) => ({
    value: JSON.stringify(!utcDates ? toUTC(value) : value).replace(/"/g, ""),
    field,
    ignoreCase,
    operator
});
const fnFormatter = ({ operator }) => ({ field, value }) => `${operator}(${field},${value})`;
const singleOperatorFormatter = ({ operator }) => ({ field, value }) => `${field} ${operator} ${value}`;
const stringFormat = formatter => compose(formatter, encodeValue, quote, toLower, normalizeField);
const stringFnOperator = settings => stringFormat(fnFormatter(settings));
const stringOperator = settings => stringFormat(singleOperatorFormatter(settings));
const numericOperator = settings => compose(singleOperatorFormatter(settings), normalizeField);
const dateOperator = settings => compose(singleOperatorFormatter(settings), normalizeField, formatDate(settings));
const ifDate = settings => ifElse(isDateValue, dateOperator(settings), numericOperator(settings));
const typedOperator = settings => ifElse(isStringValue, stringOperator(settings), ifDate(settings));
const appendEqual = str => `${str} eq -1`;
const nonValueExpression = formatter => compose(formatter, normalizeField);
const filterOperators = (operator, settings) => ({
    contains: stringFnOperator(Object.assign({}, settings, { operator: "contains" })),
    doesnotcontain: compose(appendEqual, stringFnOperator(Object.assign({}, settings, { operator: "indexof" }))),
    endswith: stringFnOperator(Object.assign({}, settings, { operator: "endswith" })),
    eq: typedOperator(Object.assign({}, settings, { operator: "eq" })),
    gt: typedOperator(Object.assign({}, settings, { operator: "gt" })),
    gte: typedOperator(Object.assign({}, settings, { operator: "ge" })),
    isempty: nonValueExpression(({ field }) => `${field} eq ''`),
    isnotempty: nonValueExpression(({ field }) => `${field} ne ''`),
    isnotnull: nonValueExpression(({ field }) => `${field} ne null`),
    isnull: nonValueExpression(({ field }) => `${field} eq null`),
    lt: typedOperator(Object.assign({}, settings, { operator: "lt" })),
    lte: typedOperator(Object.assign({}, settings, { operator: "le" })),
    neq: typedOperator(Object.assign({}, settings, { operator: "ne" })),
    startswith: stringFnOperator(Object.assign({}, settings, { operator: "startswith" }))
}[operator]);
const join = x => ` ${x.logic} `;
const serialize = settings => x => filterOperators(x.operator, settings)(x);
const serializeAll = settings => serializeFilters(filter => ifElse(isCompositeFilterDescriptor, serializeAll(settings), serialize(settings))(filter), join);
/**
 * @hidden
 */
export const serializeFilter = (filter, settings = {}) => {
    if (filter.filters && filter.filters.length) {
        return "$filter=" + serializeAll(settings)(filter);
    }
    return "";
};
