import {startAnalyzation} from "~/services/corpus_analyzer/CorpusEntitiesAnalyzer";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

const ctx: Worker = self as any;

// NOTE: This module is intended to be loaded with worker-loader

// TODO: somehow, make this type safe
const startWorkingForInput = (queryStringsInput: SearchQueryString[]): void => {
    // Post data to parent thread. this is an update event, and may be called many times.
    const callback = (event: IAsyncEntityAnalyzationIterationEvent) => ctx.postMessage(event);
    startAnalyzation(queryStringsInput, callback);
};

// Respond to message from parent thread
ctx.addEventListener("message", (event: {data: SearchQueryString[]}) => {
    console.debug("CorpusAnalyzer.worker - Got event: " , event);
    const queryStringsInput = event.data;
    startWorkingForInput(queryStringsInput);
});

/*import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import {EntityAnalyzationCallback, startAnalyzation} from "./CorpusEntitiesAnalyzer";

interface IAnalyzationContext {
    // This is a hack, which is required since the worker is not aware of anything which is not injected directly to its builder function.
    analyzationFunction: (queryStrings: SearchQueryString[], entityCallback: EntityAnalyzationCallback) => void;
    input: SearchQueryString[];
}
const startAsyncAnalyzation = (context: IAnalyzationContext, callback: EntityAnalyzationCallback) =>  {
    console.debug("starting async analyzation...");
    context.analyzationFunction(context.input, callback);
};*/

/*

const startAsyncAnalyzationWorker = (input: SearchQueryString[], callback: EntityAnalyzationCallback): void => {
    const asyncAnalyzationWorker: ITypedWorker<SearchQueryString[], IAsyncEntityAnalyzationIterationEvent> =
        createWorker(startAnalyzation, callback);

    const workerContext: IAnalyzationContext = {
        analyzationFunction: startAnalyzation,
        input,
    };
    asyncAnalyzationWorker.postMessage(input);
};

export default startAsyncAnalyzationWorker;
*/
