import HistoryVisit from "~/dto/HistoryVisit";
import {RelatednessScore} from "~/dto/RelatednessScore";
import {SearchSession} from "~/dto/SearchSession";
import BagOfWords from "../../src/dto/BagOfWords";
import WordsCount from "../../src/dto/WordsCount";

describe("SearchSession", () => {
    describe("keywordsAsStrings", () => {

        it("should return an empty array when keywords are empty", () => {
            const session = new SearchSession([], new WordsCount([]));
            const expected: string[] = [];

            const result = session.keywordsAsStrings;

            expect(result).toEqual(expected);
        });

        it("should return non duplicated sortedWords as array", () => {
            const bags: BagOfWords[] = [
                new BagOfWords("word1", "word2", "word3"),
                new BagOfWords("word2", "word3", "word4"),
            ];
            const session = new SearchSession([], new WordsCount(bags));
            const expected = ["word1", "word2", "word3", "word4"];

            const result = session.keywordsAsStrings;

            expect(result).toEqual(expected);
        });
    });

    describe("allRelatedHistoryVisits", () => {
        function mockSessionMemberWithVisits(visitsArray: string[], score: number): any {
            return {member: {allRelatedHistoryVisits: visitsArray}, score: new RelatednessScore(score)};
        }

        it("should return an empty array when session has no members", () => {
            const session = new SearchSession([], new WordsCount([]));

            const result = session.allRelatedHistoryVisits;

            expect(result).toEqual([]);
        });

        it("should return an empty array when session has only non-related members", () => {
            const members = [
                mockSessionMemberWithVisits(["non related 1", "non related 2"], 0),
                mockSessionMemberWithVisits(["non related 3"], 0),
            ];
            const expected: HistoryVisit[] = [];
            const session = new SearchSession(members, new WordsCount([]));

            const result = session.allRelatedHistoryVisits;

            expect(result).toEqual(expected);
        });

        it("should return only related members history visits", () => {
            const members = [
                mockSessionMemberWithVisits(["non related 1", "non related 2"], 0),
                mockSessionMemberWithVisits([], 1),
                mockSessionMemberWithVisits(["related 1", "related 2"], 0.0001),
                mockSessionMemberWithVisits(["related 3"], 1),
            ];
            const expected = ["related 1", "related 2", "related 3"];
            const session = new SearchSession(members, new WordsCount([]));

            const result = session.allRelatedHistoryVisits;

            expect(result).toEqual(expected);
        });
    });
});
