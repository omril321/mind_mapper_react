import {SearchGroupBuilder} from "./SearchSession";

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
        new SearchGroupBuilder(items).build();
        callback(items)
    });

}

export default ChromeHistorySearch;