import * as _ from "lodash";
import * as React from "react";
import packCircles from "~/components/HistoryExplorationView/CirclePacker/CirclePackingService";
import {ExplorationNode} from "~/components/HistoryExplorationView/ExplorationNode";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";

interface IHistoryExplorationProps {
    readonly entitiesToShow: ReadonlyArray<EntityOccurrences>;
}

interface IHistoryExplorationState {
    readonly circlesToDraw: ReadonlyArray<IPackerCircleWithId>;
    readonly currentCircleLocations: ICirclePackerMovementEvent;
    readonly startedDrawing: boolean;
}

//TODO: all of these need adjustments according to the bounds of the view...
//TODO: consider extracting these to a appConfig of the entire app
const MAX_CIRCLES_TO_DRAW = 50;
const CIRCLE_SCALE_DOWN = 5; //todo: should be relative to current scaling (smaller window size should mean smaller circles, right?
const VIEWBOX_SIZE = 100;

export class HistoryExploration extends React.Component<IHistoryExplorationProps, IHistoryExplorationState> {
    private static entityToCircle(entity: EntityOccurrences): IPackerCircleWithId {
        //TODO: find a good algorithm to show all circles
        const randomizeXOrY = () => _.random(VIEWBOX_SIZE);

        return {
            id: entity.entityWords.sortedWords.join("_"),
            position: {x: randomizeXOrY(), y: randomizeXOrY()},
            radius: entity.containingQueries.length / CIRCLE_SCALE_DOWN,
        };
    }

    constructor(props: IHistoryExplorationProps) {
        super(props);
        this.state = {
            circlesToDraw: [],
            currentCircleLocations: {},
            startedDrawing: false,
        };

        this.startDrawingIfNeeded(props);
    }

    public componentWillReceiveProps(nextProps: Readonly<IHistoryExplorationProps>,
                                     nextContext: any): void {
        this.startDrawingIfNeeded(nextProps);
    }

    public render() {
        //TODO: show a place holder if not initiated yet?

        const mapCircleWithIdToSvgObj = (circleData: IPackerCircle, circleId: string): JSX.Element => (
            <ExplorationNode key={circleId} circleToShow={{...circleData, id: circleId}}/>
        );

        const allCirclesAsSvgElems = _.map(this.state.currentCircleLocations, mapCircleWithIdToSvgObj);

        return (
            <div style={{position: "absolute", width: "100%", height: "100%"}}>
                <svg style={{width: "100%", height: "100%"}} viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} xmlns="http://www.w3.org/2000/svg">
                    {allCirclesAsSvgElems}
                </svg>
            </div>
        );
    }

    private startDrawingIfNeeded(propsToDraw: Readonly<IHistoryExplorationProps>) {
        //TODO: init properly

        if (this.state.startedDrawing) {
            return;
        }
        //TODO: show most interesting first
        const limitLength = _.take(propsToDraw.entitiesToShow, MAX_CIRCLES_TO_DRAW);
        if (limitLength.length === MAX_CIRCLES_TO_DRAW) {
            this.startDrawingEntities(limitLength);
            this.setState({startedDrawing: true});
        }

    }

    private startDrawingEntities(entities: ReadonlyArray<EntityOccurrences>) {
        const asCircles = entities.map(HistoryExploration.entityToCircle);
        //TODO: init properly
        //TODO: bounds + centerPoint properly
        packCircles({
            bounds: {width: VIEWBOX_SIZE, height: VIEWBOX_SIZE},
            centerPoint: {x: VIEWBOX_SIZE / 2, y: VIEWBOX_SIZE / 2},
            circles: asCircles,
            onCirclesMoved: this.updateCircles.bind(this),
        });
    }

    private updateCircles(updatedCirclePositions: ICirclePackerMovementEvent) {
        this.setState({
            currentCircleLocations: updatedCirclePositions,
        });

    }
}
