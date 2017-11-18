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
        bag.getWords().forEach((word) => {
            const currentWordCount = count[word];
            count[word] = currentWordCount !== undefined ? currentWordCount + 1 : 1;
        });

        return count;
    }

    private readonly wordcount: IWordToNumber;

    constructor(bags: ReadonlyArray<BagOfWords>) {
        this.wordcount = this.calcWordCount(bags);
    }

    public getWordCount(): IReadonlyWordToNumber {
        return this.wordcount;
    }

    // TODO: test
    public getWordsOnly(): BagOfWords {
        return new BagOfWords(..._.keys(this.wordcount));
    }

    private calcWordCount(bags: ReadonlyArray<BagOfWords>): IWordToNumber {
        return bags.reduce((wordCount: IWordToNumber, current: BagOfWords) => {
            return WordsCount.addWordsToCount(wordCount, current);
        }, {});
    }

}
