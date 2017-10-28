import * as React from "react";
import HistoryService from "../../services/HistoryService";
import LoadingPage from "../LoadingPage/LoadingPage";
import {SearchGroup} from "../../dto/SearchGroup";

interface ContentState {
    isLoading: boolean,
    searchGroups: SearchGroup[]
}

export class PageContent extends React.Component<{}, ContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true, searchGroups: []};

        HistoryService((searchGroups) => {
                console.log("groups are:", searchGroups);
                this.setState({
                    isLoading: false,
                    searchGroups: searchGroups
                })
            }
        );
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
                                    <p>{member.relatednessScore} - {member.visit.getTitle()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                }
            )}

        </div>
    }

}