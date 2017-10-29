import HistoryVisit from "../../src/dto/HistoryVisit";
import GoogleSearch from "../../src/dto/GoogleSearch";

let incrementedVisitId = 0;

export function historyVisitFor (url: string, title: string): HistoryVisit {
    return new HistoryVisit({
        id: incrementedVisitId++,
        url: url,
        title: title
    });
}

export function googleSearchHistoryItemFor (searchQuery: string, https: boolean = true): HistoryVisit {
    const protocol = https ? "https" : "http";
    const url = `${protocol}://www.google.com/search?q=${searchQuery}`;
    const title = `${searchQuery} - Google Search`;

    return historyVisitFor(url, title)
}

export function googleSearchFor(searchQuery: string): GoogleSearch {
    return new GoogleSearch(googleSearchHistoryItemFor(searchQuery))
}
