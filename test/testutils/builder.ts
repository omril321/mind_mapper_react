import HistoryVisit from "../../src/dto/HistoryVisit";
import GoogleSearch from "../../src/dto/GoogleSearch";
import {ChromeHistoryItem} from "../../src/dto/ChromeHistoryItem";

let incrementedVisitId = 0;

export function historyItemFor(url: string, title: string): ChromeHistoryItem {
    return {
        id: (incrementedVisitId++).toString(),
        url: url,
        title: title
    };
}

export function historyVisitFor (url: string, title: string): HistoryVisit {
    return new HistoryVisit(historyItemFor(url, title));
}

export function googleSearchUrlFor(searchQuery: string, https: boolean = true): string {
    const protocol = https ? "https" : "http";
    return `${protocol}://www.google.com/search?q=${searchQuery}`;
}

export function googleSearchHistoryItemFor (searchQuery: string, https: boolean = true): HistoryVisit {
    const url = googleSearchUrlFor(searchQuery, https);
    const title = `${searchQuery} - Google Search`;

    return historyVisitFor(url, title)
}

export function googleSearchFor(searchQuery: string): GoogleSearch {
    return new GoogleSearch(googleSearchHistoryItemFor(searchQuery))
}
