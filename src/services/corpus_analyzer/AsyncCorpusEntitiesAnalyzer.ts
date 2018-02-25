import * as _ from "lodash";
import parseQueryCorpus from "~/services/corpus_analyzer/corpus_parsing/QueryCorpusParser";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import generateCombinationsForEntity from "~/services/corpus_analyzer/entity_detection/IncrementalEntityCombiner";
import SortedEntitiesOccurrences from "~/services/corpus_analyzer/entity_detection/SortedEntitiesOccurrences";

export type EntityAnalyzationCallback = (event: IAsyncEntityAnalyzationIterationEvent) => void;
export type AnalyzationFinishedCallback = (result: ReadonlyArray<EntityOccurrences>) => void;

export interface IAnalyzationConfiguration {
    entityCallback: EntityAnalyzationCallback;
    finishedCallback: AnalyzationFinishedCallback;
}

export function startAsyncAnalyzation(queryStrings: SearchQueryString[],
                                      configuration: IAnalyzationConfiguration) {
    console.time("Analyzation");
    // TODO: this should actually be async
    const parsedEntities = parseQueryCorpus(queryStrings);

    const sortedEntitiesHolder = new SortedEntitiesOccurrences(parsedEntities);
    let currentIndex = 0;
    while (currentIndex < sortedEntitiesHolder.getSortedEntities().length) {
        // TODO: each step should also generate entities relation
        const sortedEntities = sortedEntitiesHolder.getSortedEntities();
        const currentEntity = sortedEntities[currentIndex];
        const newEntities = generateCombinationsForEntity(currentEntity, sortedEntities);
        sortedEntitiesHolder.insertNewEntities(...newEntities);

        ++currentIndex;

        const event: IAsyncEntityAnalyzationIterationEvent = {
            // TODO: this causes x3 runtime, but is required since the callbacks might use it... how can this be removed / improved?
            allKnownEntities: _.cloneDeep(sortedEntitiesHolder.getSortedEntities()),
            analyzedEntity: currentEntity,
            entitiesFromThisIteration: newEntities,
            numEntitiesAnalyzedSoFar: currentIndex,
        };
        configuration.entityCallback(event);
    }

    configuration.finishedCallback(sortedEntitiesHolder.getSortedEntities());
    console.timeEnd("Analyzation");
}
