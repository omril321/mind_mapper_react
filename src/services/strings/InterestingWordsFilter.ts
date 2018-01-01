import * as stopword from "stopword";

function isSingleWord(word: string): boolean {
    return word.split(" ").length === 1;
}

function isNotANumber(word: string): boolean {
    return isNaN(+word);
}

function isNotStopWord(word: string): boolean {
    return stopword.removeStopwords([word]).length === 1;
}

export default function isWordInteresting(word: string): boolean {
    return isSingleWord(word) && isNotANumber(word) && isNotStopWord(word);
}
