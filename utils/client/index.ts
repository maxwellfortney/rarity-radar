export function rainbowGradient(n: number, min: number, max: number) {
    return `linear-gradient(to bottom right, ${rainbowColor(
        n,
        min,
        max
    )}, ${rainbowColor(n * 1.5, min, max)})`;
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
