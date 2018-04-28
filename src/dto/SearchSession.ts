import HistoryVisit from "~/dto/HistoryVisit";
import {RelatednessScore} from "~/dto/RelatednessScore";
import {SearchGroup} from "~/dto/SearchGroup";
import WordsCount from "~/dto/WordsCount";
import generateUniqueKey from "~/services/UniqueKeyGenerator";

export interface ISearchSessionMember {
    readonly member: SearchGroup;
    readonly score: RelatednessScore;
}

/**
 * a non-empty collection of sequential search groups, which their searches have a relatedness score of above 0.
 * A SearchSession’s KEYWORDS are ALL the sortedWords, that appear in more than one SearchGroup in the SearchSession.
 */
export class SearchSession {
    private static getAllRelatedHistoryVisits(sessionMembers: ReadonlyArray<ISearchSessionMember>): ReadonlyArray<HistoryVisit> {
        return sessionMembers.reduce((allVisits: ReadonlyArray<HistoryVisit>, sessionMember) => {
            if (sessionMember.score.value > 0) {
                allVisits = allVisits.concat(sessionMember.member.allRelatedHistoryVisits);
            }
            return allVisits;
        }, []);
    }

    public readonly uniqueKey: number;
    public readonly sessionMembers: ReadonlyArray<ISearchSessionMember>;
    public readonly keywords: WordsCount;
    public readonly keywordsAsStrings: ReadonlyArray<string>;

    public readonly allRelatedHistoryVisits: ReadonlyArray<HistoryVisit>;

    public constructor(members: ISearchSessionMember[], keywords: WordsCount) {
        this.sessionMembers = members;
        this.keywords = keywords;
        this.uniqueKey = generateUniqueKey();
        this.keywordsAsStrings = this.keywords.wordsOnly.sortedWords;
        this.allRelatedHistoryVisits = SearchSession.getAllRelatedHistoryVisits(this.sessionMembers);
    }
}
