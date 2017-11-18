import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";
import {SearchSession} from "~/dto/SearchSession";
import PossibleSearchGroupBuilder from "~/services/possible_search_group/PossibleSearchGroupBuilder";
import SearchGroupBuilder from "~/services/search_group/SearchGroupsBuilder";
import {SearchJourneyBuilder} from "~/services/search_journey/SearchJourneyBuilder";
import buildSearchSessions from "~/services/search_session/SearchSessionBuilder";

/**
 * A processor class which gets history items as input, and outputs SearchSessions (or a higher level grouping)
 */
export class HistoryItemsProcessor {
    public processHistoryItems(items: ReadonlyArray<IChromeHistoryItem>): SearchSession[] {
        const possibleGroups = new PossibleSearchGroupBuilder(items).build();
        const searchGroups =  new SearchGroupBuilder(possibleGroups).build();
        const searchSessions = buildSearchSessions(searchGroups);
        const searchJourneys = new SearchJourneyBuilder(searchSessions).build();
        return searchSessions;
    }
}
