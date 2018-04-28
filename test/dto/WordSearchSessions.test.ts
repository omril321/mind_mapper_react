import HistoryVisit from "~/dto/HistoryVisit";
import {WordSearchSessions} from "~/dto/WordSearchSessions";

describe("WordSearchSessions", () => {
    describe("getAllRelatedHistoryVisits", () => {

        function mockSessionWithRelatedVisits(allRelatedHistoryVisits: string[]): any {
            return {allRelatedHistoryVisits};
        }

        it("should return an empty array when word sessions is empty", () => {
            const wordSearchSessions = new WordSearchSessions("test", []);
            const expected: HistoryVisit[] = [];

            const result = wordSearchSessions.allRelatedHistoryVisits;

            expect(result).toEqual(expected);
        });

        it("should return the concatination of all results of search session members", () => {
            const wordSearchSessions = new WordSearchSessions("test", [
                mockSessionWithRelatedVisits(["related 1", "related 2"]),
                mockSessionWithRelatedVisits([]),
                mockSessionWithRelatedVisits(["related 3"]),
            ]);
            const expected = ["related 1", "related 2", "related 3"];

            const result = wordSearchSessions.allRelatedHistoryVisits;

            expect(result).toEqual(expected);
        });
    });
});
