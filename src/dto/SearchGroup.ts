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
    public readonly search: GoogleSearch;
    public readonly members: ReadonlyArray<ISearchGroupMember>;

    public constructor(search: GoogleSearch, members: ReadonlyArray<ISearchGroupMember>) {
        this.search = search;
        this.members = members;
    }

    public getUniqueKey(): string {
        return this.search.getUniqueId();
    }

    public getAllRelatedHistoryVisits(): ReadonlyArray<HistoryVisit> {
        return this.members.filter((member) => member.score.value > 0)
            .map((member) => member.visit);
    }
}
