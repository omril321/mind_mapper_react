import * as _ from "lodash";
//TODO: find a way to import al of the below as a single statement
import {HistoryVisit} from "../domain/history/HistoryVisit";
import {GoogleSearch} from "../domain/history/GoogleSearch";
import {PossibleSearchGroup} from "../domain/history/PossibleSearchGroup";

//TODO: relatednessScore can be put in an interface.
export interface SearchGroupMember {
    readonly visit: HistoryVisit;
    readonly relatednessScore: number;
}

export interface SearchGroup {
    readonly search: GoogleSearch;
    readonly members: ReadonlyArray<SearchGroupMember>;
}

export interface SearchJourneyMember {
    readonly member: SearchGroup;
    readonly relatednessScore: number
}

export interface SearchSession {
    readonly members: ReadonlyArray<SearchJourneyMember>;
}


export class SearchGroupExtractor {
    private readonly historyItems: ChromeHistoryItem[];

    constructor(historyItems: ChromeHistoryItem[]) {
        this.historyItems = historyItems;
    }

    public build(): SearchGroup[] {

        console.log("starting getting possible groups...");
        const possibleGroups = this.groupBySearches();
        console.log("finished getting possible groups. number: ", possibleGroups.length);

        //TODO: refactor for readability
        console.log("starting getting search groups...");
        const groups: SearchGroup[] = possibleGroups.map(possGroup => {
            const search: GoogleSearch = possGroup.getSearch();
            const relatedVisits: HistoryVisit[] = _.filter(possGroup.getVisits(), visit => {
                return SearchGroupExtractor.visitBelongsToSearch(visit, search)
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

    private groupBySearches(): PossibleSearchGroup[] {
        //assume items are sorted by date, descending (first is new, last is old)
        const groups: PossibleSearchGroup[] = [];

        let currentIndex = 0;
        let firstItemInGroupIndex = 0;
        while(currentIndex < this.historyItems.length) {
            const asSearch = this.asGoogleSearchByIndex(currentIndex);
            if(asSearch !== null) {
                //found search, add this group.
                const itemsInGroup = this.historyItems.slice(firstItemInGroupIndex, currentIndex)
                    .map(item => new HistoryVisit(item));
                const group = new PossibleSearchGroup(asSearch, itemsInGroup);
                groups.push(group);

                firstItemInGroupIndex = currentIndex + 1; //set the first item in the next group.
            }

            ++currentIndex;
        }

        return groups;
    }

    private asGoogleSearchByIndex(visitIndex: number): GoogleSearch | null {
        const visit = this.historyItems[visitIndex];
        return SearchGroupExtractor.asGoogleSearch(new HistoryVisit(visit));
    }

    private static asGoogleSearch(visit: HistoryVisit): GoogleSearch | null {
        try {
            return new GoogleSearch(visit);
        } catch (error) {
            return null;
        }
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
