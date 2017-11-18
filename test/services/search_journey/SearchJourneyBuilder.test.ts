import BagOfWords from "../../../src/dto/BagOfWords";
import {SearchJourney} from "../../../src/dto/SearchJourney";
import {SearchSession} from "../../../src/dto/SearchSession";
import WordsCount from "../../../src/dto/WordsCount";
import {SearchJourneyBuilder} from "../../../src/services/search_journey/SearchJourneyBuilder";

// duplicated keywords will be removed
function searchSessionForUniqueKeywords(...words: string[]) {
    const bag = new BagOfWords(...words);
    return new SearchSession([], new WordsCount([bag]));
}

describe("SearchJourneyBuilder", () => {
    it("should return an empty array when an empty array is given", () => {
        const sessions: SearchSession[] = [];
        const builder = new SearchJourneyBuilder(sessions);
        const expected: SearchJourney[] = [];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return empty array, when given a single search session", () => {
        const searchSession = searchSessionForUniqueKeywords("test", "this", "class");
        const sessions: SearchSession[] = [searchSession];
        const builder = new SearchJourneyBuilder(sessions);
        const expected: SearchJourney[] = [];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return empty array, when given 3 sessions with 2 keywords that are not common", () => {
        const searchSession1 = searchSessionForUniqueKeywords("some1", "thing1");
        const searchSession2 = searchSessionForUniqueKeywords("some2", "thing2");
        const searchSession3 = searchSessionForUniqueKeywords("some3", "thing3");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new SearchJourneyBuilder(sessions);
        const expected: SearchJourney[] = [];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return two search journeys with all search sessions, " +
        "when given 3 sessions with 2 keywords that are common to all", () => {
        const searchSession1 = searchSessionForUniqueKeywords("some", "thing");
        const searchSession2 = searchSessionForUniqueKeywords("some", "thing");
        const searchSession3 = searchSessionForUniqueKeywords("some", "thing");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new SearchJourneyBuilder(sessions);
        const expected: SearchJourney[] = [
            new SearchJourney("some", [searchSession1, searchSession2, searchSession3]),
            new SearchJourney("thing", [searchSession1, searchSession2, searchSession3]),
        ];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return 1 search journey, when given 3 sessions, each with a common keyword and a unique keyword", () => {
        const searchSession1 = searchSessionForUniqueKeywords("test", "keyword1");
        const searchSession2 = searchSessionForUniqueKeywords("test", "keyword2");
        const searchSession3 = searchSessionForUniqueKeywords("test", "keyword3");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new SearchJourneyBuilder(sessions);
        const expected: SearchJourney[] = [new SearchJourney("test", [searchSession1, searchSession2, searchSession3])];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return 3 search journey when given 3 sessions, each have common keyword with another session", () => {
        const searchSession1 = searchSessionForUniqueKeywords("test1", "test2");
        const searchSession2 = searchSessionForUniqueKeywords("test2", "test3");
        const searchSession3 = searchSessionForUniqueKeywords("test3", "test1");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new SearchJourneyBuilder(sessions);
        const expected: SearchJourney[] = [
            new SearchJourney("test1", [searchSession1, searchSession3]),
            new SearchJourney("test2", [searchSession1, searchSession2]),
            new SearchJourney("test3", [searchSession2, searchSession3]),
        ];

        const result = builder.build();

        expect(result).toEqual(expected);
    });
});
