import {IChromeHistoryItem} from "~/dto/ChromeHistoryItem";
import {HistoryItemsProcessor} from "~/services/history_items/HistoryItemsProcessor";

const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener("message", (event: {data: ReadonlyArray<IChromeHistoryItem>}) => {
    console.debug("HistoryItemsProcessor worker - got event: " , event);
    const historyItemsInput = event.data;
    const processedHistoryItems = new HistoryItemsProcessor().processHistoryItems(historyItemsInput);
    // console.log("processedHistoryItems : ", processedHistoryItems);
    // console.log("JSON.parse(JSON.stringify(processedHistoryItems)) : ", JSON.parse(JSON.stringify(processedHistoryItems)));
    ctx.postMessage(processedHistoryItems);
});
