import { MS_PER_HOUR, MS_PER_MINUTE } from '../constants';
import { cloneDate } from '../clone-date';
import { abbrTimezone } from './abbr-timezone';
import { offset } from './offset';
import { toLocalDate } from './to-local-date';
var addMinutes = function (date, minutes) { return new Date(date.getTime() + minutes * MS_PER_MINUTE); };
var addHours = function (date, hours) { return new Date(date.getTime() + hours * MS_PER_HOUR); };
var dayAbbr = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];
var monthAbbr = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'
];
var datePrefix = function (utcDate) {
    return dayAbbr[utcDate.getUTCDay()] + ' ' + monthAbbr[utcDate.getUTCMonth()];
};
var padNumber = function (num, len) {
    if (len === void 0) { len = 2; }
    var sign = num < 0 ? '-' : '';
    return sign + new Array(len).concat([Math.abs(num)]).join('0').slice(-len);
};
function isZoneMissingHour(date, timezone) {
    var currentOffset = offset(timezone, date);
    var prevHour = addHours(date, -1);
    var prevOffset = offset(timezone, prevHour);
    return currentOffset < prevOffset;
}
function shiftZoneMissingHour(utcDate, timezone) {
    // Adjust for missing hour during DST transition in timezone.
    var dstOffset = isZoneMissingHour(utcDate, timezone) ? 1 : 0;
    return addHours(utcDate, dstOffset);
}
function convertTimezoneUTC(utcLocal, fromTimezone, toTimezone) {
    if (fromTimezone === toTimezone) {
        return utcLocal;
    }
    var fromOffset = offset(fromTimezone, utcLocal);
    var toOffset = offset(toTimezone, utcLocal);
    var baseDiff = fromOffset - toOffset;
    var midDate = addMinutes(utcLocal, baseDiff);
    var midOffset = offset(toTimezone, midDate);
    var dstDiff = toOffset - midOffset;
    return addMinutes(utcLocal, baseDiff + dstDiff);
}
function formatOffset(tzOffset) {
    var sign = tzOffset <= 0 ? '+' : '-';
    var value = Math.abs(tzOffset);
    var hours = padNumber(Math.floor(value / 60));
    var minutes = padNumber(value % 60);
    return "GMT" + sign + hours + minutes;
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
var ZonedDate = /** @class */ (function () {
    // The constructor is aliased as a static fromUTCDate method
    // to clarify the meaning of the utcDate parameter.
    //
    // It can be confused for a local date time while it is in fact
    // treated as a UTC date that represents the local date in the timezone.
    function ZonedDate(utcDate, timezone) {
        this._utcDate = cloneDate(utcDate);
        this.timezone = timezone;
        var tzOffset = offset(timezone, utcDate);
        this.timezoneOffset = tzOffset;
        var localDate = shiftZoneMissingHour(utcDate, timezone);
        this._localDate = convertTimezoneUTC(localDate, timezone, 'Etc/UTC');
    }
    Object.defineProperty(ZonedDate.prototype, "cachedLocalDate", {
        /**
         * Returns a cached local date that denotes the exact time in the set timezone.
         *
         * @return Date - A local date that denotes the exact time in the set timezone.
         *
         * This property is an alternative to `toLocalDate()` that returns a cached value instead of cloning it.
         *
         * > Modifying the returned instance will corrupt the `ZonedDate` state.
         */
        get: function () {
            return this._localDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZonedDate.prototype, "cachedUTCDate", {
        /**
         * Returns a cached `Date` instance with UTC date parts that are set to the local time in the set timezone.
         *
         * @returns Date - A `Date` with UTC date parts that are set to the local time in the set timezone.
         *
         * This property is an alternative to `toUTCDate()` that returns a cached value instead of cloning it.
         *
         * > Modifying the returned instance will corrupt the `ZonedDate` state.
         */
        get: function () {
            return this._utcDate;
        },
        enumerable: true,
        configurable: true
    });
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
    ZonedDate.fromLocalDate = function (date, timezone) {
        if (timezone === void 0) { timezone = ''; }
        var utcDate = convertTimezoneUTC(date, 'Etc/UTC', timezone);
        var shiftZone = isZoneMissingHour(utcDate, timezone);
        var zoneOffset = offset(timezone, utcDate);
        var fixedOffset = 0;
        if (shiftZone) {
            // Adjust for the missing hour during the DST transition in the timezone.
            fixedOffset = zoneOffset > 0 ? -1 : 1;
        }
        var adjDate = addHours(utcDate, fixedOffset);
        return ZonedDate.fromUTCDate(adjDate, timezone);
    };
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
    ZonedDate.fromUTCDate = function (utcDate, timezone) {
        if (timezone === void 0) { timezone = ''; }
        return new ZonedDate(utcDate, timezone);
    };
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
    ZonedDate.prototype.toLocalDate = function () {
        return cloneDate(this._localDate);
    };
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
    ZonedDate.prototype.toUTCDate = function () {
        return cloneDate(this._utcDate);
    };
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
    ZonedDate.prototype.toTimezone = function (toTimezone) {
        if (this.timezone === toTimezone) {
            return this.clone();
        }
        var tzOffset = offset(this.timezone, this._utcDate);
        var date = addMinutes(this._utcDate, tzOffset);
        return ZonedDate.fromLocalDate(date, toTimezone);
    };
    /**
     * Returns a new instance that represents the same date.
     *
     * @returns Date - A copy of the instance of the current zoned date.
     */
    ZonedDate.prototype.clone = function () {
        return ZonedDate.fromUTCDate(this._utcDate, this.timezone);
    };
    // tslint:disable:max-line-length
    /**
     * Adds the specified number of days and returns a new instance with the resulting date in the same timezone.
     *
     * @param days - The number of days that will be added.
     * @returns ZonedDate - The resulting date.
     */
    // tslint:enable:max-line-length
    ZonedDate.prototype.addDays = function (days) {
        var newDate = new Date(this._utcDate.getTime());
        newDate.setUTCDate(newDate.getUTCDate() + days);
        return ZonedDate.fromUTCDate(newDate, this.timezone);
    };
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
    ZonedDate.prototype.addTime = function (milliseconds) {
        var utcDate = new Date(this._utcDate.getTime());
        var utcMid = shiftZoneMissingHour(utcDate, this.timezone);
        utcMid.setTime(utcMid.getTime() + milliseconds);
        var utcResult = shiftZoneMissingHour(utcMid, this.timezone);
        return ZonedDate.fromUTCDate(utcResult, this.timezone);
    };
    // tslint:disable:max-line-length
    /**
     * Returns a new instance of the same zoned date having its time parts set to `00:00:00.000`.
     *
     * @returns ZonedDate - The same date having its time parts set to `00:00:00.000`.
     */
    // tslint:enable:max-line-length
    ZonedDate.prototype.stripTime = function () {
        var date = this._utcDate;
        var ticks = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
        return ZonedDate.fromUTCDate(new Date(ticks), this.timezone);
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getTime = function () {
        return this._localDate.getTime();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getTimezoneOffset = function () {
        return this.timezoneOffset;
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getFullYear = function () {
        return this._utcDate.getUTCFullYear();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getMonth = function () {
        return this._utcDate.getUTCMonth();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getDate = function () {
        return this._utcDate.getUTCDate();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getDay = function () {
        return this._utcDate.getUTCDay();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getHours = function () {
        return this._utcDate.getUTCHours();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getMinutes = function () {
        return this._utcDate.getUTCMinutes();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getSeconds = function () {
        return this._utcDate.getUTCSeconds();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getMilliseconds = function () {
        return this._utcDate.getUTCMilliseconds();
    };
    // The local date UTC parts represent actual UTC time
    /**
     * @hidden
     */
    ZonedDate.prototype.getUTCDate = function () {
        return this._localDate.getUTCDate();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getUTCDay = function () {
        return this._localDate.getUTCDay();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getUTCFullYear = function () {
        return this._localDate.getUTCFullYear();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getUTCHours = function () {
        return this._localDate.getUTCHours();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getUTCMilliseconds = function () {
        return this._localDate.getUTCMilliseconds();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getUTCMinutes = function () {
        return this._localDate.getUTCMinutes();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.getUTCMonth = function () {
        return this._localDate.getUTCMonth();
    };
    /** @hidden */
    ZonedDate.prototype.getUTCSeconds = function () {
        return this._localDate.getUTCSeconds();
    };
    /** @hidden */
    ZonedDate.prototype.setTime = function (time) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setMilliseconds = function (ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setUTCMilliseconds = function (ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setSeconds = function (sec, ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setUTCSeconds = function (sec, ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setMinutes = function (min, sec, ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setUTCMinutes = function (min, sec, ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setHours = function (hours, min, sec, ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setUTCHours = function (hours, min, sec, ms) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setDate = function (date) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setUTCDate = function (date) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setMonth = function (month, date) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setUTCMonth = function (month, date) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setFullYear = function (year, month, date) {
        throw new Error("Method not implemented.");
    };
    /** @hidden */
    ZonedDate.prototype.setUTCFullYear = function (year, month, date) {
        throw new Error("Method not implemented.");
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.toISOString = function () {
        return this._localDate.toISOString();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.toJSON = function () {
        return this._localDate.toJSON();
    };
    /**
     * @hidden
     */
    ZonedDate.prototype.toString = function () {
        var dateString = datePrefix(this._utcDate);
        var timeString = this.toTimeString();
        return dateString + " " + this.getDate() + " " + this.getFullYear() + " " + timeString;
    };
    /** @hidden */
    ZonedDate.prototype.toDateString = function () {
        return toLocalDate(this._utcDate).toDateString();
    };
    /** @hidden */
    ZonedDate.prototype.toTimeString = function () {
        var hours = padNumber(this.getHours());
        var minutes = padNumber(this.getMinutes());
        var seconds = padNumber(this.getSeconds());
        var time = hours + ":" + minutes + ":" + seconds;
        var tzOffset = formatOffset(this.timezoneOffset);
        var abbrev = abbrTimezone(this.timezone, this._utcDate);
        if (abbrev) {
            abbrev = " (" + abbrev + ")";
        }
        return time + " " + tzOffset + abbrev;
    };
    ZonedDate.prototype.toLocaleString = function (locales, options) {
        return this._localDate.toLocaleString(locales, options);
    };
    ZonedDate.prototype.toLocaleDateString = function (locales, options) {
        return this._localDate.toLocaleDateString(locales, options);
    };
    ZonedDate.prototype.toLocaleTimeString = function (locales, options) {
        return this._localDate.toLocaleTimeString(locales, options);
    };
    /** @hidden */
    ZonedDate.prototype.toUTCString = function () {
        return this.toTimezone('Etc/UTC').toString();
    };
    ZonedDate.prototype[Symbol.toPrimitive] = function (hint) {
        if (hint === 'string' || hint === 'default') {
            return this.toString();
        }
        return this._localDate.getTime();
    };
    /** @hidden */
    ZonedDate.prototype.valueOf = function () {
        return this.getTime();
    };
    /** @hidden */
    ZonedDate.prototype.getVarDate = function () {
        throw new Error('Not implemented.');
    };
    /** @hidden */
    ZonedDate.prototype.format = function (_) {
        throw new Error('Not implemented.');
    };
    /** @hidden */
    ZonedDate.prototype.formatUTC = function (_) {
        throw new Error('Not implemented.');
    };
    return ZonedDate;
}());
export { ZonedDate };
