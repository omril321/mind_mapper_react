import * as React from "react";
import {ChromeHistoryService} from "~/services/ChromeHistoryService";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
import {HistoryItemsProcessor} from "~/services/HistoryItemsProcessor";
import {SearchSession} from "~/dto/SearchSession";
import {SearchSessionComp} from "~/components/SearchSession/SearchSessionComp";

interface ContentState {
    isLoading: boolean,
    searchSessions: SearchSession[]
}

export class PageContent extends React.Component<{}, ContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true, searchSessions: []};

        //TODO: move this to somewhere else?
        const historyService = new ChromeHistoryService((items) => {
                const searchSessions = new HistoryItemsProcessor().processHistoryItems(items);
                console.log("sessions are:", searchSessions);
                console.log("sessions longer than 2 are: ", searchSessions.filter(session => session.getMembers().length > 2))
                this.setState({
                    isLoading: false,
                    searchSessions: searchSessions
                })
            }
        );

        historyService.startQuery();
    }

    render() {
        const isLoading = this.state.isLoading;
        const allSessions = this.state.searchSessions;
        return <div id="content">
            <LoadingPage isLoading={isLoading}/>

            {allSessions.map(session => <SearchSessionComp key={session.uniqueKey} searchSession={session}/>)}

        </div>
    }

}