export const TextSms = (original: string, maxSize: number) => {
    let blocks: string[];
    const res = [];
    const originalMaxSize = maxSize;
    const items = original.split(" ");
    maxSize = maxSize - 4;
    const breakpoints = [
        9, 99, 999
    ];

    const recalculate = (decrement: number) => {
        const innerBlocks: string[] = [];
        let realMaxSize = maxSize - decrement;
        let breakpointIdx = 0;

        for (let k = 0; k < items.length; k++) {
            if ( innerBlocks.length > breakpoints[breakpointIdx] ) {
                realMaxSize -= 1;
                breakpointIdx++;
            }

            let str = ''
            str += items[k];
            while (k + 1 < items.length && str.length + items[k + 1].length + 1 <= realMaxSize) {
                str = `${str} ${items[k + 1]}`;
                k++;
            }
            innerBlocks.push(str);

            if ( innerBlocks.length > 9999 ) {
                throw new Error("result array too large");
            }

            if ( innerBlocks.length > breakpoints[decrement]) {
                return recalculate(decrement + 1);
            }
        }

        return innerBlocks;
    }

    blocks = recalculate(0);

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