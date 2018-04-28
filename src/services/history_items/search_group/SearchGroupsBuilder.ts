import GoogleSearch from "~/dto/GoogleSearch";
import HistoryVisit from "~/dto/HistoryVisit";
import PossibleSearchGroup from "~/dto/PossibleSearchGroup";
import {ISearchGroupMember, SearchGroup} from "~/dto/SearchGroup";
import calculateRelatedness from "~/services/history_items/search_group/SearchGroupScoringStrategy";

export default class SearchGroupBuilder {

    private static searchGroupMembersFromVisits(search: GoogleSearch,
                                                visits: ReadonlyArray<HistoryVisit>): ISearchGroupMember[] {
        return visits.map((visit) => {
            const score = calculateRelatedness(visit, search);
            return {visit, score};
        });
    }

    private readonly possibleGroups: ReadonlyArray<PossibleSearchGroup>;

    constructor(possibleGroups: PossibleSearchGroup[]) {
        this.possibleGroups = possibleGroups;
    }

    public build(): SearchGroup[] {
        const groups: SearchGroup[] = this.possibleGroups.map((possGroup) => {
            const search: GoogleSearch = possGroup.search;
            const members: ISearchGroupMember[] =
                SearchGroupBuilder.searchGroupMembersFromVisits(search, possGroup.visits);
            return new SearchGroup(search, members);
        });
        return groups;
    }

}
