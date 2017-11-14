import {SearchSession} from "~/dto/SearchSession";

/**
 * A collection of search sessions (not necessarily sequential), that have a connection by a certain keyword.
 A search session can appear in more than one search journey.
 A search journey needs to have minimal number of search sessions (otherwise it is not really a journey, isn’t it?)
 */
export class SearchJourney {
    private readonly keyword: string;
    private readonly members: ReadonlyArray<SearchSession>;

    constructor(_keyword: string, _members: ReadonlyArray<SearchSession>) {
        this.keyword = _keyword;
        this.members = _members;
    }
}