// @ts-ignore
import CirclePacker from "~/../node_modules/circlepacker/dist/circlepacker.es6.js";
import appConfig from "~/conf/appConfig";

const NOOP = (): any => undefined;

interface ICirclePackerWrapperConfig {
    readonly circles: ReadonlyArray<IPackerCircleWithId>;
    readonly centerPoint: IPoint;
    readonly bounds: IRectBounds;
    readonly onCirclesMoved: (updatedCirclePositions: ICirclePackerMovementEvent) => void;
}

const packCircles = (packingConfig: ICirclePackerWrapperConfig) => {

    const packerOptions = {
        // the point that the circles should be attracted to
        // REQUIRED
        target: packingConfig.centerPoint,

        // the bounds of the area we want to draw the circles in
        // REQUIRED
        bounds: packingConfig.bounds,

        // the initial position and sizes of our circles
        // it is possible to add more circles later
        // each circle should have a unique id, a position and a radius
        // REQUIRED
        circles: packingConfig.circles,

        // true: continuous animation loop
        // false: one-time animation
        // OPTIONAL. default: true
        continuousMode: true,

        // correctness of collision calculations.
        // higher number means means longer time to calculate
        // OPTIONAL
        // default = 3
        collisionPasses: appConfig.circlePacking.collisionPasses,

        // number of centering animations per frame.
        // higher number means faster movement and longer time to calculate
        // OPTIONAL
        // default = 1
        centeringPasses: appConfig.circlePacking.centeringPasses,

        // callback function for when movement started
        // can get called multiple times
        // OPTIONAL
        onMoveStart: NOOP,

        // callback function for updated circle positions
        onMove: packingConfig.onCirclesMoved,

        // callback function for when movement ended
        // can get called multiple times
        // OPTIONAL
        onMoveEnd: NOOP,
    };

    const circlePacker = new CirclePacker(packerOptions);

    circlePacker.setDamping(appConfig.circlePacking.damping);
};

export default packCircles;
