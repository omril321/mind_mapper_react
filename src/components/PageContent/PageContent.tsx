import * as React from "react";
import {HistoryExplorationViewComp} from "~/components/HistoryExplorationView/HistoryExplorationViewComp";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
import {EntityOccurrences} from "~/services/corpus_analyzer/dto/EntityOccurrences";
import {IAnalyzationFlowConfigurations} from "~/services/flow/AnalyzationFlowConfig";
import AnalyzationFlowService from "~/services/flow/AnalyzationFlowService";
import {ChromeHistoryService} from "~/services/history_items/ChromeHistoryService";

interface IContentState {
    isLoading: boolean;
    knownEntities: ReadonlyArray<EntityOccurrences>;
}

export class PageContent extends React.Component<{}, IContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true, knownEntities: []};

        // TODO: move this to somewhere else?
        const historyService = new ChromeHistoryService((items) => {

            const analyzationConfig: IAnalyzationFlowConfigurations = {
                historyItemsInput: items,
                onCorpusAnalyzationUpdate: (update) => {
                    if (update.isLastAnalyzation) {
                        console.debug("last update of corpus analyzation: ", update);
                    }
                    this.setState({
                        isLoading: false,
                        knownEntities: update.allKnownEntities,
                    });
                },
                onHistoryProcessorResult: (historyItems) => console.debug("history items are: ", historyItems),
            };
            new AnalyzationFlowService().startAnalyzationFlow(analyzationConfig);
        });

        historyService.startQuery();
    }

    public render() {
        const isLoading = this.state.isLoading;
        const allKnownEntities = this.state.knownEntities;
        return (
            <div id="content">
                <LoadingPage isLoading={isLoading}/>

                <HistoryExplorationViewComp entitiesToShow={allKnownEntities}/>
            </div>);
    }

}
