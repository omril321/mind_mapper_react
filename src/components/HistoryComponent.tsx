import SearchGroupBuilder from "./SearchGroupsBuilder";
import PossibleSearchGroupBuilder from "../services/PossibleSearchGroupBuilder";

interface ChromeHistoryQuery {
    text: String
    startTime?: number
    endTime?: number
    maxResults?: number
}

type HistoryQueryCallback = ((items: ChromeHistoryItem[]) => void);

declare let chrome: any;

const allHistoryQuery: ChromeHistoryQuery = {text: '', startTime: 0, maxResults: 100000};

function ChromeHistorySearch(callback: HistoryQueryCallback, query: ChromeHistoryQuery = allHistoryQuery): void {

    chrome.history.search(query, (items: ChromeHistoryItem[]) => {
        const possibleGroups = new PossibleSearchGroupBuilder(items).build();
        const searchGroups = new SearchGroupBuilder(possibleGroups).build();
        callback(items)
    });

}

export default ChromeHistorySearch;