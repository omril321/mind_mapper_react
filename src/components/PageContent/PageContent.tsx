import * as React from "react";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
import {SearchSessionComp} from "~/components/SearchSession/SearchSessionComp";
import {SearchSession} from "~/dto/SearchSession";
import {ChromeHistoryService} from "~/services/ChromeHistoryService";
import {HistoryItemsProcessor} from "~/services/HistoryItemsProcessor";

interface IContentState {
    isLoading: boolean;
    searchSessions: SearchSession[];
}

export class PageContent extends React.Component<{}, IContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true, searchSessions: []};

        // TODO: move this to somewhere else?
        const historyService = new ChromeHistoryService((items) => {
            const searchSessions = new HistoryItemsProcessor().processHistoryItems(items);
            this.setState({
                isLoading: false,
                searchSessions,
            });
        });

        historyService.startQuery();
    }

    public render() {
        const isLoading = this.state.isLoading;
        const allSessions = this.state.searchSessions;
        const sessionComps = allSessions.map((session) => {
            return <SearchSessionComp key={session.uniqueKey} searchSession={session}/>;
        });
        return (
            <div id="content">
                <LoadingPage isLoading={isLoading}/>
                {sessionComps}
            </div>);
    }

}
