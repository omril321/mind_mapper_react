import {IKeywordWeight, JourneysSummary} from "../../src/dto/JourneysSummary";

describe("JourneySummary", () => {
    describe("getKeywordsWithWeight", () => {
        function mockJourney(keyword, historyMembersResult) {
            return {keyword, getAllRelatedHistoryVisits: () => historyMembersResult};
        }

        it("should return an empty array when there are no journeys", () => {
            const summary = new JourneysSummary([]);
            const expected = [];

            const actual = summary.getKeywordsWithWeight();

            expect(actual).toEqual(expected);
        });

        it("should return an array of words and calculated weights by number of history visits in each journey", () => {
            const summary = new JourneysSummary([
                mockJourney("3 members", [1, 2, 3]),
                mockJourney("1 member", [1]),
                mockJourney("no members", []),
            ]);
            const expected: IKeywordWeight[] = [
                {keyword: "3 members", weight: 3},
                {keyword: "1 member", weight: 1},
                {keyword: "no members", weight: 0},
            ];

            const actual = summary.getKeywordsWithWeight();

            expect(actual).toEqual(expected);
        });
    });
});
