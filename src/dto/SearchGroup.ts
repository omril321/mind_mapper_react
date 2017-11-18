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
    private readonly search: GoogleSearch;
    private readonly members: ReadonlyArray<ISearchGroupMember>;

    public constructor(search: GoogleSearch, members: ReadonlyArray<ISearchGroupMember>) {
        this.search = search;
        this.members = members;
    }

    public getSearch(): GoogleSearch {
        return this.search;
    }
    public getGroupMembers(): ReadonlyArray<ISearchGroupMember> {
        return this.members;
    }

    public getMembersWithAtLeastRelatedness(minScore: number) {
        return this.members.filter((member) => member.score.value >= minScore);
    }
}
