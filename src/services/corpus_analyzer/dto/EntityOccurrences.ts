import BagOfWords from "~/dto/BagOfWords";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

export class EntityOccurrences {
    public readonly entityWords: BagOfWords;
    public readonly containingQueries: ReadonlyArray<SearchQueryString>;

    constructor(entityWords: BagOfWords, containingQueries: ReadonlyArray<SearchQueryString>) {
        this.entityWords = entityWords;
        this.containingQueries = containingQueries;
    }

    /**
     * Calculates the probability of seeing this entity, given the other entity has been seen.
     * the formula is: P(W2 | W1) = P(W1, W2) / P(W1)
     * @param {EntityOccurrences} otherEntity
     * @returns {number}
     */
    public calculateProbabilityGivenOtherEntity(otherEntity: EntityOccurrences): number {
        const pW1 = otherEntity.containingQueries.length;
        const pW1W2 = otherEntity.containingQueries.filter((otherQuery) =>
            otherQuery.isContainingBagOfWords(this.entityWords)).length;
        return pW1W2 / pW1;
    }
}
