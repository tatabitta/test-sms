export const TextSms = (original: string, maxSize: number) => {
    const blocks = [];
    const res = [];
    const originalMaxSize = maxSize;
    const items = original.split(" ");
    maxSize = maxSize - 4;

    for (let k = 0; k < items.length; k++) {
        let str = ''
        str += items[k];
        while (true) {
            const next = k + 1;
            if ( !(next < items.length && str.length + items[next].length + 1 < maxSize) ) {
                break;
            }
            str = `${str} ${items[next]}`;
            k++;
        }
        blocks.push(str);
    }

    if ( blocks.length === 1 ) {
        return [blocks[0]];
    }

    for (let n = 0; n < blocks.length; n++) {
        const item = `${blocks[n]} ${n + 1}/${blocks.length}`;
        if ( item.length > originalMaxSize ) {
            throw new Error("limit overflow " + item);
        }
        res.push(item);
    }
    return res;
}