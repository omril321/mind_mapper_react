import * as _ from "lodash";
import parseQueryCorpus from "~/services/corpus_analyzer/corpus_parsing/QueryCorpusParser";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import generateCombinationsForEntity from "~/services/corpus_analyzer/entity_detection/IncrementalEntityCombiner";
import SortedEntitiesOccurrences from "~/services/corpus_analyzer/entity_detection/SortedEntitiesOccurrences";

type EntityAnalyzationCallback = (event: IAsyncEntityAnalyzationIterationEvent) => void;

const startAnalyzation = (queryStrings: SearchQueryString[],
                          entityCallback: EntityAnalyzationCallback): void => {
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
            isLastAnalyzation: currentIndex === sortedEntitiesHolder.getSortedEntities().length - 1,
            numEntitiesAnalyzedSoFar: currentIndex,
        };
        entityCallback(event);
    }

    console.timeEnd("Analyzation");
};

export {startAnalyzation, EntityAnalyzationCallback};