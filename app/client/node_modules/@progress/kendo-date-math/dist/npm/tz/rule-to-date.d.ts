/**
 * @hidden
 *
 * A function that finds zone rules which become applicable after a specific time.
 *
 * @param year - The value of the year.
 * @param rule - A specific zone rule.
 * @param zone - The definition of the zone.
 *
 * @return - Returns an extended rule.
 *
 * @example
 * ```ts-no-run
 * ruleToDate(2018, rule); // A rule that contains {'2018': |2018 DST date| }
 * ```
 */
export declare const ruleToDate: (year: any, rule: any, zoneOffset: any) => any;
