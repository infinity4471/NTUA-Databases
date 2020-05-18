/**
 * A function that creates a local date from the UTC date parts of the input.
 *
 * @param date - The date value that will be converted. Only the UTC date parts are read.
 * @return Date - A local date with the UTC time parts of the supplied date.
 *
 * @example
 * ```ts-no-run
 * import { toLocalDate } from '@progress/kendo-date-math'
 *
 * const date = new Date('2016-11-05');
 * const local = toLocalDate(date);
 *
 * // For example, if the browser is in GMT+0200,
 * // the local date will be shifted 2 hours back:
 * //
 * // "Fri Nov 04 2016 22:00:00 GMT+0200"
 * console.log(local);
 *
 * // This is the same as the UTC parts of the input date:
 * //
 * // "2016-11-05T22:00:00.000Z"
 * console.log(date.toISOString());
 * ```
 */
export function toLocalDate(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}
