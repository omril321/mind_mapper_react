import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

interface IMapFromWordsToQueries {
    [word: string]: SearchQueryString[];
}

export class QueryCorpusAnalyzer {
    // TODO: although not currently used, this should be used in the future
    private static areEntitiesRelated(entity1: EntityOccurrences, entity2: EntityOccurrences): boolean {
        // TODO: what's the best threshold? ==> use appConfig
        const MIN_PROBABILITY_FOR_RELATEDNESS = 0.6;

        const pW1GivenW2 = entity1.calculateProbabilityGivenOtherEntity(entity2);
        const pW2GivenW1 = entity2.calculateProbabilityGivenOtherEntity(entity1);
        return (pW1GivenW2 >= MIN_PROBABILITY_FOR_RELATEDNESS || pW2GivenW1 >= MIN_PROBABILITY_FOR_RELATEDNESS);
    }

    private readonly queryCorpus: ReadonlyArray<SearchQueryString>;

    constructor(queryCorpus: ReadonlyArray<SearchQueryString>) {
        // TODO: the corpus is injected from outside, but do we want to inject only search queries? or all visit headers?
        this.queryCorpus = queryCorpus;
    }
}
