import * as _ from "lodash";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import tryCombiningEntities from "~/services/corpus_analyzer/entity_detection/EntityCombinationUtils";

export default function generateCombinationsForEntity(entityToAnalyze: EntityOccurrences, entitiesSoFar: ReadonlyArray<EntityOccurrences>): EntityOccurrences[] {
    const newEntities: EntityOccurrences[] = [];

    const analyzeKnownEntityWithEntityToAnalyze = (entity: EntityOccurrences) => {
        const combinedEntityResult = tryCombiningEntities(entityToAnalyze, entity, entitiesSoFar, newEntities);
        if (combinedEntityResult.result) {
            newEntities.push(combinedEntityResult.result);
        }

    };
    entitiesSoFar.forEach(analyzeKnownEntityWithEntityToAnalyze);

    return _.uniq(newEntities);

}
