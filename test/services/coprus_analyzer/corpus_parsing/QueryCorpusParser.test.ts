import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import BagOfWords from "../../../../src/dto/BagOfWords";
import parseQueryCorpus from "../../../../src/services/corpus_analyzer/corpus_parsing/QueryCorpusParser";

describe("QueryCorpusParser", () => {

    it("should return an empty list when given an empty list", () => {
        const input: SearchQueryString[] = [];
        const expected: EntityOccurrences[] = [];

        const result = parseQueryCorpus(input);

        expect(result).toEqual(expected);
    });

    it("should map between all words to their containing strings", () => {
        const allWords = new SearchQueryString("word1 word2 word3");
        const word2Only = new SearchQueryString("word2");
        const word3And1Only = new SearchQueryString("word3 word1");
        const input = [allWords, word2Only, word3And1Only];
        const expected: EntityOccurrences[] = [
            new EntityOccurrences(new BagOfWords("word1"), [allWords, word3And1Only]),
            new EntityOccurrences(new BagOfWords("word2"), [allWords, word2Only]),
            new EntityOccurrences(new BagOfWords("word3"), [allWords, word3And1Only]),
        ];

        const result = parseQueryCorpus(input);

        expect(result).toEqual(expected);
    });
});
