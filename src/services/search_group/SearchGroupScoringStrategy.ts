import GoogleSearch from "~/dto/GoogleSearch";
import HistoryVisit from "~/dto/HistoryVisit";
import {RelatednessScore} from "~/dto/RelatednessScore";
import {calcPhrasesRelatedness} from "~/services/strings/StringsRelatednessScoreStrategy";

export default function calculateRelatedness(visit: HistoryVisit, search: GoogleSearch): RelatednessScore {
    //TODO: should return true if has at least one common word, and was at difference of 15 mins from the search
    //TODO: think of more complex heuristic..? including time as well?

    return calcPhrasesRelatedness(visit.getTitle(), search.getSearchQuery());
}
