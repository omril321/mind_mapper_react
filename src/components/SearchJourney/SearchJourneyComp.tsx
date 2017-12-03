import * as React from "react";
import {SearchSessionComp} from "~/components/SearchSession/SearchSessionComp";
import {SearchJourney} from "~/dto/SearchJourney";

interface ISearchJourneyCompProps {
    readonly searchJourney: SearchJourney;
}

export class SearchJourneyComp extends React.Component<ISearchJourneyCompProps, {}> {
    constructor(props: ISearchJourneyCompProps) {
        super(props);
    }

    public render() {
        const keyword = this.props.searchJourney.keyword;
        const members = this.props.searchJourney.members;
        const totalNumberOfVisits = this.props.searchJourney.getAllRelatedHistoryVisits().length;

        const membersComps = members.map((member) =>
            <SearchSessionComp key={member.uniqueKey} searchSession={member}/>);

        return (
            <div>
                <h1>Search Journey Keyword: {keyword} ({totalNumberOfVisits} related visits)</h1>
                {membersComps}
            </div>);
    }
}
