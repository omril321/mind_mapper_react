import {RelatednessScore} from "~/dto/RelatednessScore";
import {SearchGroup} from "~/dto/SearchGroup";
import {ISearchSessionMember, SearchSession} from "~/dto/SearchSession";
import buildSearchSessions from "../../../src/services/history_items/search_session/SearchSessionBuilder";
import {googleSearchFor} from "../../testutils/builder";

interface IGroupMemberTestSubject {
    group: SearchGroup;
    member: ISearchSessionMember;
}

function buildGroupMemberTestSubjectForQuery(searchQuery: string): IGroupMemberTestSubject {
    const group = new SearchGroup(googleSearchFor(searchQuery), []);
    return {
        group,
        member: {member: group, score: new RelatednessScore(1)},
    };
}

describe("SearchSessionBuilder", () => {
    it("should build an empty search session when given an empty array of groups", () => {
        const groups: SearchGroup[] = [];
        const expected: SearchSession[] = [];
        const result = buildSearchSessions(groups);

        expect(result).toEqual(expected);
    });

    it("should build single search session when given two groups with shared search query", () => {
        const subject1 = buildGroupMemberTestSubjectForQuery("first test");
        const subject2 = buildGroupMemberTestSubjectForQuery("second test");
        const subject3 = buildGroupMemberTestSubjectForQuery("test number three");
        const groups = [subject1.group, subject2.group, subject3.group];
        const expectedMembers = [subject1.member, subject2.member, subject3.member];
        const expectedWords = {
            first: 1,
            number: 1,
            second: 1,
            test: 3,
            three: 1,
        };

        const result = buildSearchSessions(groups);

        expect(result.length).toEqual(1);
        expect(result[0].sessionMembers).toEqual(expectedMembers);
        expect(result[0].keywords.wordcount).toEqual(expectedWords);
    });

    it("should build 3 search sessions when given 3 groups with no common sortedWords", () => {
        const subject1 = buildGroupMemberTestSubjectForQuery("first thing");
        const subject2 = buildGroupMemberTestSubjectForQuery("something else");
        const subject3 = buildGroupMemberTestSubjectForQuery("not related");
        const groups = [subject1.group, subject2.group, subject3.group];
        const expectedMembers1 = [subject1.member];
        const expectedWords1 = {first: 1, thing: 1};
        const expectedMembers2 = [subject2.member];
        const expectedWords2 = {something: 1, else: 1};
        const expectedMembers3 = [subject3.member];
        const expectedWords3 = {not: 1, related: 1};

        const result = buildSearchSessions(groups);

        expect(result.length).toEqual(3);
        expect(result[0].sessionMembers).toEqual(expectedMembers1);
        expect(result[0].keywords.wordcount).toEqual(expectedWords1);
        expect(result[1].sessionMembers).toEqual(expectedMembers2);
        expect(result[1].keywords.wordcount).toEqual(expectedWords2);
        expect(result[2].sessionMembers).toEqual(expectedMembers3);
        expect(result[2].keywords.wordcount).toEqual(expectedWords3);
    });

    it("should build 2 sessions when give 4 search groups, that are split to groups of 2 by common sortedWords", () => {
        const subject1 = buildGroupMemberTestSubjectForQuery("first subject");
        const subject2 = buildGroupMemberTestSubjectForQuery("second subject");
        const subject3 = buildGroupMemberTestSubjectForQuery("something else");
        const subject4 = buildGroupMemberTestSubjectForQuery("another something");
        const groups = [subject1.group, subject2.group, subject3.group, subject4.group];
        const expectedMembers1 = [subject1.member, subject2.member];
        const expectedWords1 = {first: 1, subject: 2, second: 1};
        const expectedMembers2 = [subject3.member, subject4.member];
        const expectedWords2 = {something: 2, else: 1, another: 1};

        const result = buildSearchSessions(groups);

        expect(result.length).toEqual(2);
        expect(result[0].sessionMembers).toEqual(expectedMembers1);
        expect(result[0].keywords.wordcount).toEqual(expectedWords1);
        expect(result[1].sessionMembers).toEqual(expectedMembers2);
        expect(result[1].keywords.wordcount).toEqual(expectedWords2);
    });
});
