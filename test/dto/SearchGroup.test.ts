import {RelatednessScore} from "../../src/dto/RelatednessScore";
import {ISearchGroupMember, SearchGroup} from "../../src/dto/SearchGroup";
import {googleSearchFor, historyVisitFor} from "../testutils/builder";

describe("SearchGroup", () => {

    describe("getAllRelatedHistoryVisits", () => {
        it("should return an empty array when group is empty", () => {
            const googleSearch = googleSearchFor("some search");
            const searchGroup = new SearchGroup(googleSearch, []);

            expect(searchGroup.getAllRelatedHistoryVisits()).toEqual([]);
        });

        it("should return an empty array when all members are with score 0", () => {
            const googleSearch = googleSearchFor("some search");
            const members: ISearchGroupMember[] = [
                {score: new RelatednessScore(0), visit: historyVisitFor("some url", "title1")},
                {score: new RelatednessScore(0), visit: historyVisitFor("another url", "title2")},
                {score: new RelatednessScore(0), visit: historyVisitFor("url again!", "title3")},
            ];
            const searchGroup = new SearchGroup(googleSearch, members);

            const result = searchGroup.getAllRelatedHistoryVisits();

            expect(result).toEqual([]);
        });

        it("should return only visits with non-zero relatedness", () => {
            const googleSearch = googleSearchFor("some search");
            const related1 = {score: new RelatednessScore(0.001), visit: historyVisitFor("some url", "title1")};
            const related2 = {score: new RelatednessScore(1), visit: historyVisitFor("another url", "title2")};
            const nonRelated = {score: new RelatednessScore(0), visit: historyVisitFor("url again!", "title3")};
            const members: ISearchGroupMember[] = [related1, nonRelated, related2];
            const searchGroup = new SearchGroup(googleSearch, members);

            const result = searchGroup.getAllRelatedHistoryVisits();

            expect(result).toEqual([related1.visit, related2.visit]);
        });
    });

    describe("getUniqueKey", () => {
        it("Should return the id of the search", () => {
            const googleSearch = googleSearchFor("something");
            const searchGroup = new SearchGroup(googleSearch, []);
            const expected = googleSearch.getUniqueId();

            const actual = searchGroup.getUniqueKey();

            expect(actual).toEqual(expected);
        });
    });
});
