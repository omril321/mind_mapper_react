import SearchGroupBuilder from "~/services/SearchGroupsBuilder";
import PossibleSearchGroupBuilder from "~/services/PossibleSearchGroupBuilder";
import {SearchGroup} from "~/dto/SearchGroup";

/**
 * A processor class which gets history items as input, and outputs SearchSessions (or a higher level grouping)
 */
export class HistoryItemsProcessor {
    public processHistoryItems(items: ReadonlyArray<ChromeHistoryItem>): SearchGroup[] {
        const possibleGroups = new PossibleSearchGroupBuilder(items).build();
        return new SearchGroupBuilder(possibleGroups).build();
    }
}