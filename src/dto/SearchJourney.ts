import * as crypto from "crypto";
import HistoryVisit from "~/dto/HistoryVisit";
import {SearchSession} from "~/dto/SearchSession";
import generateUniqueKey from "~/services/UniqueKeyGenerator";

/**
 * A collection of search sessions (not necessarily sequential), that have a connection by a certain keyword.
 * A search session can appear in more than one search journey.
 * A search journey needs to have minimal number of search sessions (otherwise it is not really a journey, isn’t it?)
 */
export class SearchJourney {
    public readonly keyword: string;
    public readonly members: ReadonlyArray<SearchSession>;
    public readonly uniqueKey: number;

    constructor(keyword: string, members: ReadonlyArray<SearchSession>) {
        this.keyword = keyword;
        this.members = members;
        this.uniqueKey = generateUniqueKey();
    }

    public getAllRelatedHistoryVisits(): ReadonlyArray<HistoryVisit> {
        return this.members.reduce((allVisits: ReadonlyArray<HistoryVisit>, journeyMember) =>
            allVisits.concat(journeyMember.getAllRelatedHistoryVisits()), []);
    }
}
