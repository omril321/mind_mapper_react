import BagOfWords from "~/dto/BagOfWords";
import {RelatednessScore} from "~/dto/RelatednessScore";
import {splitToWords} from "~/services/strings/Words";

export function calcPhrasesRelatedness(phrase1: string, phrase2: string): RelatednessScore {
    const words1 = splitToWords(phrase1);
    const words2 = splitToWords(phrase2);

    const score = BagOfWords.hasCommonWords(words1, words2) ? 1 : 0;
    return new RelatednessScore(score);
}
