import { timezones } from './timezones';
/**
 * A function that returns the full name of the timezone.
 *
 * @param timezone - The timezone name. For example, `America/Chicago`, `Europe/Sofia`.
 *
 * @return - Returns the full names of the timezone and the group.
 *
 * @example
 * ```ts-no-run
 * timezoneTitle('America/Chicago'); // Central Standard Time
 * ```
 */
export const timezoneTitle = (timezone) => {
    const { titles } = timezones;
    const info = titles[timezone] || {};
    return info.long || timezone;
};
