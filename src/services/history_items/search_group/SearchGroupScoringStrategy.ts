import GoogleSearch from "~/dto/GoogleSearch";
import HistoryVisit from "~/dto/HistoryVisit";
import {RelatednessScore} from "~/dto/RelatednessScore";
import {calcPhrasesRelatedness} from "~/services/strings/StringsRelatednessScoreStrategy";

export default function calculateRelatedness(visit: HistoryVisit, search: GoogleSearch): RelatednessScore {
    // TODO: think of more complex heuristic..? including time as well?

    return calcPhrasesRelatedness(visit.visitTitle, search.searchQuery);
}
