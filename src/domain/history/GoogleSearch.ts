import {HistoryVisit} from "./HistoryVisit";

export class GoogleSearch {
    static readonly SEARCH_TITLE_POSTFIX = " - Google Search";
    static readonly GOOGLE_SEARCH_URL_REGEX = new RegExp("https?:\/\/www\.google\..*\/search\?.*q=([^&]+)");

    private readonly searchQuery: string;
    private readonly historyVisit: HistoryVisit;

    public constructor(historyVisit: HistoryVisit) {

        const match = historyVisit.getVisitUrl().match(GoogleSearch.GOOGLE_SEARCH_URL_REGEX);
        if (match === null) {
            throw Error("Unable to build a GoogleSearch from the history visit: " + historyVisit.toString())
        }

        this.searchQuery = historyVisit.getTitle().replace(GoogleSearch.SEARCH_TITLE_POSTFIX, '');
        this.historyVisit = historyVisit;
    }

    public getSearchQuery = () => this.searchQuery;
}
