import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";

export interface IChromeHistoryQuery {
    text: string;
    startTime?: number;
    endTime?: number;
    maxResults?: number;
}

type HistoryQueryCallback = ((items: IChromeHistoryItem[]) => void);

declare let chrome: any;

const allHistoryQuery: IChromeHistoryQuery = {text: "", startTime: 0, maxResults: 100000};

export class ChromeHistoryService {
    private readonly callback: HistoryQueryCallback;

    constructor(callback: HistoryQueryCallback) {
        this.callback = callback;
    }

    public startQuery = (): void => {
        chrome.history.search(allHistoryQuery, (items: IChromeHistoryItem[]) => this.callback(items));
    }
}
