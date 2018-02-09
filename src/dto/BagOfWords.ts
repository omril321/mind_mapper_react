import * as _ from "lodash";

export default class BagOfWords {

    public static hasCommonWords(bag1: BagOfWords, bag2: BagOfWords): boolean {
        return _.intersection(bag1.words, bag2.words).length > 0;
    }

    public static oneBagIsContainingAnother(bag1: BagOfWords, bag2: BagOfWords): boolean {
        const intersection = _.intersection(bag1.words, bag2.words);
        const bag1isInBag2 = _.isEqual(intersection, bag1.words);
        const bag2isInBag1 = _.isEqual(intersection, bag2.words);
        return bag1isInBag2 || bag2isInBag1;
    }

    public readonly words: ReadonlyArray<string>;

    constructor(...words: string[]) {
        const sortedLowerCase = words.map((word) => word.toLowerCase()).sort();
        this.words = _.sortedUniq(sortedLowerCase);
    }

    public containsOtherBag(other: BagOfWords) {
        return other.words.every((word) => this.isWordInBag(word));
    }

    private indexOfWord(word: string): number {
        // returns the index OR -1
        return _.sortedIndexOf(this.words, word);
    }

    private isWordInBag(word: string): boolean {
        return this.indexOfWord(word) !== -1;
    }
}
