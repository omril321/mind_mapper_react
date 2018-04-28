import HistoryVisit from "~/dto/HistoryVisit";
import {SearchSession} from "~/dto/SearchSession";
import generateUniqueKey from "~/services/UniqueKeyGenerator";

/**
 * A collection of search sessions (not necessarily sequential), that have a connection by a certain word.
 * A search session can appear in more than one word search object.
 * A word search object needs to have minimal number of search sessions
 */
export class WordSearchSessions {
    private static getAllRelatedHistoryVisits(sessionMembers: ReadonlyArray<SearchSession>): ReadonlyArray<HistoryVisit> {
        return sessionMembers.reduce((allVisits: ReadonlyArray<HistoryVisit>, session) =>
            allVisits.concat(session.allRelatedHistoryVisits), []);
    }

    public readonly word: string;
    public readonly sessions: ReadonlyArray<SearchSession>;
    public readonly uniqueKey: number;

    public readonly allRelatedHistoryVisits: ReadonlyArray<HistoryVisit>;

    constructor(word: string, members: ReadonlyArray<SearchSession>) {
        this.word = word;
        this.sessions = members;
        this.uniqueKey = generateUniqueKey();
        this.allRelatedHistoryVisits = WordSearchSessions.getAllRelatedHistoryVisits(this.sessions);
    }
}
