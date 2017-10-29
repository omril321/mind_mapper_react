import PossibleSearchGroupBuilder from "../../src/services/possible_search_group/PossibleSearchGroupBuilder";
import {ChromeHistoryItem} from "../../src/dto/ChromeHistoryItem";
import {googleSearchUrlFor, historyItemFor} from "../testutils/builder";
import PossibleSearchGroup from "../../src/dto/PossibleSearchGroup";
import GoogleSearch from "../../src/dto/GoogleSearch";
import HistoryVisit from "../../src/dto/HistoryVisit";

describe('PossibleSearchGroupBuilder', () => {
    it('should return no groups when no items are provided', () => {
        const builder = new PossibleSearchGroupBuilder([]);

        const groups = builder.build();

        expect(groups).toEqual([]);
    });

    it('should all following history visits when a search has following visits', () => {
        const related1 = historyItemFor("react.com", "react");
        const related2 = historyItemFor("angular.com", "tests");
        const related3 = historyItemFor("something.com", "something");
        const searchVisit = historyItemFor(googleSearchUrlFor("react tests"), "react tests - Google Search");
        const nonRelatedVisit = historyItemFor("react.com", "react subject1");
        const items: ChromeHistoryItem[] = [ //first is last visit
            related3,
            related2,
            related1,
            searchVisit,
            nonRelatedVisit
        ];
        const search = new GoogleSearch(new HistoryVisit(searchVisit));
        const expected: PossibleSearchGroup[] = [
            new PossibleSearchGroup(search,
                [
                    new HistoryVisit(related3),
                    new HistoryVisit(related2),
                    new HistoryVisit(related1)
                ]
            )
        ];

        const builder = new PossibleSearchGroupBuilder(items);
        const groups = builder.build();

        expect(JSON.stringify(groups)).toEqual(JSON.stringify(expected));
    });

    it('should all following history visits when a search has multiple groups, when one is empty', () => {
        const related2 = historyItemFor("related2", "related2");
        const related1 = historyItemFor("related1", "related1");
        const searchVisit2 = historyItemFor(googleSearchUrlFor("visit2"), "visit2 - Google Search");
        const searchVisit1 = historyItemFor(googleSearchUrlFor("visit1"), "visit1 - Google Search");
        const nonRelatedVisit = historyItemFor("nonRelated", "nonRelated");
        const items: ChromeHistoryItem[] = [ //first is last visit
            related2,
            related1,
            searchVisit2,
            searchVisit1,
            nonRelatedVisit
        ];
        const search1 = new GoogleSearch(new HistoryVisit(searchVisit1));
        const search2 = new GoogleSearch(new HistoryVisit(searchVisit2));
        const expected: PossibleSearchGroup[] = [
            new PossibleSearchGroup(search2,
                [
                    new HistoryVisit(related2),
                    new HistoryVisit(related1)
                ]
            ), new PossibleSearchGroup(search1, [])
        ];

        const builder = new PossibleSearchGroupBuilder(items);
        const groups = builder.build();

        expect(JSON.stringify(groups)).toEqual(JSON.stringify(expected));
    });

    it('should should return no possible groups when no search query was in history', () => {
        const related3 = historyItemFor("related3", "related3");
        const related2 = historyItemFor("related2", "related2");
        const related1 = historyItemFor("related1", "related1");
        const items: ChromeHistoryItem[] = [ //first is last visit
            related3,
            related2,
            related1,
        ];
        const expected: PossibleSearchGroup[] = [];

        const builder = new PossibleSearchGroupBuilder(items);
        const groups = builder.build();

        expect(JSON.stringify(groups)).toEqual(JSON.stringify(expected));
    });
});