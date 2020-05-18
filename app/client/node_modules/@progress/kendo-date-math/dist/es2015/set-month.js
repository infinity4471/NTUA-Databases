import { addMonths } from './add-months';
import { createDate } from './create-date';
import { lastDayOfMonth } from './last-day-of-month';
/**
 * @hidden
 */
export const setMonth = (value, month) => {
    const day = value.getDate();
    const candidate = createDate(value.getFullYear(), month, day, value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
    return candidate.getDate() === day ? candidate : lastDayOfMonth(addMonths(candidate, -1));
};
