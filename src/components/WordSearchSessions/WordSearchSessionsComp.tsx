import * as React from "react";
import {SearchSessionComp} from "~/components/SearchSession/SearchSessionComp";
import {WordSearchSessions} from "~/dto/WordSearchSessions";

interface IWordSearchSessionsCompProps {
    readonly wordSearchSessions: WordSearchSessions;
}

export class WordSearchSessionsComp extends React.Component<IWordSearchSessionsCompProps, {}> {
    constructor(props: IWordSearchSessionsCompProps) {
        super(props);
    }

    public render() {
        const keyword = this.props.wordSearchSessions.word;
        const sessions = this.props.wordSearchSessions.sessions;
        const totalNumberOfVisits = this.props.wordSearchSessions.getAllRelatedHistoryVisits().length;

        const membersComps = sessions.map((session) =>
            <SearchSessionComp key={session.uniqueKey} searchSession={session}/>);

        return (
            <div>
                <h1>Word Searches: {keyword} ({totalNumberOfVisits} related visits)</h1>
                {membersComps}
            </div>);
    }
}
