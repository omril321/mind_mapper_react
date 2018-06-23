import * as _ from "lodash";
import * as React from "react";
import packCircles from "~/components/HistoryExplorationView/CirclePacker/CirclePackingService";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";

interface IHistoryExplorationViewCompProps {
    readonly entitiesToShow: ReadonlyArray<EntityOccurrences>;
}

interface IHistoryExplorationViewCompState {
    readonly circlesToDraw: ReadonlyArray<IPackerCircleWithId>;
}

export class HistoryExplorationViewComp extends React.Component<IHistoryExplorationViewCompProps, IHistoryExplorationViewCompState> {
    constructor(props: IHistoryExplorationViewCompProps) {
        super(props);

        //TODO: init properly
        packCircles({
            bounds: {width: 10000, height: 10000},
            centerPoint: {x: 50, y: 50},
            circles: [
                {id: "circle1", radius: 3, position: {x: 32, y: 54}},
                {id: "circle2", radius: 6, position: {x: 24, y: 42}},
                {id: "circle3", radius: 5, position: {x: 23, y: 21}},
            ],
            onCirclesMoved: this.updateCircles.bind(this),
        });

        this.state = {circlesToDraw: []};
    }

    public render() {
        const circlesAsSvgElems = this.state.circlesToDraw.map((circle) =>
            <circle key={circle.id} r={circle.radius} cx={circle.position.x} cy={circle.position.y}/>);
        return (
            <div style={{position: "absolute", width: "100%", height: "100%"}}>
                <svg style={{width: "100%", height: "100%"}} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    {circlesAsSvgElems}
                </svg>
            </div>
        );
    }

    private updateCircles(updatedCirclePositions: ICirclePackerMovementEvent) {
        const mapCircleWithIdToStateObj = (circleData: IPackerCircle, circleId: string): IPackerCircleWithId => ({...circleData, id: circleId});

        this.setState({
            circlesToDraw: _.map(updatedCirclePositions, mapCircleWithIdToStateObj),
        });
    }
}
