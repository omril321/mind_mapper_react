import HistoryVisit from "~/dto/HistoryVisit";

/**
 * A history visit which is was a Google search
 */
export default class GoogleSearch {
    private static readonly SEARCH_TITLE_POSTFIX = " - Google Search";
    private static readonly GOOGLE_SEARCH_URL_REGEX = new RegExp("https?:\/\/www\.google\..*\/search\?.*q=([^&]+)");

    public readonly searchQuery: string;
    public readonly uniqueId: string;
    private readonly historyVisit: HistoryVisit;

    public constructor(historyVisit: HistoryVisit) {

        const match = historyVisit.visitUrl.match(GoogleSearch.GOOGLE_SEARCH_URL_REGEX);
        if (match === null) {
            throw Error("Unable to build a GoogleSearch from the history visit: " + historyVisit.toString());
        }

        this.searchQuery = historyVisit.visitTitle.replace(GoogleSearch.SEARCH_TITLE_POSTFIX, "");
        this.historyVisit = historyVisit;
        this.uniqueId = this.historyVisit.uniqueKey;
    }

}
