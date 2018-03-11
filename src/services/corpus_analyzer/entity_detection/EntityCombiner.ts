import * as _ from "lodash";
import config from "~/conf/config";
import BagOfWords from "~/dto/BagOfWords";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

const MIN_OCCURRENCES_FOR_ANALYZATION = config.minimum_occurrences_for_combining_entities;

const areEntitiesCombinable = (entity1: EntityOccurrences, entity2: EntityOccurrences): boolean => {
    const enoughOccurrences = () =>
        entity1.containingQueries.length >= MIN_OCCURRENCES_FOR_ANALYZATION &&
        entity2.containingQueries.length >= MIN_OCCURRENCES_FOR_ANALYZATION;

    const notContained = () => !BagOfWords.oneBagIsContainingAnother(entity1.entityWords, entity2.entityWords);

    return enoughOccurrences() && notContained();
};

const combineEntities = (entity1: EntityOccurrences, entity2: EntityOccurrences): EntityOccurrences => {
    const newEntityWords = new BagOfWords(...entity1.entityWords.words, ...entity2.entityWords.words);

    function filterQueriesForNewEntity(queries: ReadonlyArray<SearchQueryString>): ReadonlyArray<SearchQueryString> {
        const isQueryContainingNewEntityWords = (query: SearchQueryString) => {
            console.log("OLOLOL - query: " , query);
            query.isContainingBagOfWords(newEntityWords);
        }
        return queries.filter(isQueryContainingNewEntityWords);
    }

    const newEntityOccurrences = _.uniq<SearchQueryString>([
        ...filterQueriesForNewEntity(entity1.containingQueries),
        ...filterQueriesForNewEntity(entity2.containingQueries),
    ]);
    return new EntityOccurrences(newEntityWords, newEntityOccurrences);
};

export {combineEntities, areEntitiesCombinable};
