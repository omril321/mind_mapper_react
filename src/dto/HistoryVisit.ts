import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";

export default class HistoryVisit {
    private readonly historyItem: IChromeHistoryItem;

    constructor(historyItem: IChromeHistoryItem) {
        this.historyItem = historyItem;
    }

    public getVisitUrl = () => this.historyItem.url;

    public getTitle = () => this.historyItem.title;

    public getUniqueKey() {
        return this.historyItem.id;
    }
}
