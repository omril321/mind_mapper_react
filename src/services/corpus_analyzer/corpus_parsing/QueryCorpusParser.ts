import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

interface IMapFromWordsToQueries {
    [word: string]: SearchQueryString[];
}

function finalizeWordsToQueriesMap(wordsToQueries: IMapFromWordsToQueries): EntityOccurrences[] {
    const words = _.keys(wordsToQueries);
    return words.map((word) =>
        new EntityOccurrences(new BagOfWords(word), wordsToQueries[word]));
}

export default function parseQueryCorpus(queryCorpus: ReadonlyArray<SearchQueryString>): EntityOccurrences[] {
    const singleWordEntities: IMapFromWordsToQueries = {};

    // TODO: prettify!
    queryCorpus.forEach((query) => {
        query.interestingQueryWords.words.forEach((word) => {
            // TODO wat. is this shit.
            if (word === "constructor") {
                return;
            }

            if (singleWordEntities[word] === undefined) {
                singleWordEntities[word] = [];
            }

            singleWordEntities[word].push(query);

        });
    });

    return finalizeWordsToQueriesMap(singleWordEntities);
}
