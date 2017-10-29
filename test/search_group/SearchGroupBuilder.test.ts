import SearchGroupBuilder from "../../src/services/search_group/SearchGroupsBuilder";
import PossibleSearchGroup from "../../src/dto/PossibleSearchGroup";
import {googleSearchFor, historyVisitFor} from "../testutils/builder";
import {SearchGroup} from "../../src/dto/SearchGroup";
import {RelatednessScore} from "../../src/dto/RelatednessScore";

describe('SearchGroupBuilder', () => {
    it('should return an empty array when given an empty array', () => {
        const builder = new SearchGroupBuilder([]);

        const searchGroups = builder.build();

        expect(searchGroups).toEqual([]);
    });

    it('should return a search groups with scores of each of the visits', () => {
        const group1_visit1 = historyVisitFor('urls matters not', "search result title");
        const group1_visit2 = historyVisitFor('urls matters not', "this is not related");
        const group1_visit3 = historyVisitFor('urls matters not', "some related result");
        const search1 = googleSearchFor("some search");
        const possible1 = new PossibleSearchGroup(search1, [
            group1_visit1,
            group1_visit2,
            group1_visit3
        ]);
        const expected1 = new SearchGroup(search1, [
            {visit: group1_visit1, score: new RelatednessScore(1)},
            {visit: group1_visit2, score: new RelatednessScore(0)},
            {visit: group1_visit3, score: new RelatednessScore(1)},
        ]);

        const group2_visit1 = historyVisitFor('urls matters not', "related visit");
        const group2_visit2 = historyVisitFor('urls matters not', "not related");
        const search2 = googleSearchFor("find visit");
        const possible2 = new PossibleSearchGroup(search2, [
            group2_visit1,
            group2_visit2
        ]);
        const expected2 = new SearchGroup(search2, [
            {visit: group2_visit1, score: new RelatednessScore(1)},
            {visit: group2_visit2, score: new RelatednessScore(0)},
        ]);


        const expected = [expected1, expected2];
        const builder = new SearchGroupBuilder([possible1, possible2]);

        const searchGroups = builder.build();

        expect(JSON.stringify(searchGroups)).toEqual(JSON.stringify(expected));
    });
});