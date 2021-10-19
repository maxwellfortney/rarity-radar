export function rainbowGradient(n: number, min: number, max: number) {
    return `linear-gradient(to bottom right, ${rainbowColor(
        n,
        min,
        max
    )}, ${rainbowColor(n * 1.33, min, max)})`;
}

export function rainbowColor(n: number, min: number, max: number) {
    const maxHSL = 110;

    return "hsl(" + mapToRange(n, min, max, maxHSL, 0) + ",100%,50%)";
}

function mapToRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];

function parseBaseURL(id1: string, url1: string, id2: string, url2: string) {
    let map1 = url1
        .split(id1)
        .map((x) => [x, id1])
        .reduce((x, y) => x.concat(y))
        .slice(0, -1);
    let map2 = url2
        .split(id2)
        .map((x) => [x, id2])
        .reduce((x, y) => x.concat(y))
        .slice(0, -1);
    let map_ = [];
    console.assert(map1.length == map2.length);
    for (let i = 0; i < map1.length; i++) {
        if (map1[i] == map2[i]) {
            map_.push(map1[i]);
        } else if (map1[i] == id1 && map2[i] == id2) {
            map_.push(0);
        } else {
            console.assert(false);
        }
    }
    let firstHalf = (map_ as [string])
        .slice(0, map_.indexOf(0))
        .reduce((x, y) => x.concat(y));
    let secondHalf = (map_ as [string])
        .slice(map_.indexOf(0) + 1, map_.length)
        .reduce((x, y) => x.concat(y));
    return firstHalf + "(URL)" + secondHalf;
}
