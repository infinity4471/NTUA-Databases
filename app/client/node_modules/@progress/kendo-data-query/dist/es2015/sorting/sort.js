const merge = (data, left, middle, right, compare) => {
    let leftLength = middle - left;
    let rightLength = right - middle;
    const temp = [];
    for (let idx = 0; idx < leftLength; idx++) {
        temp.push(data[left + idx]);
    }
    let cursor1 = 0;
    let cursor2 = middle;
    let dest = left;
    do {
        if (compare(data[cursor2], temp[cursor1]) < 0) {
            data[dest++] = data[cursor2++];
            rightLength--;
        }
        else {
            data[dest++] = temp[cursor1++];
            leftLength--;
        }
    } while (rightLength > 0 && leftLength > 0);
    while (leftLength) {
        data[dest++] = temp[cursor1++];
        leftLength--;
    }
    while (rightLength) {
        data[dest++] = data[cursor2++];
        rightLength--;
    }
};
/**
 * @hidden
 */
export const sort = (data, start, end, compare) => {
    if (end - start < 2) {
        return;
    }
    const mid = (start + end) >>> 1; // tslint:disable-line:no-bitwise
    sort(data, start, mid, compare);
    sort(data, mid, end, compare);
    merge(data, start, mid, end, compare);
};
