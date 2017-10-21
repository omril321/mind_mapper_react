import GoogleSearch from "./GoogleSearch";
import HistoryVisit from "./HistoryVisit";

/**
 * A GoogleSearch and following history visits, that MIGHT be related to the GoogleSearch.
 * The visits should not contain other Google searches..
 */
export default class PossibleSearchGroup {
    private readonly _search: GoogleSearch;
    private readonly _visits: ReadonlyArray<HistoryVisit>;

    public constructor(search: GoogleSearch, visits: Array<HistoryVisit>) {
        this._search = search;
        //TODO: check that the visits contain no google searches.
        this._visits = visits;
    }

    public getSearch = () => this._search;
    public getVisits = () => this._visits;


}