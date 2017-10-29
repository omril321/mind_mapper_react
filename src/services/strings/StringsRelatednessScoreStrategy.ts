import {RelatednessScore} from "~/dto/RelatednessScore";
import * as _ from "lodash";

const wordsRegex = new RegExp('[ \.\,\;\\\'\/]');

function lowerCasedWords(input: string): string[] {
    return input.split(wordsRegex).map(word => word.toLowerCase());
}

export default function calcStringsRelatedness(s1: string, s2: string): RelatednessScore {
    const words1 = lowerCasedWords(s1);
    const words2 = lowerCasedWords(s2);

    //TODO: put in string utils as well...? a function which gets two strings and returns how related the two strings are?
    const score = (_.intersection(words1, words2).length > 0) ? 1 : 0;
    return new RelatednessScore(score);
}