import * as React from "react";
import {SearchGroup} from "~/dto/SearchGroup";

interface SearchGroupCompProps {
    readonly searchGroup: SearchGroup;
}
export class SearchGroupComp extends React.Component<SearchGroupCompProps, {}> {
    constructor(props: SearchGroupCompProps) {
        super(props);
    }

    render() {
        const search = this.props.searchGroup.getSearch();
        const members = this.props.searchGroup.getMembers();
        //TODO: what's the id of the item?
        return <div>
            <h2>Search: {search.getSearchQuery()}</h2>
            <h2>Members:</h2>
            {members.map(member => <h3>{member.visit.getTitle()}</h3>)}
        </div>
    }
}