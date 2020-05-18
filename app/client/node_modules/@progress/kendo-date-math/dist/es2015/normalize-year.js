import { setYear } from './set-year';
/**
 * @hidden
 */
export const normalizeYear = (value, year) => (setYear(value, year(value.getFullYear())));
