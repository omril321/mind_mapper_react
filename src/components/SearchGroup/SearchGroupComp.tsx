import * as React from "react";
import {HistoryVisitComp} from "~/components/HistoryVisit/HistoryVisitComp";
import {SearchGroup} from "~/dto/SearchGroup";

interface ISearchGroupCompProps {
    readonly searchGroup: SearchGroup;
}

export class SearchGroupComp extends React.Component<ISearchGroupCompProps, {}> {
    constructor(props: ISearchGroupCompProps) {
        super(props);
    }

    public render() {
        const search = this.props.searchGroup.getSearch();
        const members = this.props.searchGroup.getGroupMembers();

        const membersComps = members.map((member) =>
            <HistoryVisitComp key={member.visit.getUniqueKey()} visit={member.visit}/>);

        return (
            <div>
                <h4>Search Group: {search.getSearchQuery()}</h4>
                <h5>Members:</h5> {membersComps}
            </div>);
    }
}
