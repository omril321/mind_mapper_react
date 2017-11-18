export interface IChromeHistoryItem {
    readonly id: string;
    readonly url?: string;
    readonly title?: string;
    readonly lastVisitTime?: number;
    readonly visitCount?: number;
    readonly typedCount?: number;
}
