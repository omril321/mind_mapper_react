import {SearchGroup} from "./SearchGroup";

export interface SearchSessionMember {
    readonly member: SearchGroup;
    readonly relatednessScore: number
}

/**
 * A SearchSession is consisted of multiple SearchGroups that are related to each other in some way.
 * For example, a search for "flex alignment", and a following search for "flex position",
 * can become a search session, since the combination of the two searches can become a new conclusion.
 */
export class SearchSession {
    readonly members: ReadonlyArray<SearchSessionMember>;

    public constructor(_members: ReadonlyArray<SearchSessionMember>) {
        this.members = _members;
    }
}