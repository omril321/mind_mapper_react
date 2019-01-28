import BagOfWords from "~/dto/BagOfWords";
import {ITestEntityData, TestEntitiesDataSet} from "~/rawData/testEntityDatasets";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

const mapTestEntityDataToEntityOccurrences = (testEnt: ITestEntityData): EntityOccurrences => {
    const bagOfWords = new BagOfWords(...testEnt.entityWords);
    const searchQueryStrings = testEnt.containingQueries.map((query) => new SearchQueryString(query));
    return new EntityOccurrences(bagOfWords, searchQueryStrings);
};

const mapTestEntitiesDataSetToEntityOccurrences = (dataset: TestEntitiesDataSet): ReadonlyArray<EntityOccurrences> => dataset.map(mapTestEntityDataToEntityOccurrences);

export default {
    mapTestEntitiesDataSetToEntityOccurrences,
};
