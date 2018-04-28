import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";
import {SearchGroup} from "~/dto/SearchGroup";
import {SearchSession} from "~/dto/SearchSession";
import {WordSearchSessions} from "~/dto/WordSearchSessions";

import PossibleSearchGroup from "~/dto/PossibleSearchGroup";
import PossibleSearchGroupBuilder from "~/services/history_items/possible_search_group/PossibleSearchGroupBuilder";
import SearchGroupBuilder from "~/services/history_items/search_group/SearchGroupsBuilder";
import buildSearchSessions from "~/services/history_items/search_session/SearchSessionBuilder";
import filterInterestingWords from "~/services/history_items/word_searches/InterestingWordSearchesFilter";
import {WordSearchesBuilder} from "~/services/history_items/word_searches/WordSearchesBuilder";

export interface IProcessedHistoryResult {
    allPossibleSearchGroups: PossibleSearchGroup[];
    searchGroups: SearchGroup[];
    searchSessions: SearchSession[];
    wordSearchSessions: WordSearchSessions[];
}

/**
 * A processor class which gets history items as input, and outputs SearchSessions (or a higher level grouping)
 */
export class HistoryItemsProcessor {
    public processHistoryItems(items: ReadonlyArray<IChromeHistoryItem>): IProcessedHistoryResult {
        const possibleGroups = new PossibleSearchGroupBuilder(items).build();

        const searchGroups = new SearchGroupBuilder(possibleGroups).build();
        const searchSessions = buildSearchSessions(searchGroups);
        const wordSearches = new WordSearchesBuilder(searchSessions).build();
        const filteredWordSearches = filterInterestingWords(wordSearches);
        return {searchGroups, searchSessions, wordSearchSessions: filteredWordSearches, allPossibleSearchGroups: possibleGroups};
    }

}
