import {SearchGroup} from "~/dto/SearchGroup";
import {RelatednessScore} from "~/dto/RelatednessScore";
import WordsCount from "~/dto/WordsCount";
import generateUniqueKey from "~/services/UniqueKeyGenerator";

export interface SearchSessionMember {
    readonly member: SearchGroup;
    readonly score: RelatednessScore
}

/**
 * a non-empty collection of sequential search groups, which their searches have a relatedness score of above 0.
 * A SearchSession’s KEYWORDS are ALL the words, that appear in more than one SearchGroup in the SearchSession.
 */
export class SearchSession {
    private readonly members: Array<SearchSessionMember>;
    private readonly keywords: WordsCount;
    public readonly uniqueKey: number;

    public constructor(_members: Array<SearchSessionMember>, _keywords: WordsCount) {
        this.members = _members;
        this.keywords = _keywords;
        this.uniqueKey = generateUniqueKey();
    }

    public getKeywords(): WordsCount {
        return this.keywords;
    }

    public getKeywordsAsStrings(): ReadonlyArray<string> {
        return this.getKeywords().getWordsOnly().getWords();
    }

    public getMembers(): ReadonlyArray<SearchSessionMember> {
        return this.members;
    }
}
