import { isPresent } from '../utils';
import { compose } from '../funcs';
// tslint:enable:max-line-length
const set = (field, target, value) => {
    target[field] = value;
    return target;
};
const toCamelCase = str => str.replace(/(^[A-Z])/g, (_, g1) => g1.toLowerCase());
const prop = (fieldName) => (obj) => {
    const value = obj[fieldName];
    if (isPresent(value)) {
        return value;
    }
    return obj[toCamelCase(fieldName)];
};
const member = prop("Member");
const aggregateMethodName = prop("AggregateMethodName");
const value = prop("Value");
const convert = mapper => values => Object.keys(values).reduce(mapper.bind(null, values), {});
const translateAggregate = convert((source, acc, field) => set(field.toLowerCase(), acc, source[field]));
const translateAggregates = convert((source, acc, field) => set(field, acc, translateAggregate(source[field])));
const valueOrDefault = (value, defaultValue) => isPresent(value) ? value : defaultValue;
const normalizeGroup = group => ({
    aggregates: group.Aggregates || group.aggregates,
    field: group.Member || group.member || group.field,
    hasSubgroups: group.HasSubgroups || group.hasSubgroups || false,
    items: group.Items || group.items,
    value: valueOrDefault(group.Key, valueOrDefault(group.key, group.value))
});
const translateGroup = compose(({ field, hasSubgroups, value, aggregates, items }) => ({
    aggregates: translateAggregates(aggregates),
    field,
    items: hasSubgroups ? items.map(translateGroup) : items,
    value
}), normalizeGroup);
// tslint:disable:max-line-length
/**
 * Converts the grouped result, which is returned into the `Data` field of the UI for ASP.NET MVC `ToDataSourceResult` method, to a comparable format.
 * @param data - The value of the `Data` field of the response.
 * @returns {GroupResult[]} - The converted result.
 */
export const translateDataSourceResultGroups = (data) => data.map(translateGroup);
/**
 * Converts the `AggregateResults` field content, which is returned by the UI for ASP.NET MVC `ToDataSourceResult` method, to a comparable format.
 * @param data - The value of the `AggregateResults` field of the response.
 * @returns {AggregateResult} - The converted result.
 */
// tslint:enable:max-line-length
export const translateAggregateResults = (data) => ((data || []).reduce((acc, x) => set(member(x), acc, set(aggregateMethodName(x).toLowerCase(), acc[member(x)] || {}, value(x))), {}));
