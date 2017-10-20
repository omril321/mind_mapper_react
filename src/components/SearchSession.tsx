import * as _ from "lodash";
import {HistoryVisit} from "../domain/history/HistoryVisit";
import {GoogleSearch} from "../domain/history/GoogleSearch";


export interface PossibleSearchGroup {
    readonly search: GoogleSearch;
    readonly visits: ReadonlyArray<HistoryVisit>;
}

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

        const searchesIndices: number[] = this.getSearchIndices();
        console.log("Indices length: ", searchesIndices.length);

        const possibleGroups: PossibleSearchGroup[] = this.splitToPossibleSearchGroups(searchesIndices);
        const groups: SearchGroup[] = possibleGroups.map(possGroup => {
            const search: GoogleSearch = possGroup.search;
            const relatedVisits: HistoryVisit[] = _.filter(possGroup.visits, visit => {
                return SearchGroupExtractor.visitBelongsToSearch(visit, search)
            });
            const relatedToSearch: SearchGroupMember[] = relatedVisits.map(visit => {
                return {visit: visit, relatednessScore: 1} //TODO calculate score.
            });

            return {search: search, members: relatedToSearch};
        });

        console.log("groups", groups);
        return groups;
    }

    private getSearchIndices(): number[] {
        const searchIndices: number[] = [];
        _.forEach(this.historyItems, (item, key) => {
            const visit: HistoryVisit = new HistoryVisit(item);
            if (SearchGroupExtractor.isGoogleSearch(visit)) {
                searchIndices.push(key);
            }
        });
        return searchIndices;
    }

    private splitToPossibleSearchGroups(searchItemsIndices: number[]): PossibleSearchGroup[] {
        let result: PossibleSearchGroup[] = [];
        for (let i = 0; i < searchItemsIndices.length - 1; ++i) {
            let currentSearchIndex = searchItemsIndices[i];
            let nextSearchIndex = searchItemsIndices[i + 1];
            const item = this.historyItems[currentSearchIndex];
            let googleSearch = SearchGroupExtractor.asGoogleSearch(new HistoryVisit(item));
            let itemsForSearch: HistoryVisit[] = this.historyItems.slice(currentSearchIndex + 1, nextSearchIndex) //don't take the search itself
                .map(item => new HistoryVisit(item));
            result.push({search: googleSearch, visits: itemsForSearch});
        }

        return result;
    }

    private static isGoogleSearch(visit: HistoryVisit): boolean {
        return SearchGroupExtractor.asGoogleSearch(visit) !== null;
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
