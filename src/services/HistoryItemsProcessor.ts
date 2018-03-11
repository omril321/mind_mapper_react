import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";
import {SearchGroup} from "~/dto/SearchGroup";
import {SearchSession} from "~/dto/SearchSession";
import {WordSearchSessions} from "~/dto/WordSearchSessions";

import {setWorkerOnMessageCallback, startWorkerProcessing} from "~/services/corpus_analyzer/CorpusAnalyzerService";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import PossibleSearchGroupBuilder from "~/services/possible_search_group/PossibleSearchGroupBuilder";
import SearchGroupBuilder from "~/services/search_group/SearchGroupsBuilder";
import buildSearchSessions from "~/services/search_session/SearchSessionBuilder";
import filterInterestingWords from "~/services/word_searches/InterestingWordSearchesFilter";
import {WordSearchesBuilder} from "~/services/word_searches/WordSearchesBuilder";

export interface IProcessedHistoryResult {
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

// TODO: consider running on ALL history items using the titles
        const searchQueryStrings: SearchQueryString[] = possibleGroups.map((pGroup) =>
            new SearchQueryString(pGroup.getSearch().getSearchQuery()));

        // TODO: use redux here, or another layer that wraps the analization

        // TODO: improve
        setWorkerOnMessageCallback((event: IAsyncEntityAnalyzationIterationEvent) => console.log(`event: ${event}`));
        startWorkerProcessing(searchQueryStrings);

        const searchGroups = new SearchGroupBuilder(possibleGroups).build();
        const searchSessions = buildSearchSessions(searchGroups);
        const wordSearches = new WordSearchesBuilder(searchSessions).build();
        const filteredWordSearches = filterInterestingWords(wordSearches);
        return {searchGroups, searchSessions, wordSearchSessions: filteredWordSearches};
    }

}
