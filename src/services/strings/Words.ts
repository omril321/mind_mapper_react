import * as _ from "lodash";

export type KeywordsCount = { [word: string]: number };

//TODO: extract to DTO, with an option to filter words by minimal occurrences, AND getting the maximum value
export type BagOfWords = ReadonlyArray<string>;

const wordsRegex = new RegExp('[ \.\,\;\\\'\/]');

export function countKeywords(bags: ReadonlyArray<BagOfWords>): KeywordsCount {
    return bags.reduce((wordCount: KeywordsCount, current: BagOfWords) => {
        current.forEach(word => {
            const currentWordCount = wordCount[word];
            wordCount[word] = currentWordCount !== undefined ? currentWordCount + 1 : 1;
        });

        return wordCount;
    }, {});
}


//TODO: test
export function splitToWords(phrase: string): BagOfWords {
    const nonUniqueWords = phrase.split(wordsRegex)
        .map(word => word.toLowerCase())
        .filter(word => word.length > 0);
    return _.uniq(nonUniqueWords)
}