import PossibleSearchGroup from "../../src/dto/PossibleSearchGroup";
import {googleSearchFor, historyVisitFor} from "../testutils/builder";

describe('PossibleSearchGroup', () => {
    it('should return the search using getter', () => {
        const googleSearch = googleSearchFor("some search");
        const group = new PossibleSearchGroup(googleSearch, []);

        expect(group.search).toBe(googleSearch);
    });

    it('should return the visits using getter', () => {
        const googleSearch = googleSearchFor("some search");
        const visit1 = historyVisitFor("some url", "some title");
        const visit2 = historyVisitFor("another url", "another title");
        const visits = [visit1, visit2];
        const group = new PossibleSearchGroup(googleSearch, visits);

        expect(group.visits).toBe(visits);
    });
});