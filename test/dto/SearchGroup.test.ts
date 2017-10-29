import {SearchGroup, SearchGroupMember} from "../../src/dto/SearchGroup";
import {googleSearchFor, historyVisitFor} from "../testutils/builder";

describe('SearchGroup', () => {
    it('should return the members when using getter', () => {
        const googleSearch = googleSearchFor("some search");
        const member1: SearchGroupMember = {visit: historyVisitFor("some url", "title1"), relatednessScore: 0.5};
        const member2: SearchGroupMember = {visit: historyVisitFor("another url", "another title"), relatednessScore: 1};
        const members = [member1, member2];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getMembers()).toBe(members);
    });

    it('should return the google search when using getter', () => {
        const googleSearch = googleSearchFor("some search");
        const member1: SearchGroupMember = {visit: historyVisitFor("some url", "title1"), relatednessScore: 0.5};
        const member2: SearchGroupMember = {visit: historyVisitFor("another url", "another title"), relatednessScore: 1};
        const members = [member1, member2];
        const searchGroup = new SearchGroup(googleSearch, members);

        expect(searchGroup.getSearch()).toBe(googleSearch);
    });
});