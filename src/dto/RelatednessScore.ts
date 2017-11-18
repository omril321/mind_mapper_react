export class RelatednessScore {
    private static readonly MIN_SCORE = 0;
    private static readonly MAX_SCORE = 1;

    private static inRange(value: number) {
        return value >= RelatednessScore.MIN_SCORE && value <= RelatednessScore.MAX_SCORE;
    }

    public readonly value: number;

    constructor(value: number) {
        if (!RelatednessScore.inRange(value)) {
            throw new Error(`The following value is not a valid score: ${value}`);
        }

        this.value = value;
    }
}
