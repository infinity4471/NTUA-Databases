"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timezones_1 = require("./timezones");
/**
 * A function that returns the list of all timezones that are loaded.
 *
 * @return - Returns the list of all timezones that are loaded.
 *
 * @example
 * ```ts-no-run
 * import '@progress/kendo-date-math/timezones/europe-berlin';
 * import '@progress/kendo-date-math/timezones/europe-sofia';
 *
 * timezoneNames(); // ['Europe/Berlin', 'Europe/Sofia']
 * ```
 */
exports.timezoneNames = function () { return Object.keys(timezones_1.timezones.zones); };
