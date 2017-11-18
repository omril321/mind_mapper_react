import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {SearchJourney} from "~/dto/SearchJourney";
import {SearchSession} from "~/dto/SearchSession";

interface IPotentialSearchJourneys { [keyword: string]: SearchSession[]; }

export class SearchJourneyBuilder {
    private static readonly MINIMUM_JOURNEY_MEMBERS = 2;

    private static keywordsOfSessionAsString(session: SearchSession): string[] {
        return [...session.getKeywordsAsStrings()];
    }

    private static finalizePotentialJourneys(potentialJourneys: IPotentialSearchJourneys): SearchJourney[] {
        const allJourneyKeywords = _.keys(potentialJourneys);
        const keywordJourneyHasEnoughMembers = (keyword: string) =>
            potentialJourneys[keyword].length >= SearchJourneyBuilder.MINIMUM_JOURNEY_MEMBERS;
        const keywordJourneyToSearchJourney = (keyword: string) =>
            new SearchJourney(keyword, potentialJourneys[keyword]);
        return allJourneyKeywords
            .filter(keywordJourneyHasEnoughMembers)
            .map(keywordJourneyToSearchJourney);
    }

    private readonly sessions: ReadonlyArray<SearchSession>;

    constructor(buildFrom: ReadonlyArray<SearchSession>) {
        this.sessions = buildFrom;
    }

    public build(): SearchJourney[] {
        const allPotentialJourneys: IPotentialSearchJourneys = this.getAllPotentialJourneys();
        this.sessions.forEach((session) => {
            const keywordsOfSession = SearchJourneyBuilder.keywordsOfSessionAsString(session);
            keywordsOfSession.forEach((word) => allPotentialJourneys[word].push(session));
        });

        const searchJourneys = SearchJourneyBuilder.finalizePotentialJourneys(allPotentialJourneys);
        return searchJourneys;
    }

    private getAllKeywordsOfSessions(): BagOfWords {

        let words: string[] = [];
        words = this.sessions.reduce((allWords, currentSession) => {
            const currentWords = SearchJourneyBuilder.keywordsOfSessionAsString(currentSession);
            return allWords.concat(currentWords);
        }, words);

        return new BagOfWords(...words);
    }

    private getAllPotentialJourneys(): IPotentialSearchJourneys {
        const potentialJourneys: IPotentialSearchJourneys = {};
        const allKeywords = this.getAllKeywordsOfSessions();
        const initPotentialJourneyOfKeyword = (keyword: string) => {
            potentialJourneys[keyword] = [];
        };
        allKeywords.words.forEach(initPotentialJourneyOfKeyword);
        return potentialJourneys;
    }
}
