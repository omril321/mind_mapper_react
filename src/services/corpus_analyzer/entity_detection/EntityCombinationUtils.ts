import config from "~/conf/config";
import BagOfWords from "~/dto/BagOfWords";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {areEntitiesCombinable, combineEntities} from "~/services/corpus_analyzer/entity_detection/EntityCombiner";

interface ICombinedEntityResult {
    readonly error?: string;
    readonly result?: EntityOccurrences;
}

const entityHasEnoughOccurrences = (e: EntityOccurrences) => e.containingQueries.length >= config.minimum_occurrences_for_entity_to_be_meaningful;

const isCombinedEntityExistsAlready = (combinedEntity: EntityOccurrences, entitiesSoFar: ReadonlyArray<EntityOccurrences>, newEntities: ReadonlyArray<EntityOccurrences>) => {
    const isEntityWordsContainingCombinedEntityWords = (e: EntityOccurrences) => BagOfWords.firstBagIsContainingTheSecond(e.entityWords, combinedEntity.entityWords);
    const isEntityCollectionContainsCombinedEntity = (collection: ReadonlyArray<EntityOccurrences>) => collection.some(isEntityWordsContainingCombinedEntityWords);

    return isEntityCollectionContainsCombinedEntity(entitiesSoFar) ||
        isEntityCollectionContainsCombinedEntity(newEntities);
};

const tryCombiningEntities: (e1: EntityOccurrences, e2: EntityOccurrences, entitiesSoFar: ReadonlyArray<EntityOccurrences>, newEntities: ReadonlyArray<EntityOccurrences>) => ICombinedEntityResult =
    (e1: EntityOccurrences, e2: EntityOccurrences, entitiesSoFar: ReadonlyArray<EntityOccurrences>, newEntities: ReadonlyArray<EntityOccurrences>) => {
        if (!areEntitiesCombinable(e1, e2)) {
            return {error: "Entities are not combinable"};
        }

        const combinedEntity = combineEntities(e1, e2);
        if (!entityHasEnoughOccurrences(combinedEntity)) {
            return {error: "Combined entity does not have enough occurrences"};
        }

        if (isCombinedEntityExistsAlready(combinedEntity, entitiesSoFar, newEntities)) {
            return {error: "Combined entity already exists"};
        }

        return {result: combinedEntity};
    };

export default tryCombiningEntities;
