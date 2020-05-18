import { MS_PER_HOUR, MS_PER_MINUTE } from '../constants';
import { cloneDate } from '../clone-date';
import { abbrTimezone } from './abbr-timezone';
import { offset } from './offset';
import { toLocalDate } from './to-local-date';
const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * MS_PER_MINUTE);
const addHours = (date, hours) => new Date(date.getTime() + hours * MS_PER_HOUR);
const dayAbbr = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];
const monthAbbr = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'
];
const datePrefix = (utcDate) => dayAbbr[utcDate.getUTCDay()] + ' ' + monthAbbr[utcDate.getUTCMonth()];
const padNumber = (num, len = 2) => {
    const sign = num < 0 ? '-' : '';
    return sign + new Array(len).concat([Math.abs(num)]).join('0').slice(-len);
};
function isZoneMissingHour(date, timezone) {
    const currentOffset = offset(timezone, date);
    const prevHour = addHours(date, -1);
    const prevOffset = offset(timezone, prevHour);
    return currentOffset < prevOffset;
}
function shiftZoneMissingHour(utcDate, timezone) {
    // Adjust for missing hour during DST transition in timezone.
    const dstOffset = isZoneMissingHour(utcDate, timezone) ? 1 : 0;
    return addHours(utcDate, dstOffset);
}
function convertTimezoneUTC(utcLocal, fromTimezone, toTimezone) {
    if (fromTimezone === toTimezone) {
        return utcLocal;
    }
    const fromOffset = offset(fromTimezone, utcLocal);
    const toOffset = offset(toTimezone, utcLocal);
    const baseDiff = fromOffset - toOffset;
    const midDate = addMinutes(utcLocal, baseDiff);
    const midOffset = offset(toTimezone, midDate);
    const dstDiff = toOffset - midOffset;
    return addMinutes(utcLocal, baseDiff + dstDiff);
}
function formatOffset(tzOffset) {
    const sign = tzOffset <= 0 ? '+' : '-';
    const value = Math.abs(tzOffset);
    const hours = padNumber(Math.floor(value / 60));
    const minutes = padNumber(value % 60);
    return `GMT${sign}${hours}${minutes}`;
}
/**
 * Represents a local date in a specified timezone.
 *
 * The following example demonstrates how to convert a local date to the specified timezone.
 *
 * @example
 * ```ts
 * import { ZonedDate } from '@progress/kendo-date-math';
 * import '@progress/kendo-date-math/tz/America/New_York';
 *
 * const date = new Date('2018-03-13T00:00:00Z');
 * const tzDate = ZonedDate.fromLocalDate(date, 'America/New_York');
 *
 * // If you run this example in GMT+0200,
 * // the output will be '2018-03-12T22:00:00.000Z'.
 * console.log(tzDate.toISOString());
 * ```
 *
 * The following example demonstrates how to convert between timezones.
 *
 * @example
 * ```ts
 * import { ZonedDate } from '@progress/kendo-date-math';
 * import '@progress/kendo-date-math/tz/America/New_York';
 * import '@progress/kendo-date-math/tz/America/Los_Angeles';
 *
 * // Note the "Z" suffix for UTC dates.
 * const date = new Date('2018-03-12T22:00:00Z');
 *
 * const tzDate = ZonedDate.fromLocalDate(date, 'America/New_York');
 * const result = tzDate.toTimezone('America/Los_Angeles');
 *
 * // Regardless of the browser timezone
 * // the output will be '2018-03-12T15:00:00.000Z'.
 * console.log(tzDate.toUTCDate());
 * ```
 */
export class ZonedDate {
    /**
     * Returns a cached local date that denotes the exact time in the set timezone.
     *
     * @return Date - A local date that denotes the exact time in the set timezone.
     *
     * This property is an alternative to `toLocalDate()` that returns a cached value instead of cloning it.
     *
     * > Modifying the returned instance will corrupt the `ZonedDate` state.
     */
    get cachedLocalDate() {
        return this._localDate;
    }
    /**
     * Returns a cached `Date` instance with UTC date parts that are set to the local time in the set timezone.
     *
     * @returns Date - A `Date` with UTC date parts that are set to the local time in the set timezone.
     *
     * This property is an alternative to `toUTCDate()` that returns a cached value instead of cloning it.
     *
     * > Modifying the returned instance will corrupt the `ZonedDate` state.
     */
    get cachedUTCDate() {
        return this._utcDate;
    }
    // tslint:disable:max-line-length
    /**
     * Converts an existing date to a specified timezone.
     *
     * If the `timezone` parameter is omitted, the `ZonedDate` defaults to the timezone of the browser. This concept is known as "floating date" because it does not represent a particular moment in time. Instead, its actual value depends on the current timezone of the browser.
     *
     * @param date - The local date that represents the actual time instance.
     * @param timezone - The ID of the timezone that will be assumed. For example, `Europe/Sofia`.
     * @return ZonedDate - The date in the specified timezone.
     *
     * @example
     * ```ts
     * import { ZonedDate } from '@progress/kendo-date-math';
     * import '@progress/kendo-date-math/tz/America/New_York';
     *
     * const date = new Date('2018-03-13T00:00:00');
     * const tzDate = ZonedDate.fromLocalDate(date, 'America/New_York');
     *
     * // If you run this example in GMT+0200,
     * // the output will be 'Mon Mar 12 2018 18:00:00 GMT+0200 (EET)'.
     * console.log(tzDate.toString());
     *
     * // If you run this example in UTC,
     * // the output will be '2018-03-12T22:00:00.000Z'.
     * console.log(tzDate.toISOString());
     * ```
     */
    // tslint:enable:max-line-length
    static fromLocalDate(date, timezone = '') {
        const utcDate = convertTimezoneUTC(date, 'Etc/UTC', timezone);
        const shiftZone = isZoneMissingHour(utcDate, timezone);
        const zoneOffset = offset(timezone, utcDate);
        let fixedOffset = 0;
        if (shiftZone) {
            // Adjust for the missing hour during the DST transition in the timezone.
            fixedOffset = zoneOffset > 0 ? -1 : 1;
        }
        const adjDate = addHours(utcDate, fixedOffset);
        return ZonedDate.fromUTCDate(adjDate, timezone);
    }
    // tslint:disable:max-line-length
    /**
     * Creates a date in a specific timezone from the UTC date parts of the supplied `Date`.
     *
     * If the `timezone` parameter is omitted, the `ZonedDate` defaults to the timezone of the browser. This concept is known as "floating date" because it does not represent a particular moment in time. Instead, its actual value depends on the current timezone of the browser.
     *
     * @param date - The UTC date that represents the time in the target zone. This time is not the actual time instant in UTC.
     * @param timezone - The ID of the timezone that will be assumed. For example, `Europe/Sofia`.
     * @return ZonedDate - The date in the specified timezone.
     *
     * @example
     * ```ts
     * import { ZonedDate } from '@progress/kendo-date-math';
     * import '@progress/kendo-date-math/tz/America/New_York';
     *
     * // Note the "Z" suffix for UTC dates.
     * const date = new Date('2018-03-12T18:00:00Z');
     *
     * // Alternative syntax using Date.UTC
     * // const date = new Date(Date.UTC(2018, 2, 12, 18, 0));
     *
     * const tzDate = ZonedDate.fromUTCDate(date, 'America/New_York');
     *
     * // Regardless of the browser timezone
     * // the output will be 'Mon Mar 12 2018 18:00:00 GMT+0200 (EET)'.
     * console.log(tzDate.toString());
     *
     * // Regardless of the browser timezone
     * // the output in UTC will be '2018-03-12T22:00:00.000Z'.
     * console.log(tzDate.toISOString());
     * ```
     */
    // tslint:enable:max-line-length
    static fromUTCDate(utcDate, timezone = '') {
        return new ZonedDate(utcDate, timezone);
    }
    /**
     * Returns a local date that denotes the exact time in the set timezone.
     *
     * @return Date - A local date that denotes the exact time in the set timezone.
     *
     * @example
     * ```ts
     * import { ZonedDate } from '@progress/kendo-date-math';
     * import '@progress/kendo-date-math/tz/America/New_York';
     *
     * // Note the "Z" suffix for UTC dates.
     * const date = new Date('2018-03-12T18:00:00Z');
     * const tzDate = ZonedDate.fromUTCDate(date, 'America/New_York');
     *
     * // The local date represents the same moment in time as the ZonedDate:
     * // `2018-03-12T22:00:00.000Z`.
     * console.log(tzDate.toLocalDate().toISOString());
     *
     * // The local date will apply the timezone of the browser. For example,
     * // `Tue Mar 13 2018 00:00:00 GMT+0200 (Eastern European Standard Time)`.
     * console.log(tzDate.toLocalDate().toString())
     * ```
     */
    toLocalDate() {
        return cloneDate(this._localDate);
    }
    /**
     * Returns a `Date` instance with UTC date parts that are set to the local time in the set timezone.
     *
     * @returns Date - A `Date` with UTC date parts that are set to the local time in the set timezone.
     *
     * @example
     * ```ts
     * import { ZonedDate } from '@progress/kendo-date-math';
     * import '@progress/kendo-date-math/tz/America/New_York';
     *
     * // Note the "Z" suffix for UTC dates.
     * const date = new Date('2018-03-12T18:00:00Z');
     * const tzDate = ZonedDate.fromUTCDate(date, 'America/New_York');
     *
     * // Regardless of the browser timezone
     * // the output will be '2018-03-12T18:00:00.000Z'.
     * console.log(tzDate.toUTCDate());
     * ```
     */
    toUTCDate() {
        return cloneDate(this._utcDate);
    }
    /**
     * Converts the date to the specified timezone.
     *
     * @param toTimezone - The timezone to which the values will be converted. For example, `America/Los_Angeles`.
     * @returns ZonedDate - The resulting zoned date.
     *
     * @example
     * ```ts
     * import { ZonedDate } from '@progress/kendo-date-math';
     * import '@progress/kendo-date-math/tz/America/New_York';
     * import '@progress/kendo-date-math/tz/America/Los_Angeles';
     *
     * // Note the "Z" suffix for UTC dates.
     * const date = new Date('2018-03-12T22:00:00Z');
     *
     * const tzDate = ZonedDate.fromLocalDate(date, 'America/New_York');
     * const result = tzDate.toTimezone('America/Los_Angeles');
     *
     * // Regardless of the browser timezone
     * // the output will be '2018-03-12T15:00:00.000Z'.
     * console.log(tzDate.toUTCDate());
     * ```
     */
    toTimezone(toTimezone) {
        if (this.timezone === toTimezone) {
            return this.clone();
        }
        const tzOffset = offset(this.timezone, this._utcDate);
        const date = addMinutes(this._utcDate, tzOffset);
        return ZonedDate.fromLocalDate(date, toTimezone);
    }
    /**
     * Returns a new instance that represents the same date.
     *
     * @returns Date - A copy of the instance of the current zoned date.
     */
    clone() {
        return ZonedDate.fromUTCDate(this._utcDate, this.timezone);
    }
    // tslint:disable:max-line-length
    /**
     * Adds the specified number of days and returns a new instance with the resulting date in the same timezone.
     *
     * @param days - The number of days that will be added.
     * @returns ZonedDate - The resulting date.
     */
    // tslint:enable:max-line-length
    addDays(days) {
        const newDate = new Date(this._utcDate.getTime());
        newDate.setUTCDate(newDate.getUTCDate() + days);
        return ZonedDate.fromUTCDate(newDate, this.timezone);
    }
    // tslint:disable:max-line-length
    /**
     * Adds the specified number of milliseconds and returns a new instance with the resulting date in the same timezone.
     *
     * The method compensates for DST transitions and ensures that the resulting date occurs exactly after the set amount of time in the timezone.
     *
     * @param milliseconds - The number of days that will be added.
     * @returns ZonedDate - The resulting date.
     */
    // tslint:enable:max-line-length
    addTime(milliseconds) {
        const utcDate = new Date(this._utcDate.getTime());
        const utcMid = shiftZoneMissingHour(utcDate, this.timezone);
        utcMid.setTime(utcMid.getTime() + milliseconds);
        const utcResult = shiftZoneMissingHour(utcMid, this.timezone);
        return ZonedDate.fromUTCDate(utcResult, this.timezone);
    }
    // tslint:disable:max-line-length
    /**
     * Returns a new instance of the same zoned date having its time parts set to `00:00:00.000`.
     *
     * @returns ZonedDate - The same date having its time parts set to `00:00:00.000`.
     */
    // tslint:enable:max-line-length
    stripTime() {
        const date = this._utcDate;
        const ticks = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
        return ZonedDate.fromUTCDate(new Date(ticks), this.timezone);
    }
    /**
     * @hidden
     */
    getTime() {
        return this._localDate.getTime();
    }
    /**
     * @hidden
     */
    getTimezoneOffset() {
        return this.timezoneOffset;
    }
    /**
     * @hidden
     */
    getFullYear() {
        return this._utcDate.getUTCFullYear();
    }
    /**
     * @hidden
     */
    getMonth() {
        return this._utcDate.getUTCMonth();
    }
    /**
     * @hidden
     */
    getDate() {
        return this._utcDate.getUTCDate();
    }
    /**
     * @hidden
     */
    getDay() {
        return this._utcDate.getUTCDay();
    }
    /**
     * @hidden
     */
    getHours() {
        return this._utcDate.getUTCHours();
    }
    /**
     * @hidden
     */
    getMinutes() {
        return this._utcDate.getUTCMinutes();
    }
    /**
     * @hidden
     */
    getSeconds() {
        return this._utcDate.getUTCSeconds();
    }
    /**
     * @hidden
     */
    getMilliseconds() {
        return this._utcDate.getUTCMilliseconds();
    }
    // The local date UTC parts represent actual UTC time
    /**
     * @hidden
     */
    getUTCDate() {
        return this._localDate.getUTCDate();
    }
    /**
     * @hidden
     */
    getUTCDay() {
        return this._localDate.getUTCDay();
    }
    /**
     * @hidden
     */
    getUTCFullYear() {
        return this._localDate.getUTCFullYear();
    }
    /**
     * @hidden
     */
    getUTCHours() {
        return this._localDate.getUTCHours();
    }
    /**
     * @hidden
     */
    getUTCMilliseconds() {
        return this._localDate.getUTCMilliseconds();
    }
    /**
     * @hidden
     */
    getUTCMinutes() {
        return this._localDate.getUTCMinutes();
    }
    /**
     * @hidden
     */
    getUTCMonth() {
        return this._localDate.getUTCMonth();
    }
    /** @hidden */
    getUTCSeconds() {
        return this._localDate.getUTCSeconds();
    }
    /** @hidden */
    setTime(time) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setMilliseconds(ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setUTCMilliseconds(ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setSeconds(sec, ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setUTCSeconds(sec, ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setMinutes(min, sec, ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setUTCMinutes(min, sec, ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setHours(hours, min, sec, ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setUTCHours(hours, min, sec, ms) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setDate(date) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setUTCDate(date) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setMonth(month, date) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setUTCMonth(month, date) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setFullYear(year, month, date) {
        throw new Error("Method not implemented.");
    }
    /** @hidden */
    setUTCFullYear(year, month, date) {
        throw new Error("Method not implemented.");
    }
    /**
     * @hidden
     */
    toISOString() {
        return this._localDate.toISOString();
    }
    /**
     * @hidden
     */
    toJSON() {
        return this._localDate.toJSON();
    }
    /**
     * @hidden
     */
    toString() {
        const dateString = datePrefix(this._utcDate);
        const timeString = this.toTimeString();
        return `${dateString} ${this.getDate()} ${this.getFullYear()} ${timeString}`;
    }
    /** @hidden */
    toDateString() {
        return toLocalDate(this._utcDate).toDateString();
    }
    /** @hidden */
    toTimeString() {
        const hours = padNumber(this.getHours());
        const minutes = padNumber(this.getMinutes());
        const seconds = padNumber(this.getSeconds());
        const time = `${hours}:${minutes}:${seconds}`;
        const tzOffset = formatOffset(this.timezoneOffset);
        let abbrev = abbrTimezone(this.timezone, this._utcDate);
        if (abbrev) {
            abbrev = ` (${abbrev})`;
        }
        return `${time} ${tzOffset}${abbrev}`;
    }
    toLocaleString(locales, options) {
        return this._localDate.toLocaleString(locales, options);
    }
    toLocaleDateString(locales, options) {
        return this._localDate.toLocaleDateString(locales, options);
    }
    toLocaleTimeString(locales, options) {
        return this._localDate.toLocaleTimeString(locales, options);
    }
    /** @hidden */
    toUTCString() {
        return this.toTimezone('Etc/UTC').toString();
    }
    [Symbol.toPrimitive](hint) {
        if (hint === 'string' || hint === 'default') {
            return this.toString();
        }
        return this._localDate.getTime();
    }
    /** @hidden */
    valueOf() {
        return this.getTime();
    }
    /** @hidden */
    getVarDate() {
        throw new Error('Not implemented.');
    }
    /** @hidden */
    format(_) {
        throw new Error('Not implemented.');
    }
    /** @hidden */
    formatUTC(_) {
        throw new Error('Not implemented.');
    }
    // The constructor is aliased as a static fromUTCDate method
    // to clarify the meaning of the utcDate parameter.
    //
    // It can be confused for a local date time while it is in fact
    // treated as a UTC date that represents the local date in the timezone.
    constructor(utcDate, timezone) {
        this._utcDate = cloneDate(utcDate);
        this.timezone = timezone;
        const tzOffset = offset(timezone, utcDate);
        this.timezoneOffset = tzOffset;
        let localDate = shiftZoneMissingHour(utcDate, timezone);
        this._localDate = convertTimezoneUTC(localDate, timezone, 'Etc/UTC');
    }
}
