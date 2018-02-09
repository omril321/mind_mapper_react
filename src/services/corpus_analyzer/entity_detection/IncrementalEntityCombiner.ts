import * as _ from "lodash";
import config from "~/conf/config";
import EntityCombiner from "~/services/corpus_analyzer/entity_detection/EntityCombiner";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";

export class IncrementalEntityCombiner {

    public generateCombinationsForEntity(entityToAnalyze: EntityOccurrences, entitiesSoFar: ReadonlyArray<EntityOccurrences>): EntityOccurrences[] {
        const newEntities: EntityOccurrences[] = [];
        const analyzeKnownEntityWithEntityToAnalyze = (entity: EntityOccurrences) => {
            if (!EntityCombiner.areEntitiesCombinable(entityToAnalyze, entity)) {
                return;
            }

            const combinedEntity = EntityCombiner.combineEntities(entityToAnalyze, entity);
            const combinedEntityHasEnoughOccurrences = combinedEntity.containingQueries.length >= config.minimum_occurrences_for_entity_to_be_meaningful;
            if (!combinedEntityHasEnoughOccurrences) {
                return;
            }
            const isEntityWordsContainingCombinedEntityWords = (e: EntityOccurrences) => e.entityWords.containsOtherBag(combinedEntity.entityWords);
            const combinedEntityAlreadyExists =
                entitiesSoFar.concat(newEntities)
                    .some(isEntityWordsContainingCombinedEntityWords);

            if (combinedEntityAlreadyExists) {
                return;
            }
            newEntities.push(combinedEntity);
        };
        entitiesSoFar.forEach(analyzeKnownEntityWithEntityToAnalyze);

        return _.uniq(newEntities);
    }

}
