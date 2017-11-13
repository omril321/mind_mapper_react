import * as React from "react";
import {SearchSession} from "~/dto/SearchSession";

interface SearchSessionCompProps {
    readonly searchSession: SearchSession;
}

export class SearchSessionComp extends React.Component<SearchSessionCompProps, {}> {
    constructor(props: SearchSessionCompProps) {
        super(props);
    }

    render() {
        const session = this.props.searchSession;
        const members = session.getMembers();
        const keywords = session.getKeywords();

        return <div>
            <h2>Session keywords: {JSON.stringify(keywords.getWordCount())}</h2>
            <h3>Num of members: {members.length}</h3>
        </div>
    }
}