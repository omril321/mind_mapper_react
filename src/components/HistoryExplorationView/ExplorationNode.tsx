import * as React from "react";

interface IExplorationNodeProps {
    readonly circleToShow: IPackerCircleWithId;
}

interface IExplorationNodeState {
    readonly lastCenterPointDrawn: IPoint;
}

const FONT_SIZE = 2;
const MIN_POINT_MOVEMENT_FOR_REDRAW = 0.01;

export class ExplorationNode extends React.Component<IExplorationNodeProps, IExplorationNodeState> {
    constructor(props: IExplorationNodeProps) {
        super(props);
        this.state = {
            lastCenterPointDrawn: {x: Number.MIN_VALUE, y: Number.MIN_VALUE},
        };
    }

    public render() {
        const circle = this.props.circleToShow;
        return (
            //TODO: extract CSS classes
            <g>
                <circle r={circle.radius} cx={circle.position.x} cy={circle.position.y} fill="pink"/>
                <text x={circle.position.x} y={circle.position.y} fontSize={FONT_SIZE} textAnchor="middle">{circle.id}</text>
            </g>
        );
    }

    public shouldComponentUpdate(nextProps: Readonly<IExplorationNodeProps>, nextState: Readonly<IExplorationNodeState>): boolean {
        return this.isPointFarEnoughFromLastDrawnPoint(nextProps.circleToShow.position);
    }

    private isPointFarEnoughFromLastDrawnPoint(newPointPosition: IPoint) {
        const lastDrawnPoint = this.state.lastCenterPointDrawn;
        return Math.abs(lastDrawnPoint.x - newPointPosition.x) >= MIN_POINT_MOVEMENT_FOR_REDRAW ||
            Math.abs(lastDrawnPoint.y - newPointPosition.y) >= MIN_POINT_MOVEMENT_FOR_REDRAW;
    }

}
