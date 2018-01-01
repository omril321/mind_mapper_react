import {WordSearchSessions} from "~/dto/WordSearchSessions";
import isWordInteresting from "~/services/strings/InterestingWordsFilter";

export default function filterInterestingWords(wordSearchesData: WordSearchSessions[]) {
    return wordSearchesData.filter((wordSessions) => isWordInteresting(wordSessions.word));
}
