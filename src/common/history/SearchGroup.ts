

import HistoryVisit from "./HistoryVisit";
import GoogleSearch from "./GoogleSearch";

export class SearchGroupMember {
    private readonly visit: HistoryVisit;
    private readonly relatednessScore: number;

    public constructor(_visit: HistoryVisit, _relatednessScore: number){
        this.visit = _visit;
        this.relatednessScore = _relatednessScore;
    }
}

/**
 * A search group is built from a Google search,
 * and a group of visits that are related to that search.
 */
export class SearchGroup {
    private readonly search: GoogleSearch;
    private readonly members: ReadonlyArray<SearchGroupMember>;

    public constructor(_search: GoogleSearch, _members: ReadonlyArray<SearchGroupMember>) {
        this.search = _search;
        this.members = _members;
    }
}
