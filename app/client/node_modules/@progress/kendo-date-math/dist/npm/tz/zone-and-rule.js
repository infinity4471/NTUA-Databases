"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_rule_1 = require("./find-rule");
var find_zone_1 = require("./find-zone");
/**
 * @hidden
 *
 * A function that gets the information about the zone and the rule for a specific timezone.
 *
 */
exports.zoneAndRule = function (timezone, date) {
    var utcTime = date.getTime();
    var zone = find_zone_1.findZone(timezone, utcTime);
    return {
        rule: find_rule_1.findRule(zone[1], utcTime, zone[0]),
        zone: zone
    };
};
