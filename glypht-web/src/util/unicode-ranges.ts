const MAX_SUBSTRING_LENGTH = 'u+000000-u+000000'.length;

export const parseUnicodeRanges = (ranges: string): (readonly [number, number] | number)[] | null => {
    const pointsOrRanges = ranges.trim().split(/(?:,\s*)|(?:\s+)/);
    if (pointsOrRanges.length === 1 && pointsOrRanges[0].length === 0) {
        return [];
    }
    const parsed = [];
    for (const pointOrRange of pointsOrRanges) {
        if (pointOrRange.length > MAX_SUBSTRING_LENGTH) return null;
        if (pointOrRange.length === 0) continue;
        const matchResult = /^(?:u\+)?([0-9a-f]{1,6})(?:-(?:u\+)?([0-9a-f]{1,6}))?$/i.exec(pointOrRange);
        if (!matchResult) return null;

        const firstPoint = parseInt(matchResult[1], 16);
        if (!Number.isFinite(firstPoint)) return null;
        if (typeof matchResult[2] === 'string') {
            const secondPoint = parseInt(matchResult[2], 16);
            if (!Number.isFinite(secondPoint)) return null;
            parsed.push([firstPoint, secondPoint] as const);
        } else {
            parsed.push(firstPoint);
        }
    }

    return parsed;
};

export const parseRanges = (ranges: string): (readonly [number, number] | number)[] | null => {
    const pointsOrRanges = ranges.trim().split(/,\s*/);
    if (pointsOrRanges.length === 1 && pointsOrRanges[0].length === 0) {
        return [];
    }
    const parsed = [];
    for (const pointOrRange of pointsOrRanges) {
        if (pointOrRange.length === 0) continue;
        const matchResult = /(-?\d+(?:\.\d+)?)(?:-(-?\d+(?:\.\d+)?))?/.exec(pointOrRange);
        if (!matchResult) return null;

        const firstPoint = Number(matchResult[1]);
        if (!Number.isFinite(firstPoint)) return null;
        if (typeof matchResult[2] === 'string') {
            const secondPoint = Number(matchResult[2]);
            if (!Number.isFinite(secondPoint)) return null;
            parsed.push([firstPoint, secondPoint] as const);
        } else {
            parsed.push(firstPoint);
        }
    }

    return parsed;
};

export const formatUnicodeRanges = (ranges: (number | readonly [number, number])[]): string[] => {
    const result = [];
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (typeof range === 'number') {
            result.push(`U+${range.toString(16)}`);
        } else {
            result.push(`U+${range[0].toString(16)}-${range[1].toString(16)}`);
        }
    }
    return result;
};
