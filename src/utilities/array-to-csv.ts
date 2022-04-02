export function arrayToCsv(array: string[][], delimiter: string = ','): string {
    return array.map((item) => {
        return item.map((value) => {
            return `"${value}"`;
        }).join(delimiter);
    }).join('\n');
}