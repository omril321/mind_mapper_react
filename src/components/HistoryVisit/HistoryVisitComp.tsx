import * as React from "react";
import HistoryVisit from "~/dto/HistoryVisit";

interface IHistoryVisitCompProps {
    readonly visit: HistoryVisit;
}

export class HistoryVisitComp extends React.Component<IHistoryVisitCompProps, {}> {
    constructor(props: IHistoryVisitCompProps) {
        super(props);
    }

    public render() {
        const visit = this.props.visit;
        return (
            <div>
                <a href={visit.visitUrl}>{visit.visitTitle}</a>
            </div>
        );
    }
}
