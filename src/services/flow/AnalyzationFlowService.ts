import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";
import corpusAnalyzerWebWorkerWrapper from "~/services/corpus_analyzer/CorpusAnalyzerWrokerService";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import {
    EntityAnalyzationUpdateCallback, HistoryProcessorCallback,
    IAnalyzationFlowConfigurations,
} from "~/services/flow/AnalyzationFlowConfig";
import {IProcessedHistoryResult} from "~/services/history_items/HistoryItemsProcessor";
import historyItemsProcessorWorkerService from "~/services/history_items/HistoryItemsProcessorWorkerService";

//TODO: is this the place for this?

export default class AnalyzationFlowService {

    private static startHistoryItemsProcessor(historyItemsInput: ReadonlyArray<IChromeHistoryItem>, callback: HistoryProcessorCallback) {
        historyItemsProcessorWorkerService.startWebWorker(historyItemsInput, callback);
    }

    private static startCorpusAnalyzation(processedHistoryResult: IProcessedHistoryResult, analyzationUpdateCallback: EntityAnalyzationUpdateCallback) {
        // TODO: consider running on ALL history items using the titles
        const searchQueryStrings: SearchQueryString[] = processedHistoryResult.allPossibleSearchGroups.map((pGroup) =>
            new SearchQueryString(pGroup.search.searchQuery));

        // TODO: use redux here, or another layer that wraps the analization

        // TODO: improve

        corpusAnalyzerWebWorkerWrapper.startWebWorker(searchQueryStrings, analyzationUpdateCallback);
    }

    public startAnalyzationFlow = function startAnalyzationFlowWithConfig(config: IAnalyzationFlowConfigurations): void {

        const onCompletedProcess: HistoryProcessorCallback = ((result) => {
            config.onHistoryProcessorResult(result);
            AnalyzationFlowService.startCorpusAnalyzation(result, config.onCorpusAnalyzationUpdate);
        });

        AnalyzationFlowService.startHistoryItemsProcessor(config.historyItemsInput, onCompletedProcess);

    };
}
