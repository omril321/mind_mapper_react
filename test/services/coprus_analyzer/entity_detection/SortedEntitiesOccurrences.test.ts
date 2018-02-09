import BagOfWords from "../../../../src/dto/BagOfWords";
import SortedEntitiesOccurrences from "../../../../src/services/corpus_analyzer/entity_detection/SortedEntitiesOccurrences";
import {EntityOccurrences} from "../../../../src/services/corpus_analyzer/dto/EntityOccurrences";

let totalNum = 0;

const createMockedEntityWithOccurrencesNumber: (num: number) => EntityOccurrences = (occNum: number) => {
    const occurrences = [];
    for (let i = 0; i < occNum; ++i) {
        occurrences.push("" + (totalNum++));
    }
    return new EntityOccurrences(new BagOfWords(""), occurrences);
};

describe("SortedEntitiesOccurrences", () => {
    describe("constructor", () => {
        it("should return an empty array when given an empty array", () => {
            const input = [];
            const expected = [];

            const result = new SortedEntitiesOccurrences(input).getSortedEntities();

            expect(result).toEqual(expected);
        });

        it("should sort the given list when creating the list", () => {
            const shouldBeFirst = createMockedEntityWithOccurrencesNumber(10);
            const shouldBeSecond = createMockedEntityWithOccurrencesNumber(5);
            const shouldBeThird = createMockedEntityWithOccurrencesNumber(2);
            const shouldBeFourth = createMockedEntityWithOccurrencesNumber(2);

            const input = [shouldBeSecond, shouldBeThird, shouldBeFirst, shouldBeFourth];
            const expected = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];

            const result = new SortedEntitiesOccurrences(input).getSortedEntities();

            expect(result).toEqual(expected);
        });
    });

    describe("insertNewEntities", () => {
        it("should return a list with one item when inserting one item to an empty array", () => {
            const initialInput = [];
            const insertedItem = createMockedEntityWithOccurrencesNumber(5);
            const expected = [insertedItem];

            const sortedEntitiesOccurrences = new SortedEntitiesOccurrences(initialInput);
            sortedEntitiesOccurrences.insertNewEntities(insertedItem);

            expect(sortedEntitiesOccurrences.getSortedEntities()).toEqual(expected);
        });

        it("should return a list with the item sorted in proper place", () => {
            const occ8 = createMockedEntityWithOccurrencesNumber(8);
            const occ5 = createMockedEntityWithOccurrencesNumber(5);
            const occ3 = createMockedEntityWithOccurrencesNumber(3);

            const initialInput = [occ5, occ3];
            const insertedItem = occ8;
            const expected = [occ8, occ5, occ3];

            const sortedEntitiesOccurrences = new SortedEntitiesOccurrences(initialInput);
            sortedEntitiesOccurrences.insertNewEntities(insertedItem);

            expect(sortedEntitiesOccurrences.getSortedEntities()).toEqual(expected);
        });
    });
});
