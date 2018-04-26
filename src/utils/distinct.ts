export const distinct = <T>(arr: T[]): T[] => {
    const set: any = {};
    arr.forEach(x => {
        set[JSON.stringify(x)] = true;
    });
    return Object.keys(set).map(k => JSON.parse(k));
};
