import {mockDefaultModuleExport} from "../../testutils/jestUtils";

const fakeCombinationsGenerator = jest.fn();
mockDefaultModuleExport("~/services/corpus_analyzer/entity_detection/IncrementalEntityCombiner", fakeCombinationsGenerator);

const fakeQueryCorpusParser = jest.fn();
mockDefaultModuleExport("~/services/corpus_analyzer/corpus_parsing/QueryCorpusParser", fakeQueryCorpusParser);

import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {
    EntityAnalyzationCallback,
    startAnalyzation,
} from "~/services/corpus_analyzer/CorpusEntitiesAnalyzer";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import IAsyncEntityAnalyzationIterationEvent from "~/services/corpus_analyzer/dto/IAsyncEntityAnalyzationIterationEvent";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

describe("startAnalyzation", () => {
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
                                    entityCallback: EntityAnalyzationCallback) => {
        fakeQueryCorpusParser.mockReturnValueOnce(initialParsedCorpusEntities);
        newEntitiesEachIteration.forEach((mockedResult) => fakeCombinationsGenerator.mockReturnValueOnce(mockedResult));

        // the parameter for the function does not matter, since everything is mocked
        startAnalyzation([], entityCallback);
    };

    describe("entity callback", () => {
        it("should fire default event when the entities array is empty", () => {
            const entityAnalyzationCallback = jest.fn();
            const expectedEvent: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [],
                analyzedEntity: undefined,
                entitiesFromThisIteration: [],
                isLastAnalyzation: true,
                numEntitiesAnalyzedSoFar: 0,
            };

            performTestAnalyzation([], [[]], entityAnalyzationCallback);

            expect(entityAnalyzationCallback).toHaveBeenCalledWith(expectedEvent);
        });

        it("should be called for each analyzed entity with expected values", () => {
            const entityAnalyzationCallback = jest.fn();
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
                isLastAnalyzation: false,
                numEntitiesAnalyzedSoFar: 1,
            };
            const expectedEvent2: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [mockedEnt8Occs, mockedEnt6Occs, mockedEnt4Occs, mockedEnt3Occs],
                analyzedEntity: mockedEnt6Occs,
                entitiesFromThisIteration: [mockedEnt3Occs],
                isLastAnalyzation: false,
                numEntitiesAnalyzedSoFar: 2,
            };
            const expectedEvent3: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [mockedEnt8Occs, mockedEnt6Occs, mockedEnt4Occs, mockedEnt3Occs],
                analyzedEntity: mockedEnt4Occs,
                entitiesFromThisIteration: [],
                isLastAnalyzation: false,
                numEntitiesAnalyzedSoFar: 3,
            };
            const expectedEvent4: IAsyncEntityAnalyzationIterationEvent = {
                allKnownEntities: [mockedEnt8Occs, mockedEnt6Occs, mockedEnt4Occs, mockedEnt3Occs],
                analyzedEntity: mockedEnt3Occs,
                entitiesFromThisIteration: [],
                isLastAnalyzation: false,
                numEntitiesAnalyzedSoFar: 4,
            };
            const expectedEvent5AndFinal: IAsyncEntityAnalyzationIterationEvent = {...expectedEvent4, isLastAnalyzation: true};

            performTestAnalyzation(initialEntities, newEntitiesOccurrences, entityAnalyzationCallback);

            expect(entityAnalyzationCallback.mock.calls.length).toEqual(5);
            expect(entityAnalyzationCallback.mock.calls[0][0]).toEqual(expectedEvent1);
            expect(entityAnalyzationCallback.mock.calls[1][0]).toEqual(expectedEvent2);
            expect(entityAnalyzationCallback.mock.calls[2][0]).toEqual(expectedEvent3);
            expect(entityAnalyzationCallback.mock.calls[3][0]).toEqual(expectedEvent4);
            expect(entityAnalyzationCallback.mock.calls[4][0]).toEqual(expectedEvent5AndFinal);
        });
    });
});
