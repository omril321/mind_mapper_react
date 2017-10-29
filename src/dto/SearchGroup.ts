import HistoryVisit from "~/dto/HistoryVisit";
import GoogleSearch from "~/dto/GoogleSearch";
import {RelatednessScore} from "~/dto/RelatednessScore";

export interface SearchGroupMember {
    readonly visit: HistoryVisit;
    readonly score: RelatednessScore;
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

    public getSearch = () => this.search;
    public getMembers = () => this.members;

    //TODO: add getMembersAboveRelatedness
}
