import { Direction } from "./direction.enum";
import { adjustDST } from "./adjust-dst";
import { cloneDate } from './clone-date';
/**
 * @hidden
 *
 * A function which returns the next or previous date for a specific week day. For example, `Day.Monday`.
 *
 * @param date - The date to calculate from.
 * @param weekDay - The `Day` enum specifying the desired week day.
 * @param direction - The `Direction` enum specifying the calculation direction.
 * @returns - A `Date` instance.
 *
 * @example
 * ```ts-no-run
 * dayOfWeek(new Date(2016, 0, 1), Day.Wednesday, Direction.Forward); // 2016-01-06, Wednesday
 * dayOfWeek(new Date(2016, 0, 1), Day.Wednesday, Direction.Backward); // 2015-12-30, Wednesday
 * ```
 */
export const dayOfWeek = (date, weekDay, direction = Direction.Forward) => {
    const newDate = cloneDate(date);
    const newDay = ((weekDay - newDate.getDay()) + (7 * direction)) % 7;
    newDate.setDate(newDate.getDate() + newDay);
    return adjustDST(newDate, date.getHours());
};
