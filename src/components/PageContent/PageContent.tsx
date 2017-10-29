import * as React from "react";
import {ChromeHistoryService} from "~/services/ChromeHistoryService";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
import {SearchGroup} from "~/dto/SearchGroup";
import {HistoryItemsProcessor} from "~/services/HistoryItemsProcessor";

interface ContentState {
    isLoading: boolean,
    searchGroups: SearchGroup[]
}

export class PageContent extends React.Component<{}, ContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true, searchGroups: []};

        //TODO: refactor this
        const historyService = new ChromeHistoryService((items) => {
                const searchGroups = new HistoryItemsProcessor().processHistoryItems(items);
                console.log("groups are:", searchGroups);
                this.setState({
                    isLoading: false,
                    searchGroups: searchGroups
                })
            }
        );

        historyService.startQuery();
    }

    render() {
        const isLoading = this.state.isLoading;
        return <div id="content">
            <LoadingPage isLoading={isLoading}/>

            {this.state.searchGroups.map((searchGroup, index) => {
                    return <div key={index}>
                        <div>
                            <h4>{searchGroup.getSearch().getSearchQuery()}</h4>
                            {searchGroup.getMembers().map((member, index) =>
                                <div key={index}>
                                    <p>{member.score.value} - {member.visit.getTitle()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                }
            )}

        </div>
    }

}