import * as _ from "lodash";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";

export default class SortedEntitiesOccurrences {

    private static getOccurrencesOfEntity = (entity: EntityOccurrences) => entity.containingQueries.length;

    private static compareEntitiesOccurrences(e1: EntityOccurrences, e2: EntityOccurrences) {
        // e1 occurrences > e2 occurrences ==> e1 comes first ==> -1
        return SortedEntitiesOccurrences.getOccurrencesOfEntity(e2) - SortedEntitiesOccurrences.getOccurrencesOfEntity(e1);
    }

    private static sortByDescendingEntityOccurrences = (e: EntityOccurrences) => -SortedEntitiesOccurrences.getOccurrencesOfEntity(e);
    private entities: EntityOccurrences[];

    constructor(entities: EntityOccurrences[]) {
        this.entities = entities.sort(SortedEntitiesOccurrences.compareEntitiesOccurrences);
    }

    public insertNewEntities(...newEntities: EntityOccurrences[]) {
        newEntities.forEach((newEntity) => {
            const requiredIndex = _.sortedIndexBy(this.entities, newEntity, SortedEntitiesOccurrences.sortByDescendingEntityOccurrences);
            this.entities.splice(requiredIndex, 0, newEntity);
        });
    }

    public getSortedEntities: () => ReadonlyArray<EntityOccurrences> = () => this.entities;
}
