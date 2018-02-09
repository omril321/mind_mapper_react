import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";

export default interface IAsyncEntityAnalyzationIterationEvent {
    readonly analyzedEntity: EntityOccurrences;
    readonly allKnownEntities: ReadonlyArray<EntityOccurrences>;
    readonly entitiesFromThisIteration: ReadonlyArray<EntityOccurrences>;
    readonly numEntitiesAnalyzedSoFar: number;
}
