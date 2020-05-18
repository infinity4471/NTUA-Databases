import { isPresent } from '../utils';
// tslint:enable:max-line-length
/**
 * @hidden
 * Type guard for `CompositeFilterDescriptor`.
 */
export const isCompositeFilterDescriptor = (source) => {
    return isPresent(source.filters);
};
