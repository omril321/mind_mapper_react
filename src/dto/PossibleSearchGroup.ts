import GoogleSearch from "./GoogleSearch";
import HistoryVisit from "./HistoryVisit";

/**
 * A GoogleSearch and following history visits, that MIGHT be related to the GoogleSearch.
 * The visits should not contain other Google searches..
 */
export default class PossibleSearchGroup {
    public readonly search: GoogleSearch;
    public readonly visits: ReadonlyArray<HistoryVisit>;

    public constructor(search: GoogleSearch, visits: HistoryVisit[]) {
        this.search = search;
        this.visits = visits;
    }
}
