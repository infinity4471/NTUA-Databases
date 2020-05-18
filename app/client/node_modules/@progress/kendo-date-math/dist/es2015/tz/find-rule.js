import { timezones } from './timezones';
import { ruleToDate } from './rule-to-date';
const CURRENT_UTC_TIME = (new Date()).getTime();
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
export const findRule = (zoneRule, utcTime = CURRENT_UTC_TIME, zoneOffset = 0) => {
    let rules = timezones.rules[zoneRule];
    if (!rules) {
        const time = zoneRule.split(":");
        let offset = 0;
        if (time.length > 1) {
            offset = time[0] * 60 + Number(time[1]);
        }
        return [-1000000, 'max', '-', 'Jan', 1, [0, 0, 0], offset, '-'];
    }
    const year = new Date(utcTime).getUTCFullYear();
    rules = rules.filter((currentRule) => {
        const from = currentRule[0];
        const to = currentRule[1];
        return from <= year && (to >= year || (from === year && to === "only") || to === "max");
    });
    rules.push(utcTime);
    rules.sort((a, b) => {
        if (typeof a !== "number") {
            a = Number(ruleToDate(year, a, zoneOffset));
        }
        if (typeof b !== "number") {
            b = Number(ruleToDate(year, b, zoneOffset));
        }
        return a - b;
    });
    const rule = rules[rules.indexOf(utcTime) - 1] || rules[rules.length - 1];
    return isNaN(rule) ? rule : null;
};
