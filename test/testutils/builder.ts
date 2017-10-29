import HistoryVisit from "../../src/dto/HistoryVisit";

let incrementedVisitId = 0;

const historyVisitFor = (url: string, title: string): HistoryVisit => new HistoryVisit({id: incrementedVisitId++, url: url, title: title});

const googleSearchHistoryItemFor = (searchQuery: string, https: boolean = true): HistoryVisit => {
    const protocol = https? "https" : "http";
    const url = `${protocol}://www.google.com/search?q=${searchQuery}`;
    const title = `${searchQuery} - Google Search`;

    return historyVisitFor(url, title)
};

export default {
    historyVisitFor,
    googleSearchHistoryItemFor
}