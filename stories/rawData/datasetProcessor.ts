import BagOfWords from "../../src/dto/BagOfWords";
import {EntityOccurrences} from "../../src/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "../../src/services/corpus_analyzer/dto/SearchQueryString";
import {ITestEntityData, TestEntitiesDataSet} from "./testEntityDatasets";

const mapTestEntityDataToEntityOccurrences = (testEnt: ITestEntityData): EntityOccurrences => {
    const bagOfWords = new BagOfWords(...testEnt.entityWords);
    const searchQueryStrings = testEnt.containingQueries.map((query) => new SearchQueryString(query));
    return new EntityOccurrences(bagOfWords, searchQueryStrings);
};

const mapTestEntitiesDataSetToEntityOccurrences = (dataset: TestEntitiesDataSet): ReadonlyArray<EntityOccurrences> => dataset.map(mapTestEntityDataToEntityOccurrences);

export default {
    mapTestEntitiesDataSetToEntityOccurrences,
};
