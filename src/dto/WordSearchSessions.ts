import HistoryVisit from "~/dto/HistoryVisit";
import {SearchSession} from "~/dto/SearchSession";
import generateUniqueKey from "~/services/UniqueKeyGenerator";

/**
 * A collection of search sessions (not necessarily sequential), that have a connection by a certain word.
 * A search session can appear in more than one word search object.
 * A word search object needs to have minimal number of search sessions
 */
export class WordSearchSessions {
    public readonly word: string;
    public readonly sessions: ReadonlyArray<SearchSession>;
    public readonly uniqueKey: number;

    constructor(word: string, members: ReadonlyArray<SearchSession>) {
        this.word = word;
        this.sessions = members;
        this.uniqueKey = generateUniqueKey();
    }

    public getAllRelatedHistoryVisits(): ReadonlyArray<HistoryVisit> {
        return this.sessions.reduce((allVisits: ReadonlyArray<HistoryVisit>, session) =>
            allVisits.concat(session.getAllRelatedHistoryVisits()), []);
    }
}
