import {SearchSession, SearchSessionMember} from "~/dto/SearchSession";
import {SearchGroup} from "~/dto/SearchGroup";
import {splitToWords} from "~/services/strings/Words";
import BagOfWords from "~/dto/BagOfWords";
import WordsCount from "~/dto/WordsCount";
import {RelatednessScore} from "~/dto/RelatednessScore";


interface SearchSessionBuild {
    members: SearchGroup[];
    wordsSoFar: BagOfWords;
}

export default function buildSearchSessions(buildFrom: ReadonlyArray<SearchGroup>): SearchSession[] {
    const builds: SearchSessionBuild[] = [];
    const allSessionsUnderConstruction = buildFrom.reduce(addToPreviousSearchSessionOrAddNew, builds);
    return finalizedSearchSessions(allSessionsUnderConstruction);
}

function searchGroupQueryAsBagOfWords(group: SearchGroup): BagOfWords {
    return splitToWords(group.getSearch().getSearchQuery())
}


const addToPreviousSearchSessionOrAddNew = (allSearchSessions: SearchSessionBuild[], currentGroup: SearchGroup) => {
    function addSearchGroupAsSearchSessionBuild(group: SearchGroup) {
        const newSession: SearchSessionBuild = {
            members: [group],
            wordsSoFar: searchGroupQueryAsBagOfWords(group)
        };
        allSearchSessions.push(newSession);
    }

    if (allSearchSessions.length === 0) { //empty, add first member
        addSearchGroupAsSearchSessionBuild(currentGroup);
    } else { //not empty
        const currentSearchSession = allSearchSessions[allSearchSessions.length - 1];
        //decide if the current search group needs to be added to the last session, or be added to a new session
        const currentSessionWords = currentSearchSession.wordsSoFar;
        const currentGroupWords = searchGroupQueryAsBagOfWords(currentGroup);
        const isGroupRelatedToSearch = BagOfWords.hasCommonWords(currentSessionWords, currentGroupWords);

        if (isGroupRelatedToSearch) {
            const sessionWithGroupWords: string[] = [...currentSessionWords.getWords(), ...currentGroupWords.getWords()];
            currentSearchSession.wordsSoFar = new BagOfWords(...sessionWithGroupWords);
            currentSearchSession.members.push(currentGroup);
        } else {
            addSearchGroupAsSearchSessionBuild(currentGroup);
        }
    }

    return allSearchSessions;
};

function finalizedSearchSessions(builds: SearchSessionBuild[]): SearchSession[] {
    function finalizeSearchSession(build: SearchSessionBuild): SearchSession {
        const members: SearchSessionMember[] = build.members.map(_member => {
            return {member: _member, score: new RelatednessScore(1)}
        });

        const words: BagOfWords[] = build.members.map(searchGroupQueryAsBagOfWords);
        return new SearchSession(members, new WordsCount(words))
    }
    return builds.map(finalizeSearchSession);
}