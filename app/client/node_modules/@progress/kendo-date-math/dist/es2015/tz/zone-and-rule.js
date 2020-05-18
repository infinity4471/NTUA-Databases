import { findRule } from './find-rule';
import { findZone } from './find-zone';
/**
 * @hidden
 *
 * A function that gets the information about the zone and the rule for a specific timezone.
 *
 */
export const zoneAndRule = (timezone, date) => {
    const utcTime = date.getTime();
    const zone = findZone(timezone, utcTime);
    return {
        rule: findRule(zone[1], utcTime, zone[0]),
        zone: zone
    };
};
