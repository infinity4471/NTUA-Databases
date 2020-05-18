/**
 * @hidden
 *
 * A function that calculates the time offset based on zone name.
 *
 * @param timezone - The timezone name. For example, `America/Chicago`, `Europe/Sofia`.
 * @param date - A date for which the zone rule will be located.
 *
 * @return - Returns the timezone offset in minutes at the specified time.
 */
export declare const offset: (timezone: any, date?: Date) => number;
