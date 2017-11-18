import * as React from "react";
import {HistoryVisitComp} from "~/components/HistoryVisit/HistoryVisitComp";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
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
            // console.log("sessions are:", searchSessions);
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
        const allFirstVisits = allSessions.map((session) => {
            const firstSessionMember = session.getSessionMembers()[0];
            const firstGroupMember = firstSessionMember.member.getGroupMembers()[0];
            if (firstGroupMember === undefined) { // empty search group - a search without visits
                return undefined;
            }
            const visit = firstGroupMember.visit;

            return <HistoryVisitComp key={visit.getUniqueKey()} visit={visit}/>;
        });
        return (
            <div id="content">
                <LoadingPage isLoading={isLoading}/>

                {allFirstVisits}
                {/*{allSessions.map(session => <SearchSessionComp key={session.uniqueKey} searchSession={session}/>)}*/}

            </div>);
    }

}
