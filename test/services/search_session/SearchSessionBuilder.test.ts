import buildSearchSessions from "../../../src/services/search_session/SearchSessionBuilder";
import {SearchGroup} from "../../../src/dto/SearchGroup";
import {googleSearchFor} from "../../testutils/builder";
import {SearchSession, ISearchSessionMember} from "../../../src/dto/SearchSession";
import WordsCount from "../../../src/dto/WordsCount";
import BagOfWords from "../../../src/dto/BagOfWords";
import {splitToWords} from "../../../src/services/strings/Words";
import {RelatednessScore} from "../../../src/dto/RelatednessScore";

interface GroupMemberTestSubject {
    group: SearchGroup;
    member: ISearchSessionMember;
}

function buildGroupMemberTestSubjectForQuery(searchQuery: string): GroupMemberTestSubject {
    const group = new SearchGroup(googleSearchFor(searchQuery), []);
    return {
        group: group,
        member: {member: group, score: new RelatednessScore(1)}
    }
}

describe('SearchSessionBuilder', () => {
    it('should build an empty search session when given an empty array of groups', () => {
        const groups: SearchGroup[] = [];
        const expected = [];
        const result = buildSearchSessions(groups);

        expect(result).toEqual(expected);
    });

    it('should build single search session when given two groups with shared search query', () => {
        const subject1 = buildGroupMemberTestSubjectForQuery('first test');
        const subject2 = buildGroupMemberTestSubjectForQuery('second test');
        const subject3 = buildGroupMemberTestSubjectForQuery('test number three');
        const groups = [subject1.group, subject2.group, subject3.group];
        const expectedMembers = [subject1.member, subject2.member, subject3.member];
        const expectedWords = {
            'first': 1,
            'second': 1,
            'three': 1,
            'test': 3,
            'number': 1
        };

        const result = buildSearchSessions(groups);

        expect(result.length).toEqual(1);
        expect(result[0].getSessionMembers()).toEqual(expectedMembers);
        expect(result[0].getKeywords().getWordCount()).toEqual(expectedWords);
    });

    it('should build 3 search sessions when given 3 groups with no common words', () => {
        const subject1 = buildGroupMemberTestSubjectForQuery('first thing');
        const subject2 = buildGroupMemberTestSubjectForQuery('something else');
        const subject3 = buildGroupMemberTestSubjectForQuery('not related');
        const groups = [subject1.group, subject2.group, subject3.group];
        const expectedMembers1 = [subject1.member];
        const expectedWords1 = {'first': 1, 'thing': 1};
        const expectedMembers2 = [subject2.member];
        const expectedWords2 = {'something': 1, 'else': 1};
        const expectedMembers3 = [subject3.member];
        const expectedWords3 = {'not': 1, 'related': 1};

        const result = buildSearchSessions(groups);

        expect(result.length).toEqual(3);
        expect(result[0].getSessionMembers()).toEqual(expectedMembers1);
        expect(result[0].getKeywords().getWordCount()).toEqual(expectedWords1);
        expect(result[1].getSessionMembers()).toEqual(expectedMembers2);
        expect(result[1].getKeywords().getWordCount()).toEqual(expectedWords2);
        expect(result[2].getSessionMembers()).toEqual(expectedMembers3);
        expect(result[2].getKeywords().getWordCount()).toEqual(expectedWords3);
    });

    it('should build 2 sessions when give 4 search groups, that are split to groups of 2 by common words', () => {
        const subject1 = buildGroupMemberTestSubjectForQuery('first subject');
        const subject2 = buildGroupMemberTestSubjectForQuery('second subject');
        const subject3 = buildGroupMemberTestSubjectForQuery('something else');
        const subject4 = buildGroupMemberTestSubjectForQuery('another something');
        const groups = [subject1.group, subject2.group, subject3.group, subject4.group];
        const expectedMembers1 = [subject1.member, subject2.member];
        const expectedWords1 = {'first': 1, 'subject': 2, 'second': 1};
        const expectedMembers2 = [subject3.member, subject4.member];
        const expectedWords2 = {'something': 2, 'else': 1, 'another': 1};

        const result = buildSearchSessions(groups);

        expect(result.length).toEqual(2);
        expect(result[0].getSessionMembers()).toEqual(expectedMembers1);
        expect(result[0].getKeywords().getWordCount()).toEqual(expectedWords1);
        expect(result[1].getSessionMembers()).toEqual(expectedMembers2);
        expect(result[1].getKeywords().getWordCount()).toEqual(expectedWords2);
    });
});