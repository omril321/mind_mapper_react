export interface ChromeHistoryQuery {
    text: String
    startTime?: number
    endTime?: number
    maxResults?: number
}

type HistoryQueryCallback = ((items: ChromeHistoryItem[]) => void);

declare let chrome: any;

const allHistoryQuery: ChromeHistoryQuery = {text: '', startTime: 0, maxResults: 100000};

export class ChromeHistoryService {
    private readonly callback: HistoryQueryCallback;

    constructor(_callback: HistoryQueryCallback) {
        this.callback = _callback
    }

    public startQuery = (): void => {
        chrome.history.search(allHistoryQuery, (items: ChromeHistoryItem[]) => this.callback(items))
    }
}
