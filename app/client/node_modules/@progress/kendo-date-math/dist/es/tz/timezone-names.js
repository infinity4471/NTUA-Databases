import { timezones } from './timezones';
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
export var timezoneNames = function () { return Object.keys(timezones.zones); };
