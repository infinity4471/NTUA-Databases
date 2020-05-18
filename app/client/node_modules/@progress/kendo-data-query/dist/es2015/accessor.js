import { isPresent } from './utils';
const getterCache = {};
const FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
// tslint:disable-next-line:no-string-literal
getterCache['undefined'] = obj => obj;
/**
 * @hidden
 */
export const getter = (field, safe) => {
    const key = field + safe;
    if (getterCache[key]) {
        return getterCache[key];
    }
    const fields = [];
    field.replace(FIELD_REGEX, (_, index, indexAccessor, field) => {
        fields.push(isPresent(index) ? index : (indexAccessor || field));
        return undefined;
    });
    getterCache[key] = obj => {
        let result = obj;
        for (let idx = 0; idx < fields.length; idx++) {
            result = result[fields[idx]];
            if (!isPresent(result) && safe) {
                return result;
            }
        }
        return result;
    };
    return getterCache[key];
};
