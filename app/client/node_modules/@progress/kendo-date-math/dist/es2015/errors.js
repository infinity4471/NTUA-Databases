/** @hidden */
export const NO_TZ_INFO = 'The required {0} timezone information is not provided!';
/** @hidden */
export const INVALID_TZ_STRUCTURE = 'The provided timezone information has invalid stucture!';
const formatRegExp = /\{(\d+)}?\}/g;
const flatten = (arr) => arr.reduce((a, b) => a.concat(b), []);
/** @hidden */
export const formatMessage = (message, ...values) => {
    const flattenValues = flatten(values);
    return message.replace(formatRegExp, (_, index) => flattenValues[parseInt(index, 10)]);
};
