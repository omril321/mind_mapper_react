import {RelatednessScore} from "~/dto/RelatednessScore";
import * as _ from "lodash";
import {splitToWords} from "~/services/strings/Words";

export default function calcPhrasesRelatedness(phrase1: string, phrase2: string): RelatednessScore {
    const words1 = splitToWords(phrase1);
    const words2 = splitToWords(phrase2);

    const score = (_.intersection(words1, words2).length > 0) ? 1 : 0;
    return new RelatednessScore(score);
}