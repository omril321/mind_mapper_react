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
 * A SearchSession’s KEYWORDS are ALL the words, that appear in more than one SearchGroup in the SearchSession.
 */
export class SearchSession {
    public readonly uniqueKey: number;
    private readonly members: ISearchSessionMember[];
    private readonly keywords: WordsCount;

    public constructor(members: ISearchSessionMember[], keywords: WordsCount) {
        this.members = members;
        this.keywords = keywords;
        this.uniqueKey = generateUniqueKey();
    }

    public getKeywords(): WordsCount {
        return this.keywords;
    }

    public getKeywordsAsStrings(): ReadonlyArray<string> {
        return this.getKeywords().getWordsOnly().words;
    }

    public getSessionMembers(): ReadonlyArray<ISearchSessionMember> {
        return this.members;
    }
}
