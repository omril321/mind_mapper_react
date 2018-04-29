import BagOfWords from "~/dto/BagOfWords";
import isWordInteresting from "~/services/strings/InterestingWordsFilter";
import {splitToWords} from "~/services/strings/Words";

export class SearchQueryString {
    public static isQueryContainingBagOfWords(searchQueryString: SearchQueryString, bag: BagOfWords): boolean {
        return BagOfWords.firstBagIsContainingTheSecond(searchQueryString.interestingQueryWords, bag);
    }

    public readonly interestingQueryWords: BagOfWords;
    private readonly query: string;

    constructor(query: string) {
        this.query = query;
        this.interestingQueryWords = new BagOfWords(...splitToWords(query).sortedWords.filter(isWordInteresting));
    }
}
