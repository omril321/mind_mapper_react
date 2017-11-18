import {RelatednessScore} from "../../src/dto/RelatednessScore";
import {ISearchGroupMember, SearchGroup} from "../../src/dto/SearchGroup";
import {googleSearchFor, historyVisitFor} from "../testutils/builder";

describe("SearchGroup", () => {
    it("should return the members when using getter", () => {
        const googleSearch = googleSearchFor("some search");
        const member1: ISearchGroupMember = {
            score: new RelatednessScore(0.5),
            visit: historyVisitFor("some url", "title1"),
        };
        const member2: ISearchGroupMember = {
            score: new RelatednessScore(1),
            visit: historyVisitFor("another url", "another title"),
        };
        const members = [member1, member2];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getGroupMembers()).toBe(members);
    });

    it("should return the google search when using getter", () => {
        const googleSearch = googleSearchFor("some search");
        const member1: ISearchGroupMember = {
            score: new RelatednessScore(0.5),
            visit: historyVisitFor("some url", "title1"),
        };
        const member2: ISearchGroupMember = {
            score: new RelatednessScore(1),
            visit: historyVisitFor("another url", "another title"),
        };
        const members = [member1, member2];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getSearch()).toBe(googleSearch);
    });

    it("should return no members when the group is empty", () => {
        const googleSearch = googleSearchFor("some search");
        const searchGroup = new SearchGroup(googleSearch, []);

        expect(searchGroup.getMembersWithAtLeastRelatedness(-100)).toEqual([]);
    });

    it("should return only members with at least relatedness", () => {
        const googleSearch = googleSearchFor("some search");
        const member1: ISearchGroupMember = {
            score: new RelatednessScore(0.5),
            visit: historyVisitFor("some url", "title1"),
        };
        const member2: ISearchGroupMember = {
            score: new RelatednessScore(1),
            visit: historyVisitFor("another url", "another title"),
        };
        const member3: ISearchGroupMember = {
            score: new RelatednessScore(0),
            visit: historyVisitFor("url3", "title..."),
        };
        const members = [member1, member2, member3];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getMembersWithAtLeastRelatedness(0.5)).toEqual([member1, member2]);
    });

    it("Should return the id of the search when calling getUniqueKey", () => {
        const googleSearch = googleSearchFor("something");
        const searchGroup = new SearchGroup(googleSearch, []);
        const expected = googleSearch.getUniqueId();

        const actual = searchGroup.getUniqueKey();

        expect(actual).toEqual(expected);
    });
});
