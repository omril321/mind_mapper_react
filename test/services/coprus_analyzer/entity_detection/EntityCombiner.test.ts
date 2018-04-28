const MINIMUM_OCC_FOR_TEST = 2;
jest.setMock("~/conf/config", {default: {minimum_occurrences_for_combining_entities: MINIMUM_OCC_FOR_TEST}});

import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import {areEntitiesCombinable, combineEntities} from "~/services/corpus_analyzer/entity_detection/EntityCombiner";
import BagOfWords from "../../../../src/dto/BagOfWords";

describe("EntityCombiner", () => {
    describe("areEntitiesCombinable", () => {
        it("should return true when both entities have enough occurrences and are not containing each other", () => {
            const e1 = new EntityOccurrences(new BagOfWords("word1", "word2"), [new SearchQueryString(""), new SearchQueryString("")]);
            const e2 = new EntityOccurrences(new BagOfWords("word100", "word200"), [new SearchQueryString(""), new SearchQueryString("")]);
            const expected = true;

            const result = areEntitiesCombinable(e1, e2);

            expect(result).toBe(expected);
        });

        it("should return false when first entity does not have enough occurrences and are not containing each other", () => {
            const e1 = new EntityOccurrences(new BagOfWords("word1", "word2"), [new SearchQueryString("")]);
            const e2 = new EntityOccurrences(new BagOfWords("word100", "word200"), [new SearchQueryString(""), new SearchQueryString("")]);
            const expected = false;

            const result = areEntitiesCombinable(e1, e2);

            expect(result).toBe(expected);
        });

        it("should return false when second entity does not have enough occurrences and are not containing each other", () => {
            const e1 = new EntityOccurrences(new BagOfWords("word1", "word2"), [new SearchQueryString(""), new SearchQueryString("")]);
            const e2 = new EntityOccurrences(new BagOfWords("word100", "word200"), [new SearchQueryString("")]);
            const expected = false;

            const result = areEntitiesCombinable(e1, e2);

            expect(result).toBe(expected);
        });

        it("should return false both entities have enough occurrences, but first is containing the second", () => {
            const e1 = new EntityOccurrences(new BagOfWords("word1", "word2"), [new SearchQueryString(""), new SearchQueryString("")]);
            const e2 = new EntityOccurrences(new BagOfWords("word1"), [new SearchQueryString(""), new SearchQueryString("")]);
            const expected = false;

            const result = areEntitiesCombinable(e1, e2);

            expect(result).toBe(expected);
        });

        it("should return false both entities have enough occurrences, but second is containing the first", () => {
            const e1 = new EntityOccurrences(new BagOfWords("word1"), [new SearchQueryString(""), new SearchQueryString("")]);
            const e2 = new EntityOccurrences(new BagOfWords("word1", "word2"), [new SearchQueryString(""), new SearchQueryString("")]);
            const expected = false;

            const result = areEntitiesCombinable(e1, e2);

            expect(result).toBe(expected);
        });
    });

    describe("combineEntities", () => {
        it("should return an entity without occurrences when given entities have no occurrences which contains the combined entity completely", () => {
            const entity1 = new EntityOccurrences(new BagOfWords("word1"), [new SearchQueryString("word1 some other words")]);
            const entity2 = new EntityOccurrences(new BagOfWords("word2"), [new SearchQueryString("word2 but that is it")]);
            const expected = new EntityOccurrences(new BagOfWords("word1", "word2"), []);

            const result = combineEntities(entity1, entity2);

            expect(result).toEqual(expected);
        });

        it("should return combined entity with occurrences that appear in both given entities", () => {
            const queryWithBoth = new SearchQueryString("word1 and word2");
            const entity1 = new EntityOccurrences(new BagOfWords("word1"), [queryWithBoth]);
            const entity2 = new EntityOccurrences(new BagOfWords("word2"), [new SearchQueryString("word2 but that is it")]);
            const expected = new EntityOccurrences(new BagOfWords("word1", "word2"), [queryWithBoth]);

            const result = combineEntities(entity1, entity2);

            expect(result).toEqual(expected);
        });

        it("should return combined entity with occurrences that appear in both given entities, without repetitions", () => {
            const queryWithBoth = new SearchQueryString("word1 and word2");
            const entity1 = new EntityOccurrences(new BagOfWords("word1"), [queryWithBoth, new SearchQueryString("word1 only")]);
            const entity2 = new EntityOccurrences(new BagOfWords("word2"), [queryWithBoth, new SearchQueryString("word2 but that is it")]);
            const expected = new EntityOccurrences(new BagOfWords("word1", "word2"), [queryWithBoth]);

            const result = combineEntities(entity1, entity2);

            expect(result).toEqual(expected);
        });
    });
});
