import {mockDefaultModuleExport} from "../../../testutils/jestUtils";

const fakeTryCombiningEntities = jest.fn();
mockDefaultModuleExport("~/services/corpus_analyzer/entity_detection/EntityCombinationUtils", fakeTryCombiningEntities);

import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";
import generateCombinationsForEntity from "~/services/corpus_analyzer/entity_detection/IncrementalEntityCombiner";

const createMockedEntity = (prefix: string = "") => {
    const occurrences: SearchQueryString[] = [];
    return new EntityOccurrences(new BagOfWords(_.uniqueId(prefix)), occurrences);
};

describe("generateCombinationsForEntity", () => {
    beforeEach(() => {
        fakeTryCombiningEntities.mockReset();
    });

    it("should return an empty array, given an empty array of known entities", () => {
        const entityToAnalyze = new EntityOccurrences(new BagOfWords(), []);
        const entitiesSoFar: EntityOccurrences[] = [];
        const expected: EntityOccurrences[] = [];

        const result = generateCombinationsForEntity(entityToAnalyze, entitiesSoFar);

        expect(result).toEqual(expected);
    });

    it("should return a unique set of the new entities", () => {
        const fakeEntity = createMockedEntity();
        fakeTryCombiningEntities
            .mockReturnValueOnce({result: fakeEntity})
            .mockReturnValueOnce({result: fakeEntity});
        const entityToAnalyze: EntityOccurrences = new EntityOccurrences(new BagOfWords(), []);
        const entitiesSoFar: EntityOccurrences[] = [createMockedEntity(), createMockedEntity()];
        const expected: EntityOccurrences[] = [fakeEntity];

        const result = generateCombinationsForEntity(entityToAnalyze, entitiesSoFar);

        expect(result).toEqual(expected);
    });

    it("should return the combined entities when some combinations failed", () => {
        const fakeEntity1 = createMockedEntity();
        const fakeEntity2 = createMockedEntity();
        fakeTryCombiningEntities
            .mockReturnValueOnce({result: fakeEntity1})
            .mockReturnValueOnce({error: "Whoops"})
            .mockReturnValueOnce({result: fakeEntity2});
        const entityToAnalyze: EntityOccurrences = new EntityOccurrences(new BagOfWords(), []);
        const entitiesSoFar: EntityOccurrences[] = [createMockedEntity(), createMockedEntity(), createMockedEntity()];
        const expected: EntityOccurrences[] = [fakeEntity1, fakeEntity2];

        const result = generateCombinationsForEntity(entityToAnalyze, entitiesSoFar);

        expect(result).toEqual(expected);
    });
});
