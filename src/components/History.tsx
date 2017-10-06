interface ChromeHistoryQuery {
    text: String
    startTime?: number
    endTime?: number
    maxResults?: number
}

interface ChromeHistoryItem {
    id: String
    url?: String
    title?: String
    lastVisitTime?: number
    visitCount?: number
    typedCount?: number
}

type HistoryQueryCallback = ((items: ChromeHistoryItem[]) => void);

declare let chrome: any;

function ChromeHistorySearch(query: ChromeHistoryQuery, callback: HistoryQueryCallback): void {
    chrome.history.search(query, (items: ChromeHistoryItem[]) => callback(items));

}

export default ChromeHistorySearch;