var MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
var DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
var MS_PER_MINUTE = 60000;
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
export var ruleToDate = function (year, rule, zoneOffset) {
    var month = rule[3];
    var on = rule[4];
    var time = rule[5];
    var date;
    var ruleOffset = time[3] === 'u' ? -zoneOffset * MS_PER_MINUTE : 0;
    if (!isNaN(on)) {
        date = new Date(Date.UTC(year, MONTHS[month], on, time[0], time[1], time[2]) + ruleOffset);
    }
    else if (on.indexOf('last') === 0) {
        date = new Date(Date.UTC(year, MONTHS[month] + 1, 1, time[0] - 24, time[1], time[2]) + ruleOffset);
        var targetDay = DAYS[on.substr(4, 3)];
        var ourDay = date.getUTCDay();
        date.setUTCDate(date.getUTCDate() + targetDay - ourDay - (targetDay > ourDay ? 7 : 0));
    }
    else if (on.indexOf('>=') >= 0) {
        date = new Date(Date.UTC(year, MONTHS[month], on.substr(5), time[0], time[1], time[2], 0) + ruleOffset);
        var targetDay = DAYS[on.substr(0, 3)];
        var ourDay = date.getUTCDay();
        date.setUTCDate(date.getUTCDate() + targetDay - ourDay + (targetDay < ourDay ? 7 : 0));
    }
    return date;
};
