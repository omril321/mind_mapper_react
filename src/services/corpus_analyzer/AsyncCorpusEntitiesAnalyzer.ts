import {QueryCorpusParser} from "~/services/corpus_analyzer/corpus_parsing/QueryCorpusParser";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import {IncrementalEntityCombiner} from "~/services/corpus_analyzer/entity_detection/IncrementalEntityCombiner";
import SortedEntitiesOccurrences from "~/services/corpus_analyzer/entity_detection/SortedEntitiesOccurrences";

export type EntityAnalyzationCallback = (event: IAsyncEntityAnalyzationIterationEvent) => void;

export default class AsyncCorpusEntitiesAnalyzer {

    private readonly queryStrings: SearchQueryString[];
    private readonly entityResultCallback: EntityAnalyzationCallback;

    public constructor(queryStrings: SearchQueryString[], entityResultCallback: EntityAnalyzationCallback) {
        this.queryStrings = queryStrings;
        this.entityResultCallback = entityResultCallback;
    }

    public startAsyncAnalyzation(): SortedEntitiesOccurrences {
        const parsedEntities = new QueryCorpusParser(this.queryStrings).parse();

        const sortedEntitiesHolder = new SortedEntitiesOccurrences(parsedEntities);
        const analyzer = new IncrementalEntityCombiner();
        let currentIndex = 0;
        while (currentIndex < sortedEntitiesHolder.getSortedEntities().length) {
            //TODO: each step should also generate entities relation
            const sortedEntities = sortedEntitiesHolder.getSortedEntities();
            const currentEntity = sortedEntities[currentIndex];
            const newEntities = analyzer.generateCombinationsForEntity(currentEntity, sortedEntities);
            sortedEntitiesHolder.insertNewEntities(...newEntities);

            ++currentIndex;

            const event: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: sortedEntitiesHolder.getSortedEntities(),
                analyzedEntity: currentEntity,
                entitiesFromThisIteration: newEntities,
                numEntitiesAnalyzedSoFar: currentIndex,
            };
            this.entityResultCallback(event);
        }

        return sortedEntitiesHolder;
    }

}
