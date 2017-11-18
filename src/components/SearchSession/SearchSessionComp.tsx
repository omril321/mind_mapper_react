import * as React from "react";
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

        return (
            <div>
                <h2>Session keywords: {JSON.stringify(keywords.getWordCount())}</h2>
                <h3>Num of members: {members.length}</h3>
            </div>);
    }
}
