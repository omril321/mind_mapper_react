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
        const members = session.getSessionMembers();
        const keywords = session.getKeywords();
        const membersComps = members.map((member) =>
            <SearchGroupComp key={member.member.getUniqueKey()} searchGroup={member.member}/>);
        const wordsCountString = JSON.stringify(keywords.getWordCount());

        return (
            <div>
                <h2>Session keywords: {wordsCountString}</h2>
                <h3>Num of members: {members.length}, which are:</h3>
                {membersComps}
            </div>);
    }
}
