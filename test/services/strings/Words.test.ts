import {BagOfWords, countKeywords} from "../../../src/services/strings/Words";

describe('Words', () => {
    describe('Count keywords', () => {
        it('should return an empty keywords when analyzing an empty array', () => {
            const result = countKeywords([]);

            expect(result).toEqual({});
        });

        it('should return an empty keywords when analyzing only empty bags', () => {
            const result = countKeywords([[], [], []]);

            expect(result).toEqual({});
        });

        it('should return a word count of 1 when analyzing a single bag of words with one word', () => {
            const bag = ['test'];

            const result = countKeywords([bag]);

            expect(result).toEqual({'test': 1});
        });

        it('should return a word count of 2 when analyzing a two bag of words with the same word', () => {
            const bag: BagOfWords = ['test'];

            const result = countKeywords([bag, bag]);

            expect(result).toEqual({'test': 2});
        });

        it('should return a word count of 2 when analyzing a two bag of words with the the same word twice and another word', () => {
            const bag1: BagOfWords = ['common', 'unique1', 'unique2'];
            const bag2: BagOfWords = ['common'];

            const result = countKeywords([bag1, bag2]);

            expect(result).toEqual({
                'common': 2,
                'unique1': 1,
                'unique2': 1,
            });
        });
    })
});