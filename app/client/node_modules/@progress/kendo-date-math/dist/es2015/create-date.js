import { adjustDST } from './adjust-dst';
/**
 * A function which returns a new `Date` instance.
 *
 * @param year - The year value.
 * @param month - The month value.
 * @param day - The day value.
 * @param hours - The hours value.
 * @param minutes - The minutes value.
 * @param seconds - The seconds value.
 * @param milliseconds - milliseconds value.
 * @returns The date instance.
 *
 * @example
 * ```ts-no-run
 * createDate(2016, 0, 15); // 2016-01-15 00:00:00
 * createDate(2016, 0, 15, 22, 22, 20); // 2016-01-15 22:22:20
 * ```
 */
export const createDate = (year, month, day, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) => {
    const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    if (year > -1 && year < 100) {
        date.setFullYear(date.getFullYear() - 1900);
    }
    return adjustDST(date, hours);
};
