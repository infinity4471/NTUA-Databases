import { timezones } from './timezones';
import { formatMessage, NO_TZ_INFO, INVALID_TZ_STRUCTURE } from '../errors';
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
export const loadTimezone = (tzInfo) => {
    if (!tzInfo) {
        throw new Error(formatMessage(NO_TZ_INFO, ''));
    }
    const { rules, titles, zones } = tzInfo;
    if (rules === undefined || zones === undefined) {
        throw new Error(INVALID_TZ_STRUCTURE);
    }
    Object.assign(timezones.rules, rules);
    Object.assign(timezones.titles, titles || {});
    Object.assign(timezones.zones, zones);
};
