import {SearchJourney} from "~/dto/SearchJourney";

export interface IKeywordWeight {
    keyword: string;
    weight: number;
}

export class JourneysSummary {
    private static journeyAsKeywordWeight(journey: SearchJourney): IKeywordWeight {
        const keyword = journey.keyword;
        const weight = journey.getAllRelatedHistoryVisits().length;

        return {keyword, weight};
    }

    private readonly searchJourneys: ReadonlyArray<SearchJourney>;

    public constructor(searchJourneys: SearchJourney[]) {
        this.searchJourneys = searchJourneys;
    }

    public getKeywordsWithWeight(): IKeywordWeight[] {
        return this.searchJourneys.map(JourneysSummary.journeyAsKeywordWeight);
    }
}
