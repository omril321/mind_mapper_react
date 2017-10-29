import SearchGroupBuilder from "~/services/search_group/SearchGroupsBuilder";
import PossibleSearchGroupBuilder from "~/services/possible_search_group/PossibleSearchGroupBuilder";
import {SearchGroup} from "~/dto/SearchGroup";
import {ChromeHistoryItem} from "~/dto/ChromeHistoryItem";

/**
 * A processor class which gets history items as input, and outputs SearchSessions (or a higher level grouping)
 */
export class HistoryItemsProcessor {
    public processHistoryItems(items: ReadonlyArray<ChromeHistoryItem>): SearchGroup[] {
        const possibleGroups = new PossibleSearchGroupBuilder(items).build();
        return new SearchGroupBuilder(possibleGroups).build();
    }
}