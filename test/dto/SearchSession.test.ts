import BagOfWords from "../../src/dto/BagOfWords";
import {RelatednessScore} from "../../src/dto/RelatednessScore";
import {SearchSession} from "../../src/dto/SearchSession";
import WordsCount from "../../src/dto/WordsCount";

describe("SearchSession", () => {
    describe("getKeywordsAsStrings", () => {

        it("should return an empty array when keywords are empty", () => {
            const session = new SearchSession([], new WordsCount([]));
            const expected = [];

            const result = session.getKeywordsAsStrings();

            expect(result).toEqual(expected);
        });

        it("should return non duplicated words as array", () => {
            const bags: BagOfWords[] = [
                new BagOfWords("word1", "word2", "word3"),
                new BagOfWords("word2", "word3", "word4"),
            ];
            const session = new SearchSession([], new WordsCount(bags));
            const expected = ["word1", "word2", "word3", "word4"];

            const result = session.getKeywordsAsStrings();

            expect(result).toEqual(expected);
        });
    });

    describe("getAllRelatedHistoryVisits", () => {
        function mockSessionMemberWithVisits(visitsArray, score) {
            return {member: {getAllRelatedHistoryVisits: () => visitsArray}, score: new RelatednessScore(score)};
        }

        it("should return an empty array when session has no members", () => {
            const session = new SearchSession([], []);

            const result = session.getAllRelatedHistoryVisits();

            expect(result).toEqual([]);
        });

        it("should return an empty array when session has only non-related members", () => {
            const members = [
                mockSessionMemberWithVisits(["non related 1", "non related 2"], 0),
                mockSessionMemberWithVisits(["non related 3"], 0),
            ];
            const expected = [];
            const session = new SearchSession(members, []);

            const result = session.getAllRelatedHistoryVisits();

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
            const session = new SearchSession(members, []);

            const result = session.getAllRelatedHistoryVisits();

            expect(result).toEqual(expected);
        });
    });
});
