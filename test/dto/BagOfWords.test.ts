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

    describe("oneBagIsContainingAnother", () => {
        it("should return true for empty bags", () => {
            const bag1 = new BagOfWords();
            const bag2 = new BagOfWords();
            const expected = true;

            expect(BagOfWords.oneBagIsContainingAnother(bag1, bag2)).toBe(expected);
        });

        it("should return true when one bag is empty", () => {
            const bag1 = new BagOfWords("some", "words");
            const bag2 = new BagOfWords();
            const expected = true;

            expect(BagOfWords.oneBagIsContainingAnother(bag1, bag2)).toBe(expected);
        });

        it("should return true when one bag is contained in another", () => {
            const bag1 = new BagOfWords("some", "words");
            const bag2 = new BagOfWords("some");
            const expected = true;

            expect(BagOfWords.oneBagIsContainingAnother(bag1, bag2)).toBe(expected);
        });

        it("should return true when bags are identical and non-empty", () => {
            const bag1 = new BagOfWords("some", "words");
            const bag2 = new BagOfWords("some", "words");
            const expected = true;

            expect(BagOfWords.oneBagIsContainingAnother(bag1, bag2)).toBe(expected);
        });

        it("should return false when bags have only a few common words", () => {
            const bag1 = new BagOfWords("this is", "first");
            const bag2 = new BagOfWords("and", "this is", "second");
            const expected = false;

            expect(BagOfWords.oneBagIsContainingAnother(bag1, bag2)).toBe(expected);
        });
    });

    describe("containsOtherBag", () => {
        it("should return true for empty bag containing another empty bag", () => {
            const bag1 = new BagOfWords();
            const bag2 = new BagOfWords();
            const expected = true;

            const result = bag1.containsOtherBag(bag2);

            expect(result).toBe(expected);
        });

        it("should return false for the callee is not containing the target", () => {
            const bag1 = new BagOfWords("word1", "word2");
            const bag2 = new BagOfWords("word2", "word3");
            const expected = false;

            const result = bag1.containsOtherBag(bag2);

            expect(result).toBe(expected);
        });

        it("should return true for the callee is containing the target", () => {
            const bag1 = new BagOfWords("word1", "word2");
            const bag2 = new BagOfWords("word1", "word2");
            const expected = true;

            const result = bag1.containsOtherBag(bag2);

            expect(result).toBe(expected);
        });

        it("should return true when called with self", () => {
            const bag = new BagOfWords("word1", "word2");
            const expected = true;

            const result = bag.containsOtherBag(bag);

            expect(result).toBe(expected);
        });

        it("should return true when target is empty", () => {
            const bag1 = new BagOfWords("word1", "word2");
            const bag2 = new BagOfWords();
            const expected = true;

            const result = bag1.containsOtherBag(bag2);

            expect(result).toBe(expected);
        });

        it("should return false when callee is empty and target is not empty", () => {
            const bag1 = new BagOfWords();
            const bag2 = new BagOfWords("word1", "word2");
            const expected = false;

            const result = bag1.containsOtherBag(bag2);

            expect(result).toBe(expected);
        });
    });
});
