import {SearchSession} from "~/dto/SearchSession";
import {SearchJourney} from "~/dto/SearchJourney";
import BagOfWords from "~/dto/BagOfWords";
import * as _ from "lodash";


type PotentialSearchJourneys = { [keyword: string]: Array<SearchSession> }

export class SearchJourneyBuilder {
    private static readonly MINIMUM_JOURNEY_MEMBERS = 1;

    private readonly sessions: ReadonlyArray<SearchSession>;

    constructor(buildFrom: ReadonlyArray<SearchSession>) {
        this.sessions = buildFrom;
    }

    public build(): Array<SearchJourney> {
        const allPotentialJourneys: PotentialSearchJourneys = this.getAllPotentialJourneys();
        this.sessions.forEach(session => {
            const keywordsOfSession = SearchJourneyBuilder.keywordsOfSessionAsString(session);
            keywordsOfSession.forEach(word => allPotentialJourneys[word].push(session))
        });

        return SearchJourneyBuilder.finalizePotentialJourneys(allPotentialJourneys);
    }

    private getAllKeywordsOfSessions(): BagOfWords {

        let words: string[] = [];
        words = this.sessions.reduce((allWords, currentSession) => {
            const currentWords = SearchJourneyBuilder.keywordsOfSessionAsString(currentSession);
            return allWords.concat(currentWords);
        }, words);

        return new BagOfWords(...words);
    }

    private getAllPotentialJourneys(): PotentialSearchJourneys {
        const potentialJourneys: PotentialSearchJourneys = {};
        const allKeywords = this.getAllKeywordsOfSessions();
        const initPotentialJourneyOfKeyword = (keyword: string) => {
            potentialJourneys[keyword] = []
        };
        allKeywords.getWords().forEach(initPotentialJourneyOfKeyword);
        return potentialJourneys;
    }

    private static keywordsOfSessionAsString(session: SearchSession): string[] {
        return [...session.getKeywordsAsStrings()];
    }

    private static finalizePotentialJourneys(potentialJourneys: PotentialSearchJourneys): Array<SearchJourney> {
        const allJourneyKeywords = _.keys(potentialJourneys);
        const keywordJourneyHasEnoughMembers = (keyword: string) => potentialJourneys[keyword].length >= SearchJourneyBuilder.MINIMUM_JOURNEY_MEMBERS;
        const keywordJourneyToSearchJourney = (keyword: string) => new SearchJourney(keyword, potentialJourneys[keyword]);
        return allJourneyKeywords
            .filter(keywordJourneyHasEnoughMembers)
            .map(keywordJourneyToSearchJourney);
    }
}