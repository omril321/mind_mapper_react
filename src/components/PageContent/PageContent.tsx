import * as React from "react";
import {ChromeHistoryService} from "~/services/ChromeHistoryService";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
import {HistoryItemsProcessor} from "~/services/HistoryItemsProcessor";
import {SearchSession} from "~/dto/SearchSession";

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
        return <div id="content">
            <LoadingPage isLoading={isLoading}/>

            {this.state.searchSessions.map((searchSession, index) => {
                    return <div key={index}>
                        <div>
                            {searchSession.getKeywords()}
                            {/*<h4>{searchGroup.getSearch().getSearchQuery()}</h4>*/}
                            {/*{searchGroup.getMembersWithAtLeastRelatedness(0.1)*/}
                                {/*.map((member, index) =>*/}
                                    {/*<div key={index}>*/}
                                        {/*<p>{member.score.value} - {member.visit.getTitle()}</p>*/}
                                    {/*</div>*/}
                                {/*)}*/}
                        </div>
                    </div>
                }
            )}

        </div>
    }

}