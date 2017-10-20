import {GoogleSearch} from "./GoogleSearch";
import {HistoryVisit} from "./HistoryVisit";

export class PossibleSearchGroup {
    private readonly _search: GoogleSearch;
    private readonly _visits: ReadonlyArray<HistoryVisit>;

    public constructor(search: GoogleSearch, visits: Array<HistoryVisit>) {
        this._search = search;
        this._visits = visits;
    }

    public getSearch = () => this._search;
    public getVisits = () => this._visits;
}