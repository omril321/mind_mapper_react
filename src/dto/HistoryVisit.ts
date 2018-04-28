import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";

export default class HistoryVisit {
    public readonly visitUrl: string;
    public visitTitle: string | undefined;
    public uniqueKey: string;
    private readonly historyItem: IChromeHistoryItem;

    constructor(historyItem: IChromeHistoryItem) {
        this.historyItem = historyItem;
        this.visitUrl = this.historyItem.url;
        this.visitTitle = this.historyItem.title;
        this.uniqueKey = this.historyItem.id;
    }
}
