import {mockDefaultModuleExport} from "../../../testutils/jestUtils";

const mockedInterestingFilter = jest.fn(() => true);
mockDefaultModuleExport("~/services/strings/InterestingWordsFilter", mockedInterestingFilter);

import BagOfWords from "../../../../src/dto/BagOfWords";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

describe("SearchQueryString", () => {
    describe("interestingQueryWords", () => {
        it("should put input string in a bag of sortedWords, after filtering interesting sortedWords", () => {
            const input = "this is some sentence some is";
            const expected = new BagOfWords("this", "is", "some", "sentence");

            const result = new SearchQueryString(input).interestingQueryWords;

            expect(result).toEqual(expected);
            expect(mockedInterestingFilter).toHaveBeenCalled();
        });
    });

    describe("isQueryContainingBagOfWords", () => {
        it("should return true for a bag of sortedWords which is contained", () => {
            const input = "this is some sentence some is";
            const shouldContain = new BagOfWords("this", "sentence");
            const searchQueryString = new SearchQueryString(input);

            const result = SearchQueryString.isQueryContainingBagOfWords(searchQueryString, shouldContain);

            expect(result).toBe(true);
        });
    });
});
