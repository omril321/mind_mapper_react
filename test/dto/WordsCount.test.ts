import BagOfWords from "../../src/dto/BagOfWords";
import WordsCount from "../../src/dto/WordsCount";

describe("WordsCount", () => {
    describe("getWordCount", () => {
        it("should create an empty map when given no words", () => {
            const bags: BagOfWords[] = [];
            const expected = {};

            const words = new WordsCount(bags);

            expect(words.getWordCount()).toEqual(expected);
        });

        it("should create single entry map when given a single word", () => {
            const bags: BagOfWords[] = [new BagOfWords("hello")];
            const expected = {hello: 1};

            const words = new WordsCount(bags);

            expect(words.getWordCount()).toEqual(expected);
        });

        it("should create map duplicated words to the matching number of occurrences", () => {
            const bags: BagOfWords[] = [
                new BagOfWords("hello", "hi"),
                new BagOfWords("hello", "test1"),
                new BagOfWords("test1", "test2"),
            ];
            const expected = {
                hello: 2,
                hi: 1,
                test1: 2,
                test2: 1,
            };

            const words = new WordsCount(bags);

            expect(words.getWordCount()).toEqual(expected);
        });

        describe("getWordsOnly", () => {

            it("should return empty array when wordCount is empty", () => {
                const count = new WordsCount([]);
                const expected = [];

                const actual = count.getWordsOnly();

                expect(actual.words).toEqual(expected);
            });

            it("should return unique words for a words count build from repeated words", () => {
                const count = new WordsCount(
                    [
                        new BagOfWords("hello", "hi"),
                        new BagOfWords("hello"),
                        new BagOfWords("hi", "test"),
                    ]);
                const expected = ["hello", "hi", "test"];

                const actual = count.getWordsOnly();

                expect(actual.words).toEqual(expected);
            });

        });
    });

});
