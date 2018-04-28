import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";

interface IWordToNumber {
    [word: string]: number;
}

interface IReadonlyWordToNumber {
    readonly [word: string]: number;
}

export default class WordsCount {
    private static addWordsToCount(count: IWordToNumber, bag: BagOfWords): IWordToNumber {
        bag.sortedWords.forEach((word) => {
            const currentWordCount = count[word];
            count[word] = currentWordCount !== undefined ? currentWordCount + 1 : 1;
        });

        return count;
    }

    private static calcWordCount(bags: ReadonlyArray<BagOfWords>): IWordToNumber {
        return bags.reduce((wordCount: IWordToNumber, current: BagOfWords) => {
            return WordsCount.addWordsToCount(wordCount, current);
        }, {});
    }

    public wordsOnly: BagOfWords;
    public readonly wordcount: IReadonlyWordToNumber;

    constructor(bags: ReadonlyArray<BagOfWords>) {
        this.wordcount = WordsCount.calcWordCount(bags);
        this.wordsOnly = new BagOfWords(..._.keys(this.wordcount));
    }

}
