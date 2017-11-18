import {SearchGroup, ISearchGroupMember} from "../../src/dto/SearchGroup";
import {googleSearchFor, historyVisitFor} from "../testutils/builder";
import {RelatednessScore} from "../../src/dto/RelatednessScore";

describe('SearchGroup', () => {
    it('should return the members when using getter', () => {
        const googleSearch = googleSearchFor("some search");
        const member1: ISearchGroupMember = {visit: historyVisitFor("some url", "title1"), score: new RelatednessScore(0.5)};
        const member2: ISearchGroupMember = {visit: historyVisitFor("another url", "another title"), score: new RelatednessScore(1)};
        const members = [member1, member2];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getGroupMembers()).toBe(members);
    });

    it('should return the google search when using getter', () => {
        const googleSearch = googleSearchFor("some search");
        const member1: ISearchGroupMember = {visit: historyVisitFor("some url", "title1"), score: new RelatednessScore(0.5)};
        const member2: ISearchGroupMember = {visit: historyVisitFor("another url", "another title"), score: new RelatednessScore(1)};
        const members = [member1, member2];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getSearch()).toBe(googleSearch);
    });

    it('should return no members when the group is empty', () => {
        const googleSearch = googleSearchFor("some search");
        const searchGroup = new SearchGroup(googleSearch, []);

        expect(searchGroup.getMembersWithAtLeastRelatedness(-100)).toEqual([]);
    });

    it('should return only members with at least relatedness', () => {
        const googleSearch = googleSearchFor("some search");
        const member1: ISearchGroupMember = {visit: historyVisitFor("some url", "title1"), score: new RelatednessScore(0.5)};
        const member2: ISearchGroupMember = {visit: historyVisitFor("another url", "another title"), score: new RelatednessScore(1)};
        const member3: ISearchGroupMember = {visit: historyVisitFor("url3", "title..."), score: new RelatednessScore(0)};
        const members = [member1, member2, member3];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getMembersWithAtLeastRelatedness(0.5)).toEqual([member1, member2]);
    });
});