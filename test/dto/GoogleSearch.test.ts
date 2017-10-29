import GoogleSearch from "../../src/dto/GoogleSearch";
import Builder from "../testutils/builder"

describe('GoogleSearch', () => {
    it('should construct a dto when provided history item is a google search', () => {
        const item = Builder.googleSearchHistoryItemFor("this is a test");
        const googleSearch = new GoogleSearch(item);

        expect(googleSearch.getSearchQuery()).toBe("this is a test");
    });

    it('should throw an expection when providing a non-search history item', () => {
        const item = Builder.historyVisitFor("http://not-google.com/search?q=hello", "not a google search");
        expect(() => new GoogleSearch(item)).toThrow(new RegExp("Unable to build a GoogleSearch from the history visit: *"));
    });


});