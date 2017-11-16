import * as React from "react";
import {SearchGroup} from "~/dto/SearchGroup";
import {HistoryVisitComp} from "~/components/HistoryVisit/HistoryVisitComp";

interface SearchGroupCompProps {
    readonly searchGroup: SearchGroup;
}

export class SearchGroupComp extends React.Component<SearchGroupCompProps, {}> {
    constructor(props: SearchGroupCompProps) {
        super(props);
    }

    render() {
        const search = this.props.searchGroup.getSearch();
        const members = this.props.searchGroup.getGroupMembers();

        return <div key={search.getUniqueId()}>
            <h2>Search: {search.getSearchQuery()}</h2>
            <h2>Members:</h2>
            {members.map(member => <HistoryVisitComp visit={member.visit}/>)}
        </div>
    }
}