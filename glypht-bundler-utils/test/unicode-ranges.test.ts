import {test, expect, describe} from 'vitest';
import {formatUnicodeRanges, parseUnicodeRanges, parseRanges} from '../src/unicode-ranges.js';

describe('parseUnicodeRanges', () => {
    test('parses simple ranges', () => {
        const ranges = parseUnicodeRanges('U+0020-007F');
        expect(ranges).toEqual([[0x20, 0x7F]]);
    });

    test('parses single code points', () => {
        const ranges = parseUnicodeRanges('U+0041');
        expect(ranges).toEqual([0x41]);
    });

    test('parses multiple ranges separated by commas', () => {
        const ranges = parseUnicodeRanges('U+0020-007F, U+00A0-00FF');
        expect(ranges).toEqual([[0x20, 0x7F], [0xA0, 0xFF]]);
    });

    test('parses multiple ranges separated by spaces', () => {
        const ranges = parseUnicodeRanges('U+0020-007F U+00A0-00FF');
        expect(ranges).toEqual([[0x20, 0x7F], [0xA0, 0xFF]]);
    });

    test('parses mixed ranges and single points', () => {
        const ranges = parseUnicodeRanges('U+0041, U+0020-007F, U+00FF');
        expect(ranges).toEqual([0x41, [0x20, 0x7F], 0xFF]);
    });

    test('handles case insensitive input', () => {
        const ranges = parseUnicodeRanges('u+0020-007f');
        expect(ranges).toEqual([[0x20, 0x7F]]);
    });

    test('handles mixed case input', () => {
        const ranges = parseUnicodeRanges('U+a0-Af u+B0-bf');
        expect(ranges).toEqual([[0xA0, 0xAF], [0xB0, 0xBF]]);
    });

    test('accepts ranges without U+ prefix', () => {
        const ranges = parseUnicodeRanges('0020-007F');
        expect(ranges).toEqual([[0x20, 0x7F]]);
    });

    test('accepts single points without U+ prefix', () => {
        const ranges = parseUnicodeRanges('41');
        expect(ranges).toEqual([0x41]);
    });

    test('handles mixed U+ prefix usage', () => {
        const ranges = parseUnicodeRanges('U+0020-7F, A0-U+FF');
        expect(ranges).toEqual([[0x20, 0x7F], [0xA0, 0xFF]]);
    });

    test('parses wildcard ranges with single question mark', () => {
        const ranges = parseUnicodeRanges('U+00?');
        expect(ranges).toEqual([[0x000, 0x00F]]);
    });

    test('parses wildcard ranges with multiple question marks', () => {
        const ranges = parseUnicodeRanges('U+1??');
        expect(ranges).toEqual([[0x100, 0x1FF]]);
    });

    test('parses wildcard ranges with full 6-character pattern', () => {
        const ranges = parseUnicodeRanges('U+10????');
        expect(ranges).toEqual([[0x100000, 0x10FFFF]]);
    });

    test('parses wildcard with hex prefix', () => {
        const ranges = parseUnicodeRanges('U+A?');
        expect(ranges).toEqual([[0xA0, 0xAF]]);
    });

    test('handles 6-digit hex values', () => {
        const ranges = parseUnicodeRanges('U+100000-10FFFF');
        expect(ranges).toEqual([[0x100000, 0x10FFFF]]);
    });

    test('handles values beyond maximum Unicode code point', () => {
        // parseUnicodeRanges doesn't clamp regular hex values, only wildcards
        const ranges = parseUnicodeRanges('U+FFFFFF');
        expect(ranges).toEqual([0xFFFFFF]);
    });

    test('handles wildcard ranges that do not exceed maximum', () => {
        const ranges = parseUnicodeRanges('U+F????');
        expect(ranges).toEqual([[0xF0000, 0xFFFFF]]);
    });

    test('handles empty string', () => {
        const ranges = parseUnicodeRanges('');
        expect(ranges).toEqual([]);
    });

    test('handles whitespace-only string', () => {
        const ranges = parseUnicodeRanges('   ');
        expect(ranges).toEqual([]);
    });

    test('ignores empty segments in comma-separated list', () => {
        const ranges = parseUnicodeRanges('U+41, , U+42');
        expect(ranges).toEqual([0x41, 0x42]);
    });

    test('ignores empty segments in space-separated list', () => {
        const ranges = parseUnicodeRanges('U+41   U+42');
        expect(ranges).toEqual([0x41, 0x42]);
    });

    test('handles comma and space separation together', () => {
        const ranges = parseUnicodeRanges('U+41, U+42 U+43, U+44');
        expect(ranges).toEqual([0x41, 0x42, 0x43, 0x44]);
    });

    test('returns null for invalid hex characters', () => {
        const ranges = parseUnicodeRanges('U+00GH');
        expect(ranges).toBeNull();
    });

    test('returns null for invalid range syntax', () => {
        const ranges = parseUnicodeRanges('U+00-');
        expect(ranges).toBeNull();
    });

    test('returns null for hex values too long', () => {
        const ranges = parseUnicodeRanges('U+1234567');
        expect(ranges).toBeNull();
    });

    test('returns null for wildcard pattern too long', () => {
        const ranges = parseUnicodeRanges('U+123456?');
        expect(ranges).toBeNull();
    });

    test('returns null for wildcard with too many question marks', () => {
        const ranges = parseUnicodeRanges('U+??????');
        expect(ranges).toBeNull();
    });

    test('returns null for strings that are too long', () => {
        const ranges = parseUnicodeRanges('U+000000-U+000000X');
        expect(ranges).toBeNull();
    });

    test('returns null for malformed input', () => {
        const ranges = parseUnicodeRanges('invalid');
        expect(ranges).toBeNull();
    });

    test('returns null when one range in list is invalid', () => {
        const ranges = parseUnicodeRanges('U+41, invalid, U+42');
        expect(ranges).toBeNull();
    });

    test('handles minimum values (0)', () => {
        const ranges = parseUnicodeRanges('U+0');
        expect(ranges).toEqual([0]);
    });

    test('handles leading zeros', () => {
        const ranges = parseUnicodeRanges('U+0000041');
        expect(ranges).toBeNull(); // Too many digits
    });

    test('handles ranges with same start and end', () => {
        const ranges = parseUnicodeRanges('U+41-41');
        expect(ranges).toEqual([[0x41, 0x41]]);
    });

    test('parses ranges where end is before start (implementation allows this)', () => {
        const ranges = parseUnicodeRanges('U+7F-20');
        expect(ranges).toEqual([[0x7F, 0x20]]);
    });

    test('clamps wildcard ranges that exceed maximum Unicode code point', () => {
        const ranges = parseUnicodeRanges('U+10????');
        expect(ranges).toEqual([[0x100000, 0x10FFFF]]);
    });

    test('clamps wildcard start and end that exceed maximum', () => {
        // Without clamping, this would be [0x1F0000, 0x1FFFFF] but both get clamped to 0x10FFFF
        const ranges = parseUnicodeRanges('U+1F????');
        expect(ranges).toEqual([[0x10FFFF, 0x10FFFF]]);
    });

    test('handles single character wildcards', () => {
        const ranges = parseUnicodeRanges('U+?');
        expect(ranges).toEqual([[0x0, 0xF]]);
    });

    test('handles mixed wildcard patterns', () => {
        const ranges = parseUnicodeRanges('U+1?, U+A??');
        expect(ranges).toEqual([[0x10, 0x1F], [0xA00, 0xAFF]]);
    });

    test('returns null for incomplete range syntax', () => {
        const ranges = parseUnicodeRanges('U+41-');
        expect(ranges).toBeNull();
    });

    test('returns null for range with invalid second part', () => {
        const ranges = parseUnicodeRanges('U+41-GH');
        expect(ranges).toBeNull();
    });

    test('handles space and comma combinations with trailing spaces', () => {
        const ranges = parseUnicodeRanges('U+41, U+42   , U+43');
        expect(ranges).toEqual([0x41, 0x42, 0x43]);
    });

    test('handles complex mixed input', () => {
        const ranges = parseUnicodeRanges('U+41, 42-45, U+1??, u+200-u+2ff, 300');
        expect(ranges).toEqual([0x41, [0x42, 0x45], [0x100, 0x1FF], [0x200, 0x2FF], 0x300]);
    });
});

describe('parseRanges', () => {
    test('parses simple decimal ranges', () => {
        const ranges = parseRanges('100-200');
        expect(ranges).toEqual([[100, 200]]);
    });

    test('parses single decimal values', () => {
        const ranges = parseRanges('42');
        expect(ranges).toEqual([42]);
    });

    test('parses multiple ranges separated by commas', () => {
        const ranges = parseRanges('1-10, 20-30');
        expect(ranges).toEqual([[1, 10], [20, 30]]);
    });

    test('parses mixed ranges and single values', () => {
        const ranges = parseRanges('1, 10-20, 30');
        expect(ranges).toEqual([1, [10, 20], 30]);
    });

    test('handles decimal numbers', () => {
        const ranges = parseRanges('1.5-2.5');
        expect(ranges).toEqual([[1.5, 2.5]]);
    });

    test('handles negative numbers', () => {
        const ranges = parseRanges('-10-10');
        expect(ranges).toEqual([[-10, 10]]);
    });

    test('handles negative decimal numbers', () => {
        const ranges = parseRanges('-1.5--0.5');
        expect(ranges).toEqual([[-1.5, -0.5]]);
    });

    test('handles single negative value', () => {
        const ranges = parseRanges('-42');
        expect(ranges).toEqual([-42]);
    });

    test('handles zero', () => {
        const ranges = parseRanges('0');
        expect(ranges).toEqual([0]);
    });

    test('handles empty string', () => {
        const ranges = parseRanges('');
        expect(ranges).toEqual([]);
    });

    test('handles whitespace-only string', () => {
        const ranges = parseRanges('   ');
        expect(ranges).toEqual([]);
    });

    test('ignores empty segments', () => {
        const ranges = parseRanges('1, , 2');
        expect(ranges).toEqual([1, 2]);
    });

    test('handles ranges with same start and end', () => {
        const ranges = parseRanges('5-5');
        expect(ranges).toEqual([[5, 5]]);
    });

    test('handles ranges where end is before start', () => {
        const ranges = parseRanges('10-5');
        expect(ranges).toEqual([[10, 5]]);
    });

    test('parses partial matches for invalid decimal syntax', () => {
        // The regex matches the valid part "1.2" from "1.2.3"
        const ranges = parseRanges('1.2.3');
        expect(ranges).toEqual([1.2]);
    });

    test('parses partial matches for scientific notation', () => {
        // The regex matches just "1" from "1e5"
        const ranges = parseRanges('1e5');
        expect(ranges).toEqual([1]);
    });

    test('returns null for completely invalid input', () => {
        const ranges = parseRanges('abc');
        expect(ranges).toBeNull();
    });

    test('returns null when one range in list is invalid', () => {
        const ranges = parseRanges('1, invalid, 2');
        expect(ranges).toBeNull();
    });

    test('parses incomplete ranges as single values', () => {
        // The regex matches just "1" from "1-" since the range part is optional
        const ranges = parseRanges('1-');
        expect(ranges).toEqual([1]);
    });

    test('handles very large numbers', () => {
        const ranges = parseRanges('999999999');
        expect(ranges).toEqual([999999999]);
    });

    test('handles infinity (returns null)', () => {
        const ranges = parseRanges('Infinity');
        expect(ranges).toBeNull();
    });

    test('handles very small decimals', () => {
        const ranges = parseRanges('0.001-0.999');
        expect(ranges).toEqual([[0.001, 0.999]]);
    });

    test('handles negative range with decimals', () => {
        const ranges = parseRanges('-1.5--0.1');
        expect(ranges).toEqual([[-1.5, -0.1]]);
    });
});

describe('formatUnicodeRanges', () => {
    test('formats simple ranges', () => {
        const formatted = formatUnicodeRanges([[0x20, 0x7F]]);
        expect(formatted).toEqual(['U+20-7f']);
    });

    test('formats single code points', () => {
        const formatted = formatUnicodeRanges([0x41]);
        expect(formatted).toEqual(['U+41']);
    });

    test('formats multiple ranges', () => {
        const formatted = formatUnicodeRanges([[0x20, 0x7F], [0xA0, 0xFF]]);
        expect(formatted).toEqual(['U+20-7f', 'U+a0-ff']);
    });

    test('formats mixed ranges and single points', () => {
        const formatted = formatUnicodeRanges([0x41, [0x20, 0x7F], 0xFF]);
        expect(formatted).toEqual(['U+41', 'U+20-7f', 'U+ff']);
    });

    test('formats zero values', () => {
        const formatted = formatUnicodeRanges([0]);
        expect(formatted).toEqual(['U+0']);
    });

    test('formats large hex values', () => {
        const formatted = formatUnicodeRanges([[0x10000, 0x10FFFF]]);
        expect(formatted).toEqual(['U+10000-10ffff']);
    });

    test('formats ranges with same start and end', () => {
        const formatted = formatUnicodeRanges([[0x41, 0x41]]);
        expect(formatted).toEqual(['U+41']);
    });

    test('handles empty array', () => {
        const formatted = formatUnicodeRanges([]);
        expect(formatted).toEqual([]);
    });
});

describe('Edge cases and integration tests', () => {
    test('parseUnicodeRanges roundtrip with formatUnicodeRanges', () => {
        const input = 'U+20-7F, U+A0, U+1??';
        const parsed = parseUnicodeRanges(input);
        const formatted = formatUnicodeRanges(parsed!);
        const reparsed = parseUnicodeRanges(formatted.join(', '));
        expect(reparsed).toEqual(parsed);
    });
});
