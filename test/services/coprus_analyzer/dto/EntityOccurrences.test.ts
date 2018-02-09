import BagOfWords from "../../../../src/dto/BagOfWords";
import {EntityOccurrences} from "../../../../src/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "../../../../src/services/corpus_analyzer/dto/SearchQueryString";

describe("EntityOccurrences", () => {
    describe("calculateProbabilityGivenOtherEntity", () => {
        it("should return 0 for entity which has nothing in common", () => {
            const firstEntity = new EntityOccurrences(new BagOfWords("word1"), [new SearchQueryString("word1 sentences")]);
            const secondEntity = new EntityOccurrences(new BagOfWords("word2"), [new SearchQueryString("word2 only")]);
            const expected = 0;

            const result = firstEntity.calculateProbabilityGivenOtherEntity(secondEntity);

            expect(result).toBe(expected);
        });

        it("should return 1 for entity which always appear together with tested entity", () => {
            const firstEntity = new EntityOccurrences(new BagOfWords("word1"), [
                new SearchQueryString("word1 sentence1"),
                new SearchQueryString("word1 sentence2"),
            ]);
            const secondEntity = new EntityOccurrences(new BagOfWords("word2"), [
                new SearchQueryString("word2 with word1"),
                new SearchQueryString("word2 together with word1"),
                new SearchQueryString("word2 along word1"),
            ]);
            const expected = 1;

            const result = firstEntity.calculateProbabilityGivenOtherEntity(secondEntity);

            expect(result).toBe(expected);
        });

        it("should return 0.5 for entity which appears half the times with the tested entity", () => {
            const firstEntity = new EntityOccurrences(new BagOfWords("word1"), [
                new SearchQueryString("word1 sentence1"),
                new SearchQueryString("word1 sentence2"),
            ]);
            const secondEntity = new EntityOccurrences(new BagOfWords("word2"), [
                new SearchQueryString("word2 with word1"),
                new SearchQueryString("word2 alone"),
            ]);
            const expected = 0.5;

            const result = firstEntity.calculateProbabilityGivenOtherEntity(secondEntity);

            expect(result).toBe(expected);
        });
    });
});
