import GoogleSearch from "~/dto/GoogleSearch";
import HistoryVisit from "~/dto/HistoryVisit";
import {RelatednessScore} from "~/dto/RelatednessScore";

export interface ISearchGroupMember {
    readonly visit: HistoryVisit;
    readonly score: RelatednessScore;
}

/**
 * A search group is built from a Google search,
 * and a group of visits that are related to that search.
 */
export class SearchGroup {
    private static getAllRelatedHistoryVisits(members: ReadonlyArray<ISearchGroupMember>): ReadonlyArray<HistoryVisit> {
        return members
            .filter((member) => member.score.value > 0)
            .map((member) => member.visit);
    }

    public readonly search: GoogleSearch;
    public readonly members: ReadonlyArray<ISearchGroupMember>;
    public readonly uniqueId: string;
    public readonly allRelatedHistoryVisits: ReadonlyArray<HistoryVisit>;

    public constructor(search: GoogleSearch, members: ReadonlyArray<ISearchGroupMember>) {
        this.search = search;
        this.members = members;
        this.uniqueId = this.search.uniqueId;
        this.allRelatedHistoryVisits = SearchGroup.getAllRelatedHistoryVisits(this.members);
    }
}
