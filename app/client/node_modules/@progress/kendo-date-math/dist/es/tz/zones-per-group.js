import { timezones } from './timezones';
/**
 * A function that returns all timezones which match the title of the zone.
 *
 * @param group - The fully qualified zone title. For example, Central Standard Time.
 *
 * @return - Returns the list of all matching timezone names. For example, `[America/Chicago, ...]`.
 *
 * @example
 * ```ts-no-run
 * zonesPerGroup('(GMT+01:00) Amsterdam, Berlin'); // ['Europe/Amsterdam', 'Europe/Berlin'...]
 * ```
 */
export var zonesPerGroup = function (group) {
    var titles = timezones.titles;
    return Object.keys(titles).reduce(function (result, title) {
        var info = titles[title] || {};
        return info.group === group ? result.concat(title.split(' ')) : result;
    }, []);
};
