import {IKeywordWeight, WordSearchesSummary} from "../../src/dto/WordSearchesSummary";

describe("WordSearchesSummary", () => {
    describe("getKeywordsWithWeight", () => {
        function mocWordSessions(word, historyMembersResult) {
            return {getAllRelatedHistoryVisits: () => historyMembersResult, word};
        }

        it("should return an empty array when there are no words data", () => {
            const summary = new WordSearchesSummary([]);
            const expected = [];

            const actual = summary.getKeywordsWithWeight();

            expect(actual).toEqual(expected);
        });

        it("should return an array of words and calculated weights by number of history visits in each word data",
            () => {
            const summary = new WordSearchesSummary([
                mocWordSessions("3 sessions", [1, 2, 3]),
                mocWordSessions("1 session", [1]),
                mocWordSessions("no sessions", []),
            ]);
            const expected: IKeywordWeight[] = [
                {keyword: "3 sessions", weight: 3},
                {keyword: "1 session", weight: 1},
                {keyword: "no sessions", weight: 0},
            ];

            const actual = summary.getKeywordsWithWeight();

            expect(actual).toEqual(expected);
        });
    });
});
