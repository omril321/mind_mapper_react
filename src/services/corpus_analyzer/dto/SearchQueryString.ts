import BagOfWords from "~/dto/BagOfWords";
import isWordInteresting from "~/services/strings/InterestingWordsFilter";
import {splitToWords} from "~/services/strings/Words";

export class SearchQueryString {
    public readonly interestingQueryWords: BagOfWords;
    private readonly query: string;

    constructor(query: string) {
        this.query = query;
        this.interestingQueryWords = new BagOfWords(...splitToWords(query).words.filter(isWordInteresting));
    }

    public isContainingBagOfWords(bag: BagOfWords): boolean {
        return this.interestingQueryWords.containsOtherBag(bag);
    }
}
