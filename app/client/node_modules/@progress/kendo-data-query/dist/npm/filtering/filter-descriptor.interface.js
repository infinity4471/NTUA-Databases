"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
// tslint:enable:max-line-length
/**
 * @hidden
 * Type guard for `CompositeFilterDescriptor`.
 */
exports.isCompositeFilterDescriptor = function (source) {
    return utils_1.isPresent(source.filters);
};
