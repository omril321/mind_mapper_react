import {WordSearchSessions} from "~/dto/WordSearchSessions";

export interface IKeywordWeight {
    keyword: string;
    weight: number;
}

export class WordSearchesSummary {
    private static wordSessionsAsKeywordWeight(wordSearchSessions: WordSearchSessions): IKeywordWeight {
        const keyword = wordSearchSessions.word;
        const weight = wordSearchSessions.getAllRelatedHistoryVisits().length;

        return {keyword, weight};
    }

    private readonly wordSearchSessions: ReadonlyArray<WordSearchSessions>;

    public constructor(wordSearchSessions: WordSearchSessions[]) {
        this.wordSearchSessions = wordSearchSessions;
    }

    public getKeywordsWithWeight(): IKeywordWeight[] {
        return this.wordSearchSessions.map(WordSearchesSummary.wordSessionsAsKeywordWeight);
    }
}
