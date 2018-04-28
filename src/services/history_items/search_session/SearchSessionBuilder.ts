import BagOfWords from "~/dto/BagOfWords";
import {RelatednessScore} from "~/dto/RelatednessScore";
import {SearchGroup} from "~/dto/SearchGroup";
import {ISearchSessionMember, SearchSession} from "~/dto/SearchSession";
import WordsCount from "~/dto/WordsCount";
import {splitToWords} from "~/services/strings/Words";

interface ISearchSessionBuild {
    members: SearchGroup[];
    wordsSoFar: BagOfWords;
}

export default function buildSearchSessions(buildFrom: ReadonlyArray<SearchGroup>): SearchSession[] {
    const builds: ISearchSessionBuild[] = [];
    const allSessionsUnderConstruction = buildFrom.reduce(addToPreviousSearchSessionOrAddNew, builds);
    return finalizedSearchSessions(allSessionsUnderConstruction);
}

function searchGroupQueryAsBagOfWords(group: SearchGroup): BagOfWords {
    return splitToWords(group.search.searchQuery);
}

const addToPreviousSearchSessionOrAddNew = (allSearchSessions: ISearchSessionBuild[], currentGroup: SearchGroup) => {
    function addSearchGroupAsSearchSessionBuild(group: SearchGroup) {
        const newSession: ISearchSessionBuild = {
            members: [group],
            wordsSoFar: searchGroupQueryAsBagOfWords(group),
        };
        allSearchSessions.push(newSession);
    }

    if (allSearchSessions.length === 0) { // empty, add first member
        addSearchGroupAsSearchSessionBuild(currentGroup);
    } else { // not empty
        const currentSearchSession = allSearchSessions[allSearchSessions.length - 1];
        // decide if the current search group needs to be added to the last session, or be added to a new session
        const currentSessionWords = currentSearchSession.wordsSoFar;
        const currentGroupWords = searchGroupQueryAsBagOfWords(currentGroup);
        const isGroupRelatedToSearch = BagOfWords.hasCommonWords(currentSessionWords, currentGroupWords);

        if (isGroupRelatedToSearch) {
            const sessionWithGroupWords: string[] = [...currentSessionWords.sortedWords, ...currentGroupWords.sortedWords];
            currentSearchSession.wordsSoFar = new BagOfWords(...sessionWithGroupWords);
            currentSearchSession.members.push(currentGroup);
        } else {
            addSearchGroupAsSearchSessionBuild(currentGroup);
        }
    }

    return allSearchSessions;
};

function finalizedSearchSessions(builds: ISearchSessionBuild[]): SearchSession[] {
    function finalizeSearchSession(build: ISearchSessionBuild): SearchSession {
        const members: ISearchSessionMember[] = build.members.map((member) => {
            return {member, score: new RelatednessScore(1)};
        });

        const words: BagOfWords[] = build.members.map(searchGroupQueryAsBagOfWords);
        return new SearchSession(members, new WordsCount(words));
    }
    return builds.map(finalizeSearchSession);
}
