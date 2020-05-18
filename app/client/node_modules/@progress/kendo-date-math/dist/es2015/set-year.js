import { addMonths } from './add-months';
import { createDate } from './create-date';
import { lastDayOfMonth } from './last-day-of-month';
/**
 * @hidden
 */
export const setYear = (value, year) => {
    const month = value.getMonth();
    const candidate = createDate(year, month, value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
    return candidate.getMonth() === month ? candidate : lastDayOfMonth(addMonths(candidate, -1));
};
