import SearchGroupBuilder from "~/services/SearchGroupsBuilder";
import PossibleSearchGroupBuilder from "~/services/PossibleSearchGroupBuilder";
import {SearchGroup} from "~/dto/SearchGroup";

interface ChromeHistoryQuery {
    text: String
    startTime?: number
    endTime?: number
    maxResults?: number
}

type HistoryQueryCallback = ((items: SearchGroup[]) => void);

declare let chrome: any;

const allHistoryQuery: ChromeHistoryQuery = {text: '', startTime: 0, maxResults: 100000};

function ChromeHistorySearch(callback: HistoryQueryCallback, query: ChromeHistoryQuery = allHistoryQuery): void {

    chrome.history.search(query, (items: ChromeHistoryItem[]) => {
        const possibleGroups = new PossibleSearchGroupBuilder(items).build();
        const searchGroups = new SearchGroupBuilder(possibleGroups).build();
        callback(searchGroups)
    });

}

export default ChromeHistorySearch;