let stopwordsMockResult: string[];

jest.setMock("stopword", {removeStopwords: (wordsToScan: string[]) => stopwordsMockResult || wordsToScan});

import isWordInteresting from "../../../src/services/strings/InterestingWordsFilter";

beforeEach(() => {
    stopwordsMockResult = undefined;
});

describe("isWordInteresting", () => {
    it("should return true if a word is counted as interesting", () => {
        const result = isWordInteresting("word");

        expect(result).toBe(true);
    });

    it("should return false if the string is containing multiple sortedWords", () => {
        const result = isWordInteresting("two sortedWords");

        expect(result).toBe(false);
    });

    it("should return false if the string is a number", () => {
        const result = isWordInteresting("123");

        expect(result).toBe(false);
    });

    it("should return false if the string is a stopword", () => {
        stopwordsMockResult = [];
        const result = isWordInteresting("stopword");

        expect(result).toBe(false);
    });
});
