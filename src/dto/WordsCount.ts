import BagOfWords from "~/dto/BagOfWords";
import * as _ from "lodash";

type WordToNumber = { [word: string]: number };

type ReadonlyWordToNumber = { readonly [word: string]: number };

export default class WordsCount {
    private readonly wordcount: WordToNumber;

    constructor(bags: ReadonlyArray<BagOfWords>) {
        this.wordcount = this.calcWordCount(bags);
    }

    public getWordCount(): ReadonlyWordToNumber {
        return this.wordcount;
    }

    //TODO: test
    public getWordsOnly(): BagOfWords {
        return new BagOfWords(..._.keys(this.wordcount));
    }

    private calcWordCount(bags: ReadonlyArray<BagOfWords>): WordToNumber {
        return bags.reduce((wordCount: WordToNumber, current: BagOfWords) => {
            return WordsCount.addWordsToCount(wordCount, current);
        }, {});
    }

    private static addWordsToCount(count: WordToNumber, bag: BagOfWords): WordToNumber {
        bag.getWords().forEach(word => {
            const currentWordCount = count[word];
            count[word] = currentWordCount !== undefined ? currentWordCount + 1 : 1;
        });

        return count;
    }
}
