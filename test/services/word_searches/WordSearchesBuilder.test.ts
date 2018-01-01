import BagOfWords from "../../../src/dto/BagOfWords";
import {SearchSession} from "../../../src/dto/SearchSession";
import WordsCount from "../../../src/dto/WordsCount";
import {WordSearchSessions} from "../../../src/dto/WordSearchSessions";
import {WordSearchesBuilder} from "../../../src/services/word_searches/WordSearchesBuilder";

// duplicated keywords will be removed
function searchSessionForUniqueKeywords(...words: string[]) {
    const bag = new BagOfWords(...words);
    return new SearchSession([], new WordsCount([bag]));
}

describe("WordSearchesBuilder", () => {
    it("should return an empty array when an empty array is given", () => {
        const sessions: SearchSession[] = [];
        const builder = new WordSearchesBuilder(sessions);
        const expected: WordSearchSessions[] = [];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return empty array, when given a single search session", () => {
        const searchSession = searchSessionForUniqueKeywords("test", "this", "class");
        const sessions: SearchSession[] = [searchSession];
        const builder = new WordSearchesBuilder(sessions);
        const expected: WordSearchSessions[] = [];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return empty array, when given 3 sessions with 2 keywords that are not common", () => {
        const searchSession1 = searchSessionForUniqueKeywords("some1", "thing1");
        const searchSession2 = searchSessionForUniqueKeywords("some2", "thing2");
        const searchSession3 = searchSessionForUniqueKeywords("some3", "thing3");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new WordSearchesBuilder(sessions);
        const expected: WordSearchSessions[] = [];

        const result = builder.build();

        expect(result).toEqual(expected);
    });

    it("should return two word searches with all search sessions, " +
        "when given 3 sessions with 2 keywords that are common to all", () => {
        const searchSession1 = searchSessionForUniqueKeywords("some", "thing");
        const searchSession2 = searchSessionForUniqueKeywords("some", "thing");
        const searchSession3 = searchSessionForUniqueKeywords("some", "thing");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new WordSearchesBuilder(sessions);
        const expected = [
            {word: "some", sessions: [searchSession1, searchSession2, searchSession3]},
            {word: "thing", sessions: [searchSession1, searchSession2, searchSession3]},
        ];

        const result = builder.build();

        expect(result).toMatchObject(expected);
    });

    it("should return 1 word search, when given 3 sessions, each with a common word and a unique word", () => {
        const searchSession1 = searchSessionForUniqueKeywords("test", "keyword1");
        const searchSession2 = searchSessionForUniqueKeywords("test", "keyword2");
        const searchSession3 = searchSessionForUniqueKeywords("test", "keyword3");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new WordSearchesBuilder(sessions);
        const expected = [{word: "test", sessions: [searchSession1, searchSession2, searchSession3]}];

        const result = builder.build();

        expect(result).toMatchObject(expected);
    });

    it("should return 3 word searches when given 3 sessions, each have common word with another session", () => {
        const searchSession1 = searchSessionForUniqueKeywords("test1", "test2");
        const searchSession2 = searchSessionForUniqueKeywords("test2", "test3");
        const searchSession3 = searchSessionForUniqueKeywords("test3", "test1");
        const sessions: SearchSession[] = [searchSession1, searchSession2, searchSession3];
        const builder = new WordSearchesBuilder(sessions);
        const expected = [
            {word: "test1", sessions: [searchSession1, searchSession3]},
            {word: "test2", sessions: [searchSession1, searchSession2]},
            {word: "test3", sessions: [searchSession2, searchSession3]},
        ];

        const result = builder.build();

        expect(result).toMatchObject(expected);
    });
});
