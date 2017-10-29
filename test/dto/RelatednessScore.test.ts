import {RelatednessScore} from "../../src/dto/RelatednessScore";

describe('RelatednessScore', () => {
    it('should return the given value when it is valid', () => {
        const score = new RelatednessScore(0.5);

        expect(score.value).toBe(0.5);
    });

    it('should throw error on a too high score', () => {
        const shouldThrow = () => new RelatednessScore(1.01);

        expect(shouldThrow).toThrow();
    });


    it('should throw error on a too low score', () => {
        const shouldThrow = () => new RelatednessScore(-0.01);

        expect(shouldThrow).toThrow();
    });
});