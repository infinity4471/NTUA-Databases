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
export declare const getZoneRules: (timezone: any) => any;
