import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {IProcessedHistoryResult} from "~/services/history_items/HistoryItemsProcessor";

export type HistoryProcessorCallback = (result: IProcessedHistoryResult) => void;
export type EntityAnalyzationUpdateCallback = (update: IAsyncEntityAnalyzationIterationEvent) => void;

export interface IAnalyzationFlowConfigurations {
    readonly onHistoryProcessorResult: HistoryProcessorCallback;
    readonly historyItemsInput: ReadonlyArray<IChromeHistoryItem>;
    readonly onCorpusAnalyzationUpdate: EntityAnalyzationUpdateCallback;
}
