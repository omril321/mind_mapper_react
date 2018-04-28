import {WordSearchSessions} from "~/dto/WordSearchSessions";

export interface IKeywordWeight {
    keyword: string;
    weight: number;
}

export class WordSearchesSummary {
    private static wordSessionsAsKeywordWeight(wordSearchSessions: WordSearchSessions): IKeywordWeight {
        const keyword = wordSearchSessions.word;
        const weight = wordSearchSessions.allRelatedHistoryVisits.length;

        return {keyword, weight};
    }

    public readonly keywordsWithWeight: ReadonlyArray<IKeywordWeight>;
    private readonly wordSearchSessions: ReadonlyArray<WordSearchSessions>;

    public constructor(wordSearchSessions: WordSearchSessions[]) {
        this.wordSearchSessions = wordSearchSessions;
        this.keywordsWithWeight = this.wordSearchSessions.map(WordSearchesSummary.wordSessionsAsKeywordWeight);
    }
}
