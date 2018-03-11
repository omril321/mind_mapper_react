import {EntityAnalyzationCallback} from "~/services/corpus_analyzer/CorpusEntitiesAnalyzer";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

// import * as CorpusAnalyzerWorker from "./CorpusAnalyzer.worker";
const CorpusAnalyzerWorker = require("./CorpusAnalyzer.worker");

const worker = new CorpusAnalyzerWorker();

// TODO: needs tedious tests, since type checking is not working here
const startWorkerProcessing = (message: SearchQueryString[]) => worker.postMessage(message);

const setWorkerOnMessageCallback = (eventCallback: EntityAnalyzationCallback) => worker.onmessage = eventCallback;

export {setWorkerOnMessageCallback, startWorkerProcessing};
