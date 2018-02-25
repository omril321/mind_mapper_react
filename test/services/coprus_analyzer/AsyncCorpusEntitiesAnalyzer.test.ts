import {mockDefaultModuleExport} from "../../testutils/jestUtils";

const fakeCombinationsGenerator = jest.fn();
mockDefaultModuleExport("~/services/corpus_analyzer/entity_detection/IncrementalEntityCombiner", fakeCombinationsGenerator);

const fakeQueryCorpusParser = jest.fn();
mockDefaultModuleExport("~/services/corpus_analyzer/corpus_parsing/QueryCorpusParser", fakeQueryCorpusParser);

import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {
    AnalyzationFinishedCallback,
    EntityAnalyzationCallback,
    startAsyncAnalyzation,
} from "~/services/corpus_analyzer/AsyncCorpusEntitiesAnalyzer";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

describe("startAsyncAnalyzation", () => {
    let generatedEntitiesCounter = 0;

    beforeEach(() => {
        fakeCombinationsGenerator.mockReset();
        fakeQueryCorpusParser.mockReset();
        generatedEntitiesCounter = 0;
    });

    const newMockedEntityOccurrences = (numOfOccurrences: number = 1) => {
        generatedEntitiesCounter++;
        const bagOfWords = new BagOfWords("" + generatedEntitiesCounter);
        const occurrences = _.times(numOfOccurrences, () => new SearchQueryString("Generated entity #" + generatedEntitiesCounter));
        return new EntityOccurrences(bagOfWords, occurrences);
    };

    const performTestAnalyzation = (initialParsedCorpusEntities: EntityOccurrences[],
                                    newEntitiesEachIteration: EntityOccurrences[][],
                                    entityCallback: EntityAnalyzationCallback,
                                    finishedCallback: AnalyzationFinishedCallback) => {
        fakeQueryCorpusParser.mockReturnValueOnce(initialParsedCorpusEntities);
        newEntitiesEachIteration.forEach((mockedResult) => fakeCombinationsGenerator.mockReturnValueOnce(mockedResult));

        // the parameter for the function does not matter, since everything is mocked
        startAsyncAnalyzation([], {entityCallback, finishedCallback});
    };

    describe("callback for analyzation completed", () => {
        it("should be called with an empty array when running on an empty input", () => {
            const finishedCallback: AnalyzationFinishedCallback = jest.fn();
            const expectedResult: EntityOccurrences[] = [];

            performTestAnalyzation([], [[]], jest.fn(), finishedCallback);

            expect(finishedCallback).toHaveBeenCalledWith(expectedResult);
        });

        it("should be called back only with the input, when there are no newly combined entities", () => {
            const finishedCallback = jest.fn();
            const mockedEnt1 = newMockedEntityOccurrences();
            const mockedEnt2 = newMockedEntityOccurrences();
            const initialOccurrences = [mockedEnt1, mockedEnt2];
            const newEntitiesOccurrences: EntityOccurrences[][] = [[]];
            const expectedResult: EntityOccurrences[] = [mockedEnt1, mockedEnt2];

            performTestAnalyzation(initialOccurrences, newEntitiesOccurrences, jest.fn(), finishedCallback);

            expect(finishedCallback).toHaveBeenCalledWith(expectedResult);
        });

        it("should be called back with the initial generated entities, along with the newly generated (combined) entities", () => {
            const finishedCallback = jest.fn();
            const mockedEnt1 = newMockedEntityOccurrences();
            const mockedEnt2 = newMockedEntityOccurrences();
            const mockedEnt3 = newMockedEntityOccurrences();
            const mockedEnt4 = newMockedEntityOccurrences();
            const mockedEnt5 = newMockedEntityOccurrences();
            const initialOccurrences = [mockedEnt1, mockedEnt2];
            const newEntitiesOccurrences: EntityOccurrences[][] = [[mockedEnt3, mockedEnt4], [mockedEnt5], [], [], []];
            // The order is a bit confusing because all entities here have same occurrences number
            const expectedResult: EntityOccurrences[] = [mockedEnt5, mockedEnt4, mockedEnt3, mockedEnt1, mockedEnt2];

            performTestAnalyzation(initialOccurrences, newEntitiesOccurrences, jest.fn(), finishedCallback);

            expect(finishedCallback).toHaveBeenCalledWith(expectedResult);
        });
    });

    describe("callback for single entity analyzation completed", () => {
        it("should not be called when input is empty", () => {
            const entityCallback: EntityAnalyzationCallback = jest.fn();

            performTestAnalyzation([], [[]], entityCallback, jest.fn());

            expect(entityCallback).not.toHaveBeenCalled();
        });

        it("should be called for each analyzed entity with expected values", () => {
            const entityCallback = jest.fn();
            // remember that generated (combined) entity, cannot have more occurrences than the sum of the combined entities
            const mockedEnt8Occs = newMockedEntityOccurrences(8);
            const mockedEnt4Occs = newMockedEntityOccurrences(4);
            const mockedEnt6Occs = newMockedEntityOccurrences(6);
            const mockedEnt3Occs = newMockedEntityOccurrences(3);
            const initialEntities = [mockedEnt8Occs];
            const newEntitiesOccurrences = [[mockedEnt4Occs, mockedEnt6Occs], [mockedEnt3Occs], [], []];
            const expectedEvent1: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [mockedEnt8Occs, mockedEnt6Occs, mockedEnt4Occs],
                analyzedEntity: mockedEnt8Occs,
                entitiesFromThisIteration: [mockedEnt4Occs, mockedEnt6Occs],
                numEntitiesAnalyzedSoFar: 1,
            };
            const expectedEvent2: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [mockedEnt8Occs, mockedEnt6Occs, mockedEnt4Occs, mockedEnt3Occs],
                analyzedEntity: mockedEnt6Occs,
                entitiesFromThisIteration: [mockedEnt3Occs],
                numEntitiesAnalyzedSoFar: 2,
            };
            const expectedEvent3: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [mockedEnt8Occs, mockedEnt6Occs, mockedEnt4Occs, mockedEnt3Occs],
                analyzedEntity: mockedEnt4Occs,
                entitiesFromThisIteration: [],
                numEntitiesAnalyzedSoFar: 3,
            };
            const expectedEvent4: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [mockedEnt8Occs, mockedEnt6Occs, mockedEnt4Occs, mockedEnt3Occs],
                analyzedEntity: mockedEnt3Occs,
                entitiesFromThisIteration: [],
                numEntitiesAnalyzedSoFar: 4,
            };

            performTestAnalyzation(initialEntities, newEntitiesOccurrences, entityCallback, jest.fn());

            expect(entityCallback.mock.calls[0][0]).toEqual(expectedEvent1);
            expect(entityCallback.mock.calls[1][0]).toEqual(expectedEvent2);
            expect(entityCallback.mock.calls[2][0]).toEqual(expectedEvent3);
            expect(entityCallback.mock.calls[3][0]).toEqual(expectedEvent4);
        });
    });
});
