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
        const search = this.props.searchGroup.search;
        const visitsToRender = this.props.searchGroup.getAllRelatedHistoryVisits();

        const visitComps = visitsToRender.map((visit) =>
            <HistoryVisitComp key={visit.getUniqueKey()} visit={visit}/>);

        return (
            <div>
                <h4>Search Group: {search.getSearchQuery()}</h4>
                {visitComps}
            </div>);
    }
}
