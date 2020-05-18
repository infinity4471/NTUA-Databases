"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timezones_1 = require("./timezones");
var errors_1 = require("../errors");
// tslint:disable:max-line-length
/**
 * A function that loads the information about the provided timezone. The details for the loaded timezone will be available to all functions that are related to the manipulation of the timezone.
 *
 * @param timezoneInfo - The information about the timezone that will be loaded.
 *
 * @example
 * ```ts-no-run
 * loadTimezone({ zones: [...], rules: [...]});
 * ```
 */
// tslint:enable:max-line-length
exports.loadTimezone = function (tzInfo) {
    if (!tzInfo) {
        throw new Error(errors_1.formatMessage(errors_1.NO_TZ_INFO, ''));
    }
    var rules = tzInfo.rules, titles = tzInfo.titles, zones = tzInfo.zones;
    if (rules === undefined || zones === undefined) {
        throw new Error(errors_1.INVALID_TZ_STRUCTURE);
    }
    Object.assign(timezones_1.timezones.rules, rules);
    Object.assign(timezones_1.timezones.titles, titles || {});
    Object.assign(timezones_1.timezones.zones, zones);
};
