import * as _ from "lodash";

export type KeywordsCount = { [word: string]: number };

export type BagOfWords = ReadonlyArray<string>;

const wordsRegex = new RegExp('[ \.\,\;\\\'\/]');

//TODO: test
export function countKeywords(bags: ReadonlyArray<BagOfWords>): KeywordsCount {
    return bags.reduce((wordCount: KeywordsCount, current: BagOfWords) => {
        current.forEach(word => wordCount[word]++);
        return wordCount;
    }, {});
}


//TODO: test
export function splitToWords(phrase: string): BagOfWords {
    const nonUniqueWords = phrase.split(wordsRegex).map(word => word.toLowerCase());
    return _.uniq(nonUniqueWords)
}