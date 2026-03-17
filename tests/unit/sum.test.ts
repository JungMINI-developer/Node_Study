// tests/unit/sum.test.ts
import { sum } from '../../src/utils/sum.js';

describe('sum', () => {
    it('두 수를 더한다', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('음수를 더한다', () => {
        expect(sum(-1, -2)).toBe(-3);
    });

    it('0을 더한다', () => {
        expect(sum(5, 0)).toBe(5);
    });
});
