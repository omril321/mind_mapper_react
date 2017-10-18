import * as _ from "lodash";

export interface GoogleSearchHistoryItem extends ChromeHistoryItem {
    readonly searchQuery: string;
}

//TODO: build a SearchJourney extractor as well.
export interface SearchJourney {
    readonly sessions: ReadonlyArray<SearchSession>;
}

export interface SearchSession {
    readonly search: GoogleSearchHistoryItem;
    readonly visits: ReadonlyArray<ChromeHistoryItem>;
}

interface NonFilteredSearchSession extends SearchSession {
}

export class SearchSessionExtractor {
    private readonly historyItems: ChromeHistoryItem[];

    constructor(historyItems: ChromeHistoryItem[]) {
        this.historyItems = historyItems;
    }

    public build(): SearchSession[] {

        const searchesIndices: number[] = this.getSearchIndices();
        console.log("Indices length: ", searchesIndices.length);




        //TODO: debug the process!




        const unfilteredSessions = this.splitBySearchItemsIndices(searchesIndices);
        const sessions: SearchSession[] = unfilteredSessions.map(session => {
            const search = session.search;
            const relatedToSearch = _.filter(session.visits,visit => {
                return SearchSessionExtractor.historyItemBelongsToSearch(visit, search)
            });

            return {search: search, visits: relatedToSearch};
        });

        const nonEmptySessions: SearchSession[] = _.filter(sessions, session => session.visits.length > 0);

        console.log("sessions", sessions);
        console.log("nonEmptySessions", nonEmptySessions);
        return sessions;
    }

    private getSearchIndices(): number[] {
        const searchIndices: number[] = [];
        _.forEach(this.historyItems, (item, key) => {
            if (SearchSessionExtractor.isGoogleSearch(item)) {
                searchIndices.push(key);
            }
        });
        return searchIndices;
    }

    private relatedItemsForSearchQuery(search: GoogleSearchHistoryItem, possiblyRelated: ChromeHistoryItem[]): ChromeHistoryItem[] {
        return _.filter(possiblyRelated, possibleItem => SearchSessionExtractor.historyItemBelongsToSearch(possibleItem, search))
    }

    private splitBySearchItemsIndices(searchItemsIndices: number[]): NonFilteredSearchSession[] {
        let result: NonFilteredSearchSession[] = [];
        for (let i = 0; i < searchItemsIndices.length - 1; ++i) {
            let currentSearchIndex = searchItemsIndices[i];
            let nextSearchIndex = searchItemsIndices[i + 1];
            let searchItem = SearchSessionExtractor.asGoogleSearch(this.historyItems[currentSearchIndex]);
            let itemsForSearch = this.historyItems.slice(currentSearchIndex + 1, nextSearchIndex); //don't take the search itself
            result.push({search: searchItem, visits: itemsForSearch});
        }

        return result;
    }

    private static isGoogleSearch(item: ChromeHistoryItem): boolean {
        return SearchSessionExtractor.asGoogleSearch(item) !== null;
    }

    private static asGoogleSearch(historyItem: ChromeHistoryItem): GoogleSearchHistoryItem | null {
        const searchTitlePostfix = " - Google Search";
        const googleSearchRegex = new RegExp("https?:\/\/www\.google\..*\/search\?.*q=([^&]+)");
        const match = historyItem.url.match(googleSearchRegex);
        if (match === null) {
            return null;
        }
        const searchQuery = historyItem.title.replace(searchTitlePostfix, '');
        return {searchQuery: searchQuery, ...historyItem}
    }


    private static historyItemBelongsToSearch(item: ChromeHistoryItem, search: GoogleSearchHistoryItem): boolean {
        //TODO: should return true if has at least one common word, and was at difference of 15 mins from the search
        //TODO: think of more complex heuristic..? score?


        const searchWords = _.words(search.searchQuery);
        const visitTitleWords = _.words(item.title);
        return _.intersection(visitTitleWords, searchWords).length > 0;

    }
}
