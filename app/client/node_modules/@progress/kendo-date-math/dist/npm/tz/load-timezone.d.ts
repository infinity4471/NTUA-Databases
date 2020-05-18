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
export declare const loadTimezone: (tzInfo: any) => void;
