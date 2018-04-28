import * as _ from "lodash";

export default class BagOfWords {

    public static hasCommonWords(bag1: BagOfWords, bag2: BagOfWords): boolean {
        return _.intersection(bag1.sortedWords, bag2.sortedWords).length > 0;
    }

    //TODO: check if the intersection algorithm is more efficient than the sortedIndex algorithm

    /*public static oneOfBagsIsContainingAnother(bag1: BagOfWords, bag2: BagOfWords): boolean {
        const intersection = _.intersection(bag1.sortedWords, bag2.sortedWords);
        const bag1isInBag2 = _.isEqual(intersection, bag1.sortedWords);
        const bag2isInBag1 = _.isEqual(intersection, bag2.sortedWords);
        return bag1isInBag2 || bag2isInBag1;
    }*/

    public static oneOfBagsIsContainingAnother(bag1: BagOfWords, bag2: BagOfWords): boolean {
        const intersection = _.intersection(bag1.sortedWords, bag2.sortedWords);
        const bag1isInBag2 = _.isEqual(intersection, bag1.sortedWords);
        const bag2isInBag1 = _.isEqual(intersection, bag2.sortedWords);
        return bag1isInBag2 || bag2isInBag1;
    }

    public static firstBagIsContainingTheSecond(bagThatContains: BagOfWords, bagThatIsContained: BagOfWords): boolean {
        const isWordInBag = (bag: BagOfWords, word: string): boolean => _.sortedIndexOf(bag.sortedWords, word) !== -1;
        return bagThatIsContained.sortedWords.every((word) => isWordInBag(bagThatContains, word));
    }

    public readonly sortedWords: ReadonlyArray<string>;

    constructor(...words: string[]) {
        const sortedLowerCase = words.map((word) => word.toLowerCase()).sort();
        this.sortedWords = _.sortedUniq(sortedLowerCase);
    }
}
