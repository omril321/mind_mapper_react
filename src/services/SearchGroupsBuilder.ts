import * as _ from "lodash";
import HistoryVisit from "../dto/HistoryVisit";
import GoogleSearch from "../dto/GoogleSearch";
import PossibleSearchGroup from "../dto/PossibleSearchGroup";
import {SearchGroup, SearchGroupMember} from "../dto/SearchGroup";

export default class SearchGroupBuilder {
    readonly possibleGroups: ReadonlyArray<PossibleSearchGroup>;

    constructor(_possibleGroups: Array<PossibleSearchGroup>) {
        this.possibleGroups = _possibleGroups;
    }

    public build(): SearchGroup[] {
        console.log("starting getting search groups...");
        const groups: SearchGroup[] = this.possibleGroups.map(possGroup => {
            const search: GoogleSearch = possGroup.getSearch();
            const members: SearchGroupMember[] = SearchGroupBuilder.searchGroupMembersFromVisits(search, possGroup.getVisits());
            return new SearchGroup(search, members);
        });
        console.log("finished getting search groups. number: ", groups.length);
        console.log("groups", groups);
        return groups;
    }

    private static searchGroupMembersFromVisits(search: GoogleSearch, visits: ReadonlyArray<HistoryVisit>): SearchGroupMember[] {
        return visits.map(visit => {
            const score = SearchGroupBuilder.visitRelatednessScoreToSearch(visit, search);
            return {visit: visit, relatednessScore: score}
        });
    }

    //TODO: extract to a strategy and inject
    private static visitRelatednessScoreToSearch(visit: HistoryVisit, search: GoogleSearch): number {
        //TODO: should return true if has at least one common word, and was at difference of 15 mins from the search
        //TODO: think of more complex heuristic..? score?
        const lowerCasedWords = (input: string): string[] =>
            input.split(new RegExp('[ \.\,\;\\\'\/]'))
                .map(word => word.toLowerCase());

        const searchWords = lowerCasedWords(search.getSearchQuery());
        const visitTitleWords = lowerCasedWords(visit.getTitle());

        return (_.intersection(visitTitleWords, searchWords).length > 0) ? 1 : 0;

    }
}
