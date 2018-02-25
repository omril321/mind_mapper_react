import {mockDefaultModuleExport} from "../../../testutils/jestUtils";

const fakeCombineEntities = jest.fn();
const fakeAreEntitiesCombinable = jest.fn();
const config = {minimum_occurrences_for_entity_to_be_meaningful: 2};

mockDefaultModuleExport("~/conf/config", config);
jest.setMock("~/services/corpus_analyzer/entity_detection/EntityCombiner", {
    areEntitiesCombinable: fakeAreEntitiesCombinable,
    combineEntities: fakeCombineEntities
});

import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import tryCombiningEntities from "~/services/corpus_analyzer/entity_detection/EntityCombinationUtils";

const createMockedEntityWithOccurrencesNumber = (num: number = 1, prefix: string = "") => {
    const occurrences: SearchQueryString[] = [];
    for (let i = 0; i < num; ++i) {
        occurrences.push(new SearchQueryString(_.uniqueId(prefix)));
    }
    return new EntityOccurrences(new BagOfWords(""), occurrences);
};

describe("tryCombiningEntities", () => {
    beforeEach(() => {
        fakeCombineEntities.mockReset();
        fakeAreEntitiesCombinable.mockReset();
    });

    it("should return proper error when given entities are not combinable", () => {
        fakeAreEntitiesCombinable.mockReturnValueOnce(false);
        const fakeEnt1 = createMockedEntityWithOccurrencesNumber();
        const fakeEnt2 = createMockedEntityWithOccurrencesNumber();

        const result = tryCombiningEntities(fakeEnt1, fakeEnt2, [], []);

        expect(result.error).toBe("Entities are not combinable");
        expect(result.result).toBeUndefined();
        expect(fakeAreEntitiesCombinable).toHaveBeenCalledWith(fakeEnt1, fakeEnt2);
    });

    it("should return proper error when combined entity has not enough occurrences to be meaningful", () => {
        fakeAreEntitiesCombinable.mockReturnValueOnce(true);
        const combinedEntityWithNotEnoughOcc = createMockedEntityWithOccurrencesNumber(1, "combined");
        fakeCombineEntities.mockReturnValueOnce(combinedEntityWithNotEnoughOcc);
        const fakeEnt1 = createMockedEntityWithOccurrencesNumber();
        const fakeEnt2 = createMockedEntityWithOccurrencesNumber();

        const result = tryCombiningEntities(fakeEnt1, fakeEnt2, [], []);

        expect(result.error).toBe("Combined entity does not have enough occurrences");
        expect(result.result).toBeUndefined();
        expect(fakeAreEntitiesCombinable).toHaveBeenCalledWith(fakeEnt1, fakeEnt2);
    });

    it("should return proper error when combined entity already exists in entities so far", () => {
        fakeAreEntitiesCombinable.mockReturnValueOnce(true);
        const combinedEntity = new EntityOccurrences(new BagOfWords("word"), [new SearchQueryString(""), new SearchQueryString("")]);
        const entityThatContainsCombined = new EntityOccurrences(new BagOfWords("word", "and", "some", "more"), []);
        fakeCombineEntities.mockReturnValueOnce(combinedEntity);
        const fakeEnt1 = createMockedEntityWithOccurrencesNumber();
        const fakeEnt2 = createMockedEntityWithOccurrencesNumber();
        const entitiesSoFar: EntityOccurrences[] = [entityThatContainsCombined];
        const newEntities: EntityOccurrences[] = [];

        const result = tryCombiningEntities(fakeEnt1, fakeEnt2, entitiesSoFar, newEntities);

        expect(result.error).toBe("Combined entity already exists");
        expect(result.result).toBeUndefined();
        expect(fakeAreEntitiesCombinable).toHaveBeenCalledWith(fakeEnt1, fakeEnt2);
    });

    it("should return proper error when combined entity already exists in new entities", () => {
        fakeAreEntitiesCombinable.mockReturnValueOnce(true);
        const combinedEntity = new EntityOccurrences(new BagOfWords("word"), [new SearchQueryString(""), new SearchQueryString("")]);
        const entityThatContainsCombined = new EntityOccurrences(new BagOfWords("word", "and", "some", "more"), []);
        fakeCombineEntities.mockReturnValueOnce(combinedEntity);
        const fakeEnt1 = createMockedEntityWithOccurrencesNumber();
        const fakeEnt2 = createMockedEntityWithOccurrencesNumber();
        const entitiesSoFar: EntityOccurrences[] = [];
        const newEntities: EntityOccurrences[] = [entityThatContainsCombined];

        const result = tryCombiningEntities(fakeEnt1, fakeEnt2, entitiesSoFar, newEntities);

        expect(result.error).toBe("Combined entity already exists");
        expect(result.result).toBeUndefined();
        expect(fakeAreEntitiesCombinable).toHaveBeenCalledWith(fakeEnt1, fakeEnt2);
    });

    it("should return combined entity when all validations pass", () => {
        fakeAreEntitiesCombinable.mockReturnValueOnce(true);
        const combinedEntity = new EntityOccurrences(new BagOfWords("word", "not", "contained"), [new SearchQueryString(""), new SearchQueryString("")]);
        const entityThatContainsCombined = new EntityOccurrences(new BagOfWords("word", "and", "some", "more"), []);
        fakeCombineEntities.mockReturnValueOnce(combinedEntity);
        const fakeEnt1 = createMockedEntityWithOccurrencesNumber();
        const fakeEnt2 = createMockedEntityWithOccurrencesNumber();
        const entitiesSoFar: EntityOccurrences[] = [entityThatContainsCombined];
        const newEntities: EntityOccurrences[] = [];

        const result = tryCombiningEntities(fakeEnt1, fakeEnt2, entitiesSoFar, newEntities);

        expect(result.result).toBe(combinedEntity);
        expect(result.error).toBeUndefined();
        expect(fakeAreEntitiesCombinable).toHaveBeenCalledWith(fakeEnt1, fakeEnt2);
    });
});
