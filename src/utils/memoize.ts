export function memoize<T, U extends ((...args: any[]) => T)>(fn: U): U {
    const map = new Map<string, T>();
    return ((...args: any[]) => {
        const hash = JSON.stringify(args);
        if (!map.has(hash)) {
            // console.log(`${fn.name}(${hash}) ... Miss!`);
            map.set(hash, fn(...args));
        } else {
            // console.log(`${fn.name}(${hash}) ... Hit!`);
        }
        const result = map.get(hash);
        // console.log(`${fn.name}(${hash}) = ${JSON.stringify(result)}`);
        return result;
    }) as any;
}
