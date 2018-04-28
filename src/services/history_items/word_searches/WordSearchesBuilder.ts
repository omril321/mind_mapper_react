import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {SearchSession} from "~/dto/SearchSession";
import {WordSearchSessions} from "~/dto/WordSearchSessions";

interface IPotentialWordSearches {
    [keyword: string]: SearchSession[];
}

export class WordSearchesBuilder {
    private static readonly MINIMUM_REQ_WORD_SEARCHES = 2;

    private static keywordsOfSessionAsString(session: SearchSession): string[] {
        return [...session.keywordsAsStrings];
    }

    private static finalizePotentialWordSearches(potentialWordSearches: IPotentialWordSearches): WordSearchSessions[] {
        const allWords = _.keys(potentialWordSearches);
        const wordHasEnoughSearches = (keyword: string) =>
            potentialWordSearches[keyword].length >= WordSearchesBuilder.MINIMUM_REQ_WORD_SEARCHES;
        const wordToWordSearchesObject = (keyword: string) =>
            new WordSearchSessions(keyword, potentialWordSearches[keyword]);
        return allWords
            .filter(wordHasEnoughSearches)
            .map(wordToWordSearchesObject);
    }

    private readonly sessions: ReadonlyArray<SearchSession>;

    constructor(buildFrom: ReadonlyArray<SearchSession>) {
        this.sessions = buildFrom;
    }

    public build(): WordSearchSessions[] {
        const allPotentialWordSearches: IPotentialWordSearches = this.getAllPotentialWordSearches();
        this.sessions.forEach((session) => {
            const keywordsOfSession = WordSearchesBuilder.keywordsOfSessionAsString(session);
            keywordsOfSession.forEach((word) => allPotentialWordSearches[word].push(session));
        });

        return WordSearchesBuilder.finalizePotentialWordSearches(allPotentialWordSearches);
    }

    private getAllKeywordsOfSessions(): BagOfWords {

        let words: string[] = [];
        words = this.sessions.reduce((allWords, currentSession) => {
            const currentWords = WordSearchesBuilder.keywordsOfSessionAsString(currentSession);
            return allWords.concat(currentWords);
        }, words);

        return new BagOfWords(...words);
    }

    private getAllPotentialWordSearches(): IPotentialWordSearches {
        const potentialWordSearches: IPotentialWordSearches = {};
        const allKeywords = this.getAllKeywordsOfSessions();
        const initSessionsOfWord = (keyword: string) => {
            potentialWordSearches[keyword] = [];
        };
        allKeywords.sortedWords.forEach(initSessionsOfWord);
        return potentialWordSearches;
    }
}
