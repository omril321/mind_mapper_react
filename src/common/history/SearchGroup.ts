import HistoryVisit from "./HistoryVisit";
import GoogleSearch from "./GoogleSearch";

export interface SearchGroupMember {
    readonly visit: HistoryVisit;
    readonly relatednessScore: number;
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
