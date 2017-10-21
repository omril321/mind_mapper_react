import * as _ from "lodash";
//TODO: find a way to import all of the below as a single statement
import HistoryVisit from "../common/history/HistoryVisit";
import GoogleSearch from "../common/history/GoogleSearch";
import PossibleSearchGroup from "../common/history/PossibleSearchGroup";
import {SearchGroup, SearchGroupMember} from "../common/history/SearchGroup";

export default class SearchGroupBuilder {
    readonly possibleGroups: ReadonlyArray<PossibleSearchGroup>;

    constructor(_possibleGroups: Array<PossibleSearchGroup>) {
        this.possibleGroups = _possibleGroups;
    }

    public build(): SearchGroup[] {
        //TODO: refactor for readability
        console.log("starting getting search groups...");
        const groups: SearchGroup[] = this.possibleGroups.map(possGroup => {
            const search: GoogleSearch = possGroup.getSearch();
            const members: SearchGroupMember[] = possGroup.getVisits().map( visit => {
                const score = SearchGroupBuilder.visitRelatednessScoreToSearch(visit, search);
                return {visit: visit, relatednessScore: score}
            });

            return new SearchGroup(search, members);
        });
        console.log("finished getting search groups. number: ", groups.length);
        console.log("groups", groups);
        return groups;
    }



    //TODO: extract to a strategy and inject
    private static visitRelatednessScoreToSearch(visit: HistoryVisit, search: GoogleSearch): number {
        //TODO: should return true if has at least one common word, and was at difference of 15 mins from the search
        //TODO: think of more complex heuristic..? score?


        const searchWords = _.words(search.getSearchQuery());
        const visitTitleWords = _.words(visit.getTitle());
        return (_.intersection(visitTitleWords, searchWords).length > 0) ? 1 : 0;

    }
}
