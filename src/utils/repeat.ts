export const repeat = <T>(n: number) => (x: () => T) => {
    const res: T[] = [];
    for (let i = 0; i < n; i++) {
        res.push(x());
    }
    return res;
};
