import HistoryVisit from "~/dto/HistoryVisit";
import GoogleSearch from "~/dto/GoogleSearch";
import PossibleSearchGroup from "~/dto/PossibleSearchGroup";
import {ChromeHistoryItem} from "~/dto/ChromeHistoryItem";

export default class PossibleSearchGroupBuilder {
    private readonly historyItems: ReadonlyArray<ChromeHistoryItem>;

    constructor(_historyItems: ReadonlyArray<ChromeHistoryItem>) {
        this.historyItems = _historyItems;
    }

    public build(): PossibleSearchGroup[] {

        console.log("starting getting possible groups...");
        const possibleGroups = this.groupBySearches();
        console.log("finished getting possible groups. number: ", possibleGroups.length);

        return possibleGroups;
    }


    private groupBySearches(): PossibleSearchGroup[] {
        //assume items are sorted by date, descending (first is new, last is old)
        const groups: PossibleSearchGroup[] = [];

        let currentIndex = 0;
        let firstItemInGroupIndex = 0;
        while (currentIndex < this.historyItems.length) {
            const asSearch = this.asGoogleSearchByIndex(currentIndex);
            if (asSearch !== null) {
                //found search, add this group.
                const itemsInGroup = this.historyItems.slice(firstItemInGroupIndex, currentIndex)
                    .map(item => new HistoryVisit(item));
                const group = new PossibleSearchGroup(asSearch, itemsInGroup);
                groups.push(group);

                firstItemInGroupIndex = currentIndex + 1; //set the first item in the next group.
            }

            ++currentIndex;
        }

        return groups;
    }

    private asGoogleSearchByIndex(visitIndex: number): GoogleSearch | null {
        const visit = this.historyItems[visitIndex];
        return PossibleSearchGroupBuilder.asGoogleSearch(new HistoryVisit(visit));
    }

    private static asGoogleSearch(visit: HistoryVisit): GoogleSearch | null {
        try {
            return new GoogleSearch(visit);
        } catch (error) {
            return null;
        }
    }

}
