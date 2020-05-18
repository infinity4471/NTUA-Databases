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
export declare class ZonedDate implements Date {
    /**
     * The ID of the timezone for this instance. For example, `Europe/Sofia`.
     */
    readonly timezone: string;
    /**
     * The timezone offset in minutes at the specified date and relative to UTC.
     */
    readonly timezoneOffset: number;
    /**
     * Returns a cached local date that denotes the exact time in the set timezone.
     *
     * @return Date - A local date that denotes the exact time in the set timezone.
     *
     * This property is an alternative to `toLocalDate()` that returns a cached value instead of cloning it.
     *
     * > Modifying the returned instance will corrupt the `ZonedDate` state.
     */
    readonly cachedLocalDate: Date;
    /**
     * Returns a cached `Date` instance with UTC date parts that are set to the local time in the set timezone.
     *
     * @returns Date - A `Date` with UTC date parts that are set to the local time in the set timezone.
     *
     * This property is an alternative to `toUTCDate()` that returns a cached value instead of cloning it.
     *
     * > Modifying the returned instance will corrupt the `ZonedDate` state.
     */
    readonly cachedUTCDate: Date;
    private _utcDate;
    private _localDate;
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
    static fromLocalDate(date: Date, timezone?: string): ZonedDate;
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
    static fromUTCDate(utcDate: Date, timezone?: string): ZonedDate;
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
    toLocalDate(): Date;
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
    toUTCDate(): Date;
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
    toTimezone(toTimezone: string): ZonedDate;
    /**
     * Returns a new instance that represents the same date.
     *
     * @returns Date - A copy of the instance of the current zoned date.
     */
    clone(): ZonedDate;
    /**
     * Adds the specified number of days and returns a new instance with the resulting date in the same timezone.
     *
     * @param days - The number of days that will be added.
     * @returns ZonedDate - The resulting date.
     */
    addDays(days: number): ZonedDate;
    /**
     * Adds the specified number of milliseconds and returns a new instance with the resulting date in the same timezone.
     *
     * The method compensates for DST transitions and ensures that the resulting date occurs exactly after the set amount of time in the timezone.
     *
     * @param milliseconds - The number of days that will be added.
     * @returns ZonedDate - The resulting date.
     */
    addTime(milliseconds: number): ZonedDate;
    /**
     * Returns a new instance of the same zoned date having its time parts set to `00:00:00.000`.
     *
     * @returns ZonedDate - The same date having its time parts set to `00:00:00.000`.
     */
    stripTime(): ZonedDate;
    /**
     * @hidden
     */
    getTime(): number;
    /**
     * @hidden
     */
    getTimezoneOffset(): number;
    /**
     * @hidden
     */
    getFullYear(): number;
    /**
     * @hidden
     */
    getMonth(): number;
    /**
     * @hidden
     */
    getDate(): number;
    /**
     * @hidden
     */
    getDay(): number;
    /**
     * @hidden
     */
    getHours(): number;
    /**
     * @hidden
     */
    getMinutes(): number;
    /**
     * @hidden
     */
    getSeconds(): number;
    /**
     * @hidden
     */
    getMilliseconds(): number;
    /**
     * @hidden
     */
    getUTCDate(): number;
    /**
     * @hidden
     */
    getUTCDay(): number;
    /**
     * @hidden
     */
    getUTCFullYear(): number;
    /**
     * @hidden
     */
    getUTCHours(): number;
    /**
     * @hidden
     */
    getUTCMilliseconds(): number;
    /**
     * @hidden
     */
    getUTCMinutes(): number;
    /**
     * @hidden
     */
    getUTCMonth(): number;
    /** @hidden */
    getUTCSeconds(): number;
    /** @hidden */
    setTime(time: number): number;
    /** @hidden */
    setMilliseconds(ms: number): number;
    /** @hidden */
    setUTCMilliseconds(ms: number): number;
    /** @hidden */
    setSeconds(sec: number, ms?: number): number;
    /** @hidden */
    setUTCSeconds(sec: number, ms?: number): number;
    /** @hidden */
    setMinutes(min: number, sec?: number, ms?: number): number;
    /** @hidden */
    setUTCMinutes(min: number, sec?: number, ms?: number): number;
    /** @hidden */
    setHours(hours: number, min?: number, sec?: number, ms?: number): number;
    /** @hidden */
    setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number;
    /** @hidden */
    setDate(date: number): number;
    /** @hidden */
    setUTCDate(date: number): number;
    /** @hidden */
    setMonth(month: number, date?: number): number;
    /** @hidden */
    setUTCMonth(month: number, date?: number): number;
    /** @hidden */
    setFullYear(year: number, month?: number, date?: number): number;
    /** @hidden */
    setUTCFullYear(year: number, month?: number, date?: number): number;
    /**
     * @hidden
     */
    toISOString(): string;
    /**
     * @hidden
     */
    toJSON(): string;
    /**
     * @hidden
     */
    toString(): string;
    /** @hidden */
    toDateString(): string;
    /** @hidden */
    toTimeString(): string;
    /** @hidden */
    toLocaleString(): string;
    toLocaleString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    /** @hidden */
    toLocaleDateString(): string;
    toLocaleDateString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    /** @hidden */
    toLocaleTimeString(): string;
    toLocaleTimeString(locales?: string | string[], options?: Intl.DateTimeFormatOptions): string;
    /** @hidden */
    toUTCString(): string;
    /** @hidden */
    [Symbol.toPrimitive](hint: "default"): string;
    [Symbol.toPrimitive](hint: "string"): string;
    [Symbol.toPrimitive](hint: "number"): number;
    [Symbol.toPrimitive](hint: string): string | number;
    /** @hidden */
    valueOf(): number;
    /** @hidden */
    getVarDate(): any;
    /** @hidden */
    format(_: string): string;
    /** @hidden */
    formatUTC(_: string): string;
    private constructor();
}
