import * as _ from "lodash";

export default class BagOfWords {

    public static hasCommonWords(bag1: BagOfWords, bag2: BagOfWords): boolean {
        return _.intersection(bag1.words, bag2.words).length > 0;
    }

    private words: string[];

    constructor(...words: string[]) {
        this.words = _.uniq(words);
    }

    public getWords(): ReadonlyArray<string> {
        return this.words;
    }
}
