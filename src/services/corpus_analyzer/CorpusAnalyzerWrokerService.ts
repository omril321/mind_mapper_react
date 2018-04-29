import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import WebWorkerWrapper from "~/services/flow/WebWorkerWrapper";
import generateWorkerWrapper from "~/services/flow/WebWorkerWrapperFactory";

/* tslint:disable */
const CorpusAnalyzerWorker = require("./CorpusAnalyzer.worker");
/* tslint:enable */

const worker = new CorpusAnalyzerWorker() as Worker;

const corpusAnalyzerWebWorkerWrapper: WebWorkerWrapper<SearchQueryString[], IAsyncEntityAnalyzationIterationEvent> =
    generateWorkerWrapper<SearchQueryString[], IAsyncEntityAnalyzationIterationEvent>(worker);

export default corpusAnalyzerWebWorkerWrapper;
