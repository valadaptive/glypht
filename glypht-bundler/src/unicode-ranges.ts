const MAX_SUBSTRING_LENGTH = 'u+000000-u+000000'.length;

/**
 * Parse a series of Unicode code point ranges.
 *
 * Parsing is rather lenient. The parser accepts single code points (e.g. U+0041), ranges (e.g. U+0041-5A), and
 * wildcards (e.g. U+09??). They can be separated by spaces, commas, or both. The leading 'U+' can be present or absent,
 * and it's all case-insensitive/
 * @param ranges The string of Unicode ranges to parse.
 * @returns An array of numbers, or tuples of numbers for ranges. If the input string contains invalid syntax, returns
 * null.
 */
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
        if (!matchResult) {
            const wildcardResult = /^(?:u\+)?([\da-f]{0,6})(\?{1,5})$/i.exec(pointOrRange);
            if (!wildcardResult) return null;
            const [, hexDigits, questionMarks] = wildcardResult;
            if (hexDigits.length + questionMarks.length > 6) return null;
            const rangeStartHex = hexDigits + '0'.repeat(questionMarks.length);
            const rangeEndHex = hexDigits + 'f'.repeat(questionMarks.length);
            const rangeStart = Math.min(parseInt(rangeStartHex, 16), 0x10ffff);
            const rangeEnd = Math.min(parseInt(rangeEndHex, 16), 0x10ffff);
            if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd)) return null;
            parsed.push([rangeStart, rangeEnd] as const);
            continue;
        }

        const rangeStart = parseInt(matchResult[1], 16);
        if (!Number.isFinite(rangeStart)) return null;
        if (typeof matchResult[2] === 'string') {
            const rangeEnd = parseInt(matchResult[2], 16);
            if (!Number.isFinite(rangeEnd)) return null;
            parsed.push([rangeStart, rangeEnd] as const);
        } else {
            parsed.push(rangeStart);
        }
    }

    return parsed;
};

/**
 * Parse a series non-Unicode ranges or values. You can use this for parsing values to use for instanced variation axes.
 *
 * Parsing works similarly to {@link parseUnicodeRanges}--you can parse single values or ranges, separated by commas or
 * just spaces. Unlike {@link parseUnicodeRanges}, all numbers are decimal. Decimal points are accepted, but "e" syntax
 * is not.
 * @param ranges The string of ranges to parse.
 * @returns An array of numbers, or tuples of numbers for ranges. If the input string contains invalid syntax, returns
 * null.
 */
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

/**
 * Format Unicode code point ranges into the format used for the CSS `unicode-range` property.
 * @param ranges Code point ranges to format.
 * @returns An array of `U+[...]` values. Join these with commas to get the CSS. This is returned as an array so that
 * the commas and values can be syntax-highlighted separately.
 */
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
