import * as React from "react";
import {SearchGroupComp} from "~/components/SearchGroup/SearchGroupComp";
import {SearchSession} from "~/dto/SearchSession";

interface ISearchSessionCompProps {
    readonly searchSession: SearchSession;
}

export class SearchSessionComp extends React.Component<ISearchSessionCompProps, {}> {
    constructor(props: ISearchSessionCompProps) {
        super(props);
    }

    public render() {
        const session = this.props.searchSession;
        const members = session.sessionMembers;
        const keywords = session.keywords;
        const membersComps = members.map((member) =>
            <SearchGroupComp key={member.member.uniqueId} searchGroup={member.member}/>);
        const wordsCountString = JSON.stringify(keywords.wordcount);

        return (
            <div>
                <h2>Session keywords: {wordsCountString}, with {members.length} members</h2>
                {membersComps}
            </div>);
    }
}
