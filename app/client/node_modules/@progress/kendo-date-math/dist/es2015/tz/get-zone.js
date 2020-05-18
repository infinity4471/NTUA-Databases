import { timezones } from './timezones';
import { formatMessage, NO_TZ_INFO } from '../errors';
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
export const getZoneRules = (timezone) => {
    const zones = timezones.zones;
    if (!zones) {
        throw new Error(formatMessage(NO_TZ_INFO, timezone));
    }
    const zoneRules = zones[timezone];
    const result = typeof zoneRules === "string" ? zones[zoneRules] : zoneRules;
    if (!result) {
        throw new Error(formatMessage(NO_TZ_INFO, timezone));
    }
    return result;
};
