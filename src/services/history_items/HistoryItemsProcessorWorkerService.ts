import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";
import WebWorkerWrapper from "~/services/flow/WebWorkerWrapper";
import generateWorkerWrapper from "~/services/flow/WebWorkerWrapperFactory";
import {IProcessedHistoryResult} from "~/services/history_items/HistoryItemsProcessor";

const HistoryItemsProcessor = require("./HistoryItemsProcessor.worker");

const worker = new HistoryItemsProcessor() as Worker;

const historyItemsProcessorWorkerService: WebWorkerWrapper<ReadonlyArray<IChromeHistoryItem>, IProcessedHistoryResult> =
    generateWorkerWrapper<ReadonlyArray<IChromeHistoryItem>, IProcessedHistoryResult>(worker);

export default historyItemsProcessorWorkerService;
