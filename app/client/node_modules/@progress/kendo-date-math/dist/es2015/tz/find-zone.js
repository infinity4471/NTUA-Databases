import { getZoneRules } from './get-zone';
import { formatMessage, NO_TZ_INFO } from '../errors';
/**
 * @hidden
 *
 * A function that finds zone rules which become applicable after specific time.
 */
export const findZone = (timezone, utcTime = new Date().getTime()) => {
    if (timezone === 'Etc/UTC' || timezone === 'Etc/GMT') {
        return [0, "-", "UTC", null];
    }
    const zoneRules = getZoneRules(timezone);
    let idx = zoneRules.length - 1;
    for (; idx >= 0; idx--) {
        const until = zoneRules[idx][3];
        if (until && utcTime > until) {
            break;
        }
    }
    const zone = zoneRules[idx + 1];
    if (!zone) {
        throw new Error(formatMessage(NO_TZ_INFO, timezone));
    }
    return zone;
};
