/**
 * @hidden
 */
export const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
export const isBlank = (value) => value === null || value === undefined;
/**
 * @hidden
 */
export const isArray = (value) => Array.isArray(value);
/**
 * @hidden
 */
export const isFunction = (value) => typeof value === 'function';
/**
 * @hidden
 */
export const isString = (value) => typeof value === 'string';
/**
 * @hidden
 */
export const isTruthy = (value) => !!value;
/**
 * @hidden
 */
export const isNullOrEmptyString = (value) => isBlank(value) || value.trim().length === 0;
/**
 * @hidden
 */
export const isNotNullOrEmptyString = (value) => !isNullOrEmptyString(value);
/**
 * @hidden
 */
export const isNumeric = (value) => !isNaN(value - parseFloat(value));
/**
 * @hidden
 */
export const isDate = (value) => value && value.getTime;
