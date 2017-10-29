const MIN_SCORE = 0;
const MAX_SCORE = 1;

export class RelatednessScore {

    public readonly value: number;

    constructor(value: number) {
        if (!RelatednessScore.inRange(value)) {
            throw new Error(`The following value is not a valid score: ${value}`);
        }

        this.value = value
    }

    private static inRange(value: number) {
        return value >= MIN_SCORE && value <= MAX_SCORE;
    }
}