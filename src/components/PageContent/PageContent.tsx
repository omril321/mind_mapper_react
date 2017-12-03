import * as React from "react";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
import {SearchJourneyComp} from "~/components/SearchJourney/SearchJourneyComp";
import {SearchJourney} from "~/dto/SearchJourney";
import {SearchSession} from "~/dto/SearchSession";
import {ChromeHistoryService} from "~/services/ChromeHistoryService";
import {HistoryItemsProcessor} from "~/services/HistoryItemsProcessor";

interface IContentState {
    isLoading: boolean;
    searchSessions: SearchSession[];
    searchJourneys: SearchJourney[];
}

export class PageContent extends React.Component<{}, IContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true, searchSessions: [], searchJourneys: []};

        // TODO: move this to somewhere else?
        const historyService = new ChromeHistoryService((items) => {
            const processedResult = new HistoryItemsProcessor().processHistoryItems(items);
            this.setState({
                isLoading: false,
                searchJourneys: processedResult.searchJourneys,
                searchSessions: processedResult.searchSessions,
            });
        });

        historyService.startQuery();
    }

    public render() {
        const isLoading = this.state.isLoading;
        const allJourneys = this.state.searchJourneys;
        const journeysComps = allJourneys.map((journey) => {
            return <SearchJourneyComp key={journey.uniqueKey} searchJourney={journey}/>;
        });
        return (
            <div id="content">
                <LoadingPage isLoading={isLoading}/>
                {journeysComps}
            </div>);
    }

}
