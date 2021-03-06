import {splitToWords} from "../../../src/services/strings/Words";

describe("Words", () => {
    describe("Split to Words", () => {
        it("should return an empty bag when splitting an empty string", () => {
            const result = splitToWords("");

            expect(result.sortedWords).toEqual([]);
        });

        it("should return an empty bag when splitting a space string", () => {
            const result = splitToWords(" ");

            expect(result.sortedWords).toEqual([]);
        });

        it("should return a single word bag when splitting a string of single word", () => {
            const result = splitToWords("test");

            expect(result.sortedWords).toEqual(["test"]);
        });

        it("should return a bag with unique occurrences of sortedWords", () => {
            const result = splitToWords("test1 test1 test2");

            expect(result.sortedWords).toEqual(["test1", "test2"]);
        });
    });
});
