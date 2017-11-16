import * as React from "react";
import HistoryVisit from "~/dto/HistoryVisit";

interface HistoryVisitCompProps {
    readonly visit: HistoryVisit;
}

export class HistoryVisitComp extends React.Component<HistoryVisitCompProps, {}> {
    constructor(props: HistoryVisitCompProps) {
        super(props);
    }

    render() {
        const visit = this.props.visit;
        return <div key={visit.getUniqueKey()}>
            <a href={visit.getVisitUrl()}>{visit.getTitle()}</a>
        </div>
    }
}