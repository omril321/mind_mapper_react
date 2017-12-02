import {SearchJourney} from "../../src/dto/SearchJourney";

describe("SearchJourney", () => {
    describe("getAllRelatedHistoryVisits", () => {

        function mockSessionWithRelatedVisits(relatedVisitsResult) {
            return {getAllRelatedHistoryVisits: () => relatedVisitsResult};
        }

        it("should return an empty array when journey is empty", () => {
            const journey = new SearchJourney("test", []);
            const expected = [];

            const result = journey.getAllRelatedHistoryVisits();

            expect(result).toEqual(expected);
        });

        it("should return the concatination of all results of search session members", () => {
            const journey = new SearchJourney("test", [
                mockSessionWithRelatedVisits(["related 1", "related 2"]),
                mockSessionWithRelatedVisits([]),
                mockSessionWithRelatedVisits(["related 3"]),
            ]);
            const expected = ["related 1", "related 2", "related 3"];

            const result = journey.getAllRelatedHistoryVisits();

            expect(result).toEqual(expected);
        });
    });
});
