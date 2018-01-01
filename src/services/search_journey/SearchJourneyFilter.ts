import {SearchJourney} from "~/dto/SearchJourney";
import isWordInteresting from "~/services/strings/InterestingWordsFilter";

export default function filterInterestingJourneys(searchJourneys: SearchJourney[]) {
    return searchJourneys.filter((journey) => isWordInteresting(journey.keyword));
}
