/**
 * @hidden
 *
 * A function that finds zone rules which become applicable after a specific time.
 *
 * @param timezone - The timezone name. For example, `America/Chicago`, `Europe/Sofia`.
 * @param utcTime - The UTC time boundary for a zone rule. Defaults to the current UTC time.
 *
 * @return - Returns a zone rule for the specific zone name.
 *
 * @example
 * ```ts-no-run
 * findZone('Europe/Sofia'); //[-120,"EU","EE%sT",null]
 * ```
 */
export declare const findRule: (zoneRule: any, utcTime?: number, zoneOffset?: number) => any;
