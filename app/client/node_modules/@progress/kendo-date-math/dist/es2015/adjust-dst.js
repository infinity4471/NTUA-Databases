import { cloneDate } from './clone-date';
/**
 * @hidden
 */
export const adjustDST = (date, hour) => {
    const newDate = cloneDate(date);
    if (hour === 0 && newDate.getHours() === 23) {
        newDate.setHours(newDate.getHours() + 2);
    }
    return newDate;
};
