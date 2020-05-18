import { isPresent } from '../utils';
// tslint:enable:max-line-length
/**
 * @hidden
 * Type guard for `CompositeFilterDescriptor`.
 */
export var isCompositeFilterDescriptor = function (source) {
    return isPresent(source.filters);
};
