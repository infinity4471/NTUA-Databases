import { isPresent, isNumeric, isDate } from './utils';
import { getter } from './accessor';
const valueToString = (value) => {
    value = isPresent(value) && value.getTime ? value.getTime() : value;
    return value + "";
};
/**
 * @hidden
 */
export const groupCombinator = (field) => {
    const prop = getter(field, true);
    let position = 0;
    return (agg, value) => {
        agg[field] = agg[field] || {};
        const groupValue = prop(value);
        const key = valueToString(groupValue);
        const values = agg[field][key] || { __position: position++, aggregates: {}, items: [], value: groupValue };
        values.items.push(value);
        agg[field][key] = values;
        return agg;
    };
};
/**
 * @hidden
 */
export const expandAggregates = (result = {}) => {
    Object.keys(result).forEach(field => {
        const aggregates = result[field];
        Object.keys(aggregates).forEach(aggregate => {
            aggregates[aggregate] = aggregates[aggregate].result();
        });
    });
    return result;
};
const aggregatesFuncs = (name) => ({
    average: () => {
        let value = 0;
        let count = 0;
        return {
            calc: (curr) => {
                if (isNumeric(curr)) {
                    value += curr;
                    count++;
                }
                else {
                    value = curr;
                }
            },
            result: () => isNumeric(value) ? value / count : value
        };
    },
    count: () => {
        let state = 0;
        return {
            calc: () => state++,
            result: () => state
        };
    },
    max: () => {
        let state = Number.NEGATIVE_INFINITY;
        return {
            calc: (value) => {
                state = isNumeric(state) || isDate(state) ? state : value;
                if (state < value && (isNumeric(value) || isDate(value))) {
                    state = value;
                }
            },
            result: () => state
        };
    },
    min: () => {
        let state = Number.POSITIVE_INFINITY;
        return {
            calc: (value) => {
                state = isNumeric(state) || isDate(state) ? state : value;
                if (state > value && (isNumeric(value) || isDate(value))) {
                    state = value;
                }
            },
            result: () => state
        };
    },
    sum: () => {
        let state = 0;
        return {
            calc: (value) => state += value,
            result: () => state
        };
    }
}[name]());
/**
 * @hidden
 */
export const aggregatesCombinator = (descriptors) => {
    const functions = descriptors.map(descriptor => {
        const fieldAccessor = getter(descriptor.field, true);
        const aggregateName = (descriptor.aggregate || "").toLowerCase();
        const aggregateAccessor = getter(aggregateName, true);
        return (state, value) => {
            const fieldAggregates = state[descriptor.field] || {};
            const aggregateFunction = aggregateAccessor(fieldAggregates)
                || aggregatesFuncs(aggregateName);
            aggregateFunction.calc(fieldAccessor(value));
            fieldAggregates[descriptor.aggregate] = aggregateFunction;
            state[descriptor.field] = fieldAggregates;
            return state;
        };
    });
    return (state, value) => functions.reduce((agg, calc) => calc(agg, value), state);
};
/**
 * @hidden
 * Adds the value to the `arr` and produces a new array.
 *
 * > The original array will be modified.
 */
export const concat = (arr, value) => {
    arr.push(value);
    return arr;
};
/**
 * @hidden
 * Returns a reducer that will apply the specified transformation to the value.
 */
export const map = (transform) => ((reduce) => ((acc, curr, index) => reduce(acc, transform(curr, index))));
/**
 * @hidden
 * Returns a reducer that will filter out items which do not match the `Predicate`.
 */
export const filter = (predicate) => ((reduce) => ((acc, curr) => predicate(curr) ? reduce(acc, curr) : acc));
/**
 * @hidden
 */
export const isTransformerResult = (source) => {
    return isPresent(source.__value);
};
const reduced = (x) => {
    if (isTransformerResult(x)) {
        return x;
    }
    return {
        __value: x,
        reduced: true
    };
};
/**
 * @hidden
 * Returns a reducer that will take the specified number of items.
 */
export const take = (count) => ((reduce) => ((acc, curr) => count-- > 0 ? reduce(acc, curr) : reduced(acc)));
/**
 * @hidden
 * Returns a reducer that will take the specified number of items.
 */
export const takeWhile = (predicate) => ((reduce) => ((acc, curr) => predicate(curr) ? reduce(acc, curr) : reduced(acc)));
/**
 * @hidden
 * Returns a reducer that will skip the specified number of items.
 */
export const skip = (count) => ((reduce) => ((acc, curr) => count-- <= 0 ? reduce(acc, curr) : acc));
/**
 * @hidden
 * Transforms the data by applying the supplied transformer.
 */
export const exec = (transform, initialValue, data) => {
    let result = initialValue;
    for (let idx = 0, length = data.length; idx < length; idx++) {
        result = transform(result, data[idx], idx);
        if (isTransformerResult(result)) {
            result = result.__value;
            break;
        }
    }
    return result;
};
