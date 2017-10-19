
export class HistoryVisit {
    private readonly historyItem: ChromeHistoryItem;
    constructor(_historyItem: ChromeHistoryItem) {
        this.historyItem = _historyItem;
    }

    public getVisitUrl = () => this.historyItem.url;

    public getTitle = () => this.historyItem.title;
}
