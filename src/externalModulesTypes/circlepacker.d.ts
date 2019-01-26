interface IPoint {
    readonly x: number;
    readonly y: number;
}

interface IRectBounds {
    readonly width: number;
    readonly height: number;
}

interface IPackerCircle {
    readonly radius: number;
    readonly position: IPoint;
}

interface IPackerCircleWithId extends IPackerCircle {
    readonly id: string;
}

interface IPackerSingleCircleEvent extends IPackerCircle {
    readonly delta: IPoint;
    readonly previousPosition: IPoint;
}

interface ICirclePackerMovementEvent {
    [circleId: string]: IPackerSingleCircleEvent;
}

interface ICirclePackerOptions {
    readonly target: IPoint;
    readonly bounds: IRectBounds;
    readonly circles: ReadonlyArray<IPackerCircleWithId>;
    readonly onMove: (updatedCirclePositions: ICirclePackerMovementEvent) => void;
    readonly continuousMode?: boolean;
    readonly collisionPasses?: number;
    readonly centeringPasses?: number;
    readonly onMoveStart?: () => void;
    readonly onMoveEnd?: () => void;
}

declare module "circlepacker" {
    export default class {
        public setDamping: (damping: number) => void;

        constructor(configs: ICirclePackerOptions);

    }
}
