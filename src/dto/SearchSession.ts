import {SearchGroup} from "~/dto/SearchGroup";
import {countKeywords, KeywordsCount, splitToWords} from "~/services/strings/Words";

export interface SearchSessionMember {
    readonly member: SearchGroup;
    readonly relatednessScore: number
}

/**
 * a non-empty collection of sequential search groups, which their searches have a relatedness score of above 0.
 * A SearchSession’s KEYWORDS are ALL the words, that appear in more than one SearchGroup in the SearchSession.
 */
export class SearchSession {
    readonly members: ReadonlyArray<SearchSessionMember>;
    readonly keywords: KeywordsCount;

    public constructor(_members: ReadonlyArray<SearchSessionMember>) {
        this.members = _members;
        this.keywords = this.getKeywords(this.members);
    }

    //TODO: this should be in a SearchSessionBuilder
    private getKeywords(members: ReadonlyArray<SearchSessionMember>): KeywordsCount {
        const queries = members.map(member => member.member.getSearch().getSearchQuery());
        const bags = queries.map(splitToWords);
        return countKeywords(bags);
    }

}
