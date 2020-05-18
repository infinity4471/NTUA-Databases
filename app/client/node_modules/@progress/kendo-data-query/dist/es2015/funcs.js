/**
 * @hidden
 */
export const ifElse = (predicate, right, left) => value => predicate(value) ? right(value) : left(value);
/**
 * @hidden
 * Performs the right-to-left function composition. Functions should have a unary.
 */
export const compose = (...args) => (data) => args.reduceRight((acc, curr) => curr(acc), data);
/**
 * @hidden
 */
export const constant = x => () => x;
/**
 * @hidden
 */
export const identity = x => x;
