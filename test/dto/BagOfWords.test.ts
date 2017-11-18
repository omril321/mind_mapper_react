import BagOfWords from "../../src/dto/BagOfWords";

describe("BagOfWords", () => {
    it("should return empty words array when constructing an empty bag", () => {
        const bag = new BagOfWords();
        const expected = [];

        expect(bag.words).toEqual(expected);
    });

    it("should remove duplicates", () => {
        const bag = new BagOfWords("hello", "hello", "hi", "hi", "test");
        const expected = ["hello", "hi", "test"];

        expect(bag.words).toEqual(expected);
    });

    describe("HasCommonWords", () => {
        it("should return false when both bags are empty", () => {
            const bag1 = new BagOfWords();
            const bag2 = new BagOfWords();

            expect(BagOfWords.hasCommonWords(bag1, bag2)).toBeFalsy();
        });

        it("should return false when one of the bags is empty", () => {
            const bag1 = new BagOfWords("hello");
            const bag2 = new BagOfWords();

            expect(BagOfWords.hasCommonWords(bag1, bag2)).toBeFalsy();
        });

        it("should return false when there are no common words", () => {
            const bag1 = new BagOfWords("hello");
            const bag2 = new BagOfWords("hi");

            expect(BagOfWords.hasCommonWords(bag1, bag2)).toBeFalsy();
        });

        it("should return true when bags are identical", () => {
            const bag1 = new BagOfWords("hello");
            const bag2 = new BagOfWords("hello");

            expect(BagOfWords.hasCommonWords(bag1, bag2)).toBeTruthy();
        });

        it("should return true when there are some common words", () => {
            const bag1 = new BagOfWords("hello", "test1");
            const bag2 = new BagOfWords("hello", "test2");

            expect(BagOfWords.hasCommonWords(bag1, bag2)).toBeTruthy();
        });
    });
});
