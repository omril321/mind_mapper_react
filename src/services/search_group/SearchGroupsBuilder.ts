import HistoryVisit from "~/dto/HistoryVisit";
import GoogleSearch from "~/dto/GoogleSearch";
import PossibleSearchGroup from "~/dto/PossibleSearchGroup";
import {SearchGroup, ISearchGroupMember} from "~/dto/SearchGroup";
import calculateRelatedness from "~/services/search_group/SearchGroupScoringStrategy";

export default class SearchGroupBuilder {
    readonly possibleGroups: ReadonlyArray<PossibleSearchGroup>;

    constructor(_possibleGroups: Array<PossibleSearchGroup>) {
        this.possibleGroups = _possibleGroups;
    }

    public build(): SearchGroup[] {
        console.log("starting getting search groups...");
        const groups: SearchGroup[] = this.possibleGroups.map(possGroup => {
            const search: GoogleSearch = possGroup.getSearch();
            const members: ISearchGroupMember[] = SearchGroupBuilder.searchGroupMembersFromVisits(search, possGroup.getVisits());
            return new SearchGroup(search, members);
        });
        console.log("finished getting search groups. number: ", groups.length);
        return groups;
    }

    private static searchGroupMembersFromVisits(search: GoogleSearch, visits: ReadonlyArray<HistoryVisit>): ISearchGroupMember[] {
        return visits.map(visit => {
            const score = calculateRelatedness(visit, search);
            return {visit: visit, score: score}
        });
    }
}
