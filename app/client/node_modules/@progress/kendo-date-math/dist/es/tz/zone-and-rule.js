import { findRule } from './find-rule';
import { findZone } from './find-zone';
/**
 * @hidden
 *
 * A function that gets the information about the zone and the rule for a specific timezone.
 *
 */
export var zoneAndRule = function (timezone, date) {
    var utcTime = date.getTime();
    var zone = findZone(timezone, utcTime);
    return {
        rule: findRule(zone[1], utcTime, zone[0]),
        zone: zone
    };
};
