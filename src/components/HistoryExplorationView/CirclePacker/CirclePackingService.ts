import * as CirclePacker from "circlepacker";

const NOOP = (): any => undefined;

interface ICirclePackerWrapperConfig {
    readonly circles: ReadonlyArray<IPackerCircleWithId>;
    readonly centerPoint: IPoint;
    readonly bounds: IRectBounds;
    readonly onCirclesMoved: (updatedCirclePositions: ICirclePackerMovementEvent) => void;
}

const packCircles = (config: ICirclePackerWrapperConfig) => {

    const packerOptions = {
        // the point that the circles should be attracted to
        // REQUIRED
        target: config.centerPoint,

        // the bounds of the area we want to draw the circles in
        // REQUIRED
        bounds: config.bounds,

        // the initial position and sizes of our circles
        // it is possible to add more circles later
        // each circle should have a unique id, a position and a radius
        // REQUIRED
        circles: config.circles,

        // true: continuous animation loop
        // false: one-time animation
        // OPTIONAL. default: true
        continuousMode: true,

        // correctness of collision calculations.
        // higher number means means longer time to calculate
        // OPTIONAL
        // default = 3
        collisionPasses: 3,

        // number of centering animations per frame.
        // higher number means faster movement and longer time to calculate
        // OPTIONAL
        // default = 1
        centeringPasses: 2,

        // callback function for when movement started
        // can get called multiple times
        // OPTIONAL
        onMoveStart: NOOP,

        // callback function for updated circle positions
        onMove: config.onCirclesMoved,

        // callback function for when movement ended
        // can get called multiple times
        // OPTIONAL
        onMoveEnd: NOOP,
    };

    const circlePacker = new CirclePacker.default(packerOptions);
};

export default packCircles;
