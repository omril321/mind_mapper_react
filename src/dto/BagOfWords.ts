import * as _ from "lodash";

export default class BagOfWords {
    private words: string[];

    constructor(..._words: string[]) {
        this.words = _.uniq(_words);
    }

    public getWords(): ReadonlyArray<string> {
        return this.words;
    }

    public static hasCommonWords(bag1:BagOfWords, bag2: BagOfWords): boolean {
        return _.intersection(bag1.words, bag2.words).length > 0;
    }
}
