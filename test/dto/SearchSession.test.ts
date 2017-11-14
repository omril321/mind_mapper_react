import {SearchSession} from "../../src/dto/SearchSession";
import WordsCount from "../../src/dto/WordsCount";
import BagOfWords from "../../src/dto/BagOfWords";

describe('SearchSession', () => {
    describe('getKeywordsAsStrings', () => {

        it('should return an empty array when keywords are empty', () => {
            const session = new SearchSession([], new WordsCount([]));
            const expected = [];

            const result = session.getKeywordsAsStrings();

            expect(result).toEqual(expected);
        });

        it('should return non duplicated words as array', () => {
            const bags: BagOfWords[] = [
                new BagOfWords('word1', 'word2', 'word3'),
                new BagOfWords('word2', 'word3', 'word4'),
            ];
            const session = new SearchSession([], new WordsCount(bags));
            const expected = ['word1', 'word2', 'word3', 'word4'];

            const result = session.getKeywordsAsStrings();

            expect(result).toEqual(expected);
        });
    });
});