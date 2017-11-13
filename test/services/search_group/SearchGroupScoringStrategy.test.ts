import calculateRelatedness from "../../../src/services/search_group/SearchGroupScoringStrategy";
import HistoryVisit from "../../../src/dto/HistoryVisit";
import {googleSearchFor} from "../../testutils/builder";

describe('SearchGroupScoringStrategy', () => {
    it('should return a score of 1 if the search contains a word from the title of the visit', () => {
        const visit = new HistoryVisit({id: 1, title: "this is a test"});
        const search = googleSearchFor("test");

        const score = calculateRelatedness(visit, search);

        expect(score.value).toBe(1);
    });

    it('should return a score of 1 if the visit title contains a word from search query', () => {
        const visit = new HistoryVisit({id: 1, title: "test"});
        const search = googleSearchFor("this is another test");

        const score = calculateRelatedness(visit, search);

        expect(score.value).toBe(1);
    });

    it('should return a score of 0 if the visit title and search query has no common words', () => {
        const visit = new HistoryVisit({id: 1, title: "angular js"});
        const search = googleSearchFor("react");

        const score = calculateRelatedness(visit, search);

        expect(score.value).toBe(0);
    });

    it('should return a score of 0 if the visit title is empty', () => {
        const visit = new HistoryVisit({id: 1, title: ""});
        const search = googleSearchFor("react related search");

        const score = calculateRelatedness(visit, search);

        expect(score.value).toBe(0);
    });

    it('should return a score of 0 if the search query is only space', () => {
        const visit = new HistoryVisit({id: 1, title: "react related search"});
        const search = googleSearchFor(" ");

        const score = calculateRelatedness(visit, search);

        expect(score.value).toBe(0);
    });
});