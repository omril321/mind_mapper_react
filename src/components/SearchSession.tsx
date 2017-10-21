import * as _ from "lodash";
//TODO: find a way to import all of the below as a single statement
import HistoryVisit from "../common/history/HistoryVisit";
import GoogleSearch from "../common/history/GoogleSearch";
import PossibleSearchGroup from "../common/history/PossibleSearchGroup";

//TODO: relatednessScore can be put in an interface.
export interface SearchGroupMember {
    readonly visit: HistoryVisit;
    readonly relatednessScore: number;
}

/**
 * A search group is built from a Google search,
 * and a group of visits that are related to that search.
 */
export interface SearchGroup {
    readonly search: GoogleSearch;
    readonly members: ReadonlyArray<SearchGroupMember>;
}

export interface SearchJourneyMember {
    readonly member: SearchGroup;
    readonly relatednessScore: number
}

/**
 * A SearchSession is consisted of multiple SearchGroups that are related to each other in some way.
 * For example, a search for "flex alignment", and a following search for "flex position",
 * can become a search session, since the combination of the two searches can become a new conclusion.
 */
export interface SearchSession {
    readonly members: ReadonlyArray<SearchJourneyMember>;
}


export class SearchGroupBuilder {
    readonly possibleGroups: ReadonlyArray<PossibleSearchGroup>;

    constructor(_possibleGroups: Array<PossibleSearchGroup>) {
        this.possibleGroups = _possibleGroups;
    }

    public build(): SearchGroup[] {
        //TODO: refactor for readability
        console.log("starting getting search groups...");
        const groups: SearchGroup[] = this.possibleGroups.map(possGroup => {
            const search: GoogleSearch = possGroup.getSearch();
            const relatedVisits: HistoryVisit[] = _.filter(possGroup.getVisits(), visit => {
                return SearchGroupBuilder.visitBelongsToSearch(visit, search)
            });
            const relatedToSearch: SearchGroupMember[] = relatedVisits.map(visit => {
                return {visit: visit, relatednessScore: 1} //TODO calculate score.
            });

            return {search: search, members: relatedToSearch};
        });
        console.log("finished getting search groups. number: ", groups.length);
        console.log("groups", groups);
        return groups;
    }



    //TODO: extract to a strategy and inject
    private static visitBelongsToSearch(visit: HistoryVisit, search: GoogleSearch): boolean {
        //TODO: should return true if has at least one common word, and was at difference of 15 mins from the search
        //TODO: think of more complex heuristic..? score?


        const searchWords = _.words(search.getSearchQuery());
        const visitTitleWords = _.words(visit.getTitle());
        return _.intersection(visitTitleWords, searchWords).length > 0;

    }
}
