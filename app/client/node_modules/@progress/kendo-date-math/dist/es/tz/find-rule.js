import { timezones } from './timezones';
import { ruleToDate } from './rule-to-date';
var CURRENT_UTC_TIME = (new Date()).getTime();
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
export var findRule = function (zoneRule, utcTime, zoneOffset) {
    if (utcTime === void 0) { utcTime = CURRENT_UTC_TIME; }
    if (zoneOffset === void 0) { zoneOffset = 0; }
    var rules = timezones.rules[zoneRule];
    if (!rules) {
        var time = zoneRule.split(":");
        var offset = 0;
        if (time.length > 1) {
            offset = time[0] * 60 + Number(time[1]);
        }
        return [-1000000, 'max', '-', 'Jan', 1, [0, 0, 0], offset, '-'];
    }
    var year = new Date(utcTime).getUTCFullYear();
    rules = rules.filter(function (currentRule) {
        var from = currentRule[0];
        var to = currentRule[1];
        return from <= year && (to >= year || (from === year && to === "only") || to === "max");
    });
    rules.push(utcTime);
    rules.sort(function (a, b) {
        if (typeof a !== "number") {
            a = Number(ruleToDate(year, a, zoneOffset));
        }
        if (typeof b !== "number") {
            b = Number(ruleToDate(year, b, zoneOffset));
        }
        return a - b;
    });
    var rule = rules[rules.indexOf(utcTime) - 1] || rules[rules.length - 1];
    return isNaN(rule) ? rule : null;
};
