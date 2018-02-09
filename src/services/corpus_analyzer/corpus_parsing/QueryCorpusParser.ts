import * as _ from "lodash";
import BagOfWords from "~/dto/BagOfWords";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {SearchQueryString} from "~/services/corpus_analyzer/dto/SearchQueryString";

interface IMapFromWordsToQueries {
    [word: string]: SearchQueryString[];
}

export class QueryCorpusParser {
    private readonly queryCorpus: ReadonlyArray<SearchQueryString>;

    constructor(queryCorpus: ReadonlyArray<SearchQueryString>) {
        this.queryCorpus = queryCorpus;
    }

    public parse(): EntityOccurrences[] {
        const singleWordEntities: IMapFromWordsToQueries = {};

        // TODO: prettify!
        this.queryCorpus.forEach((query) => {
            query.interestingQueryWords.words.forEach((word) => {
                // TODO wat. is this shit.
                if (word == "constructor") {
                    return;
                }

                if (singleWordEntities[word] === undefined) {
                    singleWordEntities[word] = [];
                }

                singleWordEntities[word].push(query);

            });
        });

        return this.finalizeWordsToQueriesMap(singleWordEntities);
    }

    private finalizeWordsToQueriesMap(wordsToQueries: IMapFromWordsToQueries): EntityOccurrences[] {
        const words = _.keys(wordsToQueries);
        return words.map((word) =>
            new EntityOccurrences(new BagOfWords(word), wordsToQueries[word]));
    }
}
