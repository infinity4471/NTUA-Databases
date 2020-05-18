"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timezones_1 = require("./timezones");
var errors_1 = require("../errors");
/**
 * @hidden
 *
 * A function that gets all zone rules for a specific zone.
 *
 * @param timezone - The timezone name. For example, `America/Chicago`, `Europe/Sofia`.
 *
 * @return - Returns all zone rules for the specific zone name.
 *
 * @example
 * ```ts-no-run
 * findZone('Europe/Sofia'); //[[-120,"E-Eur","EE%sT",883526400000], [-120,"EU","EE%sT",null]]
 * ```
 */
exports.getZoneRules = function (timezone) {
    var zones = timezones_1.timezones.zones;
    if (!zones) {
        throw new Error(errors_1.formatMessage(errors_1.NO_TZ_INFO, timezone));
    }
    var zoneRules = zones[timezone];
    var result = typeof zoneRules === "string" ? zones[zoneRules] : zoneRules;
    if (!result) {
        throw new Error(errors_1.formatMessage(errors_1.NO_TZ_INFO, timezone));
    }
    return result;
};
