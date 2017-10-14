export class SearchSession {
    readonly visits: ChromeHistoryItem[];
}

export class SearchSessionExtractor {
    private readonly historyItems: ChromeHistoryItem[];

    constructor(historyItems: ChromeHistoryItem[]) {
        this.historyItems = historyItems;
    }

    public build(): SearchSession[] {
        //TODO: build

        for(let item of this.historyItems) {
            if(this.isGoogleSearch(item)){
                console.log("FOUND SEARCH! : ", item);
            }
        }
        return [];
    }

    private isGoogleSearch(historyItem: ChromeHistoryItem): boolean {
        const googleSearchRegex = new RegExp("https?:\/\/www\.google\..*\/search\?.*");
        return historyItem.url.match(googleSearchRegex) !== null;
    }
}
