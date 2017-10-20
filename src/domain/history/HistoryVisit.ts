
export class HistoryVisit {
    private readonly _historyItem: ChromeHistoryItem;
    constructor(historyItem: ChromeHistoryItem) {
        this._historyItem = historyItem;
    }

    public getVisitUrl = () => this._historyItem.url;

    public getTitle = () => this._historyItem.title;
}