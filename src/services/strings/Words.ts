import BagOfWords from "~/dto/BagOfWords";

const wordsRegex = new RegExp("[ \.\,\;\\'\/]");

export function splitToWords(phrase: string): BagOfWords {
    const words = phrase.split(wordsRegex)
        .map((word) => word.toLowerCase())
        .filter((word) => word.length > 0);
    return new BagOfWords(...words);
}
