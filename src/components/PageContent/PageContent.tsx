import * as React from "react";
import LoadingPage from "~/components/LoadingPage/LoadingPage";
import {WordSearchSessionsComp} from "~/components/WordSearchSessions/WordSearchSessionsComp";
import {SearchSession} from "~/dto/SearchSession";
import {WordSearchSessions} from "~/dto/WordSearchSessions";
import {ChromeHistoryService} from "~/services/history_items/ChromeHistoryService";
import {HistoryItemsProcessor} from "~/services/history_items/HistoryItemsProcessor";
import AnalyzationFlowService from "~/services/flow/AnalyzationFlowService";
import {IAnalyzationFlowConfigurations} from "~/services/flow/AnalyzationFlowConfig";

interface IContentState {
    isLoading: boolean;
    searchSessions: SearchSession[];
    wordSearchesSessions: WordSearchSessions[];
}

export class PageContent extends React.Component<{}, IContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true, searchSessions: [], wordSearchesSessions: []};

        // TODO: move this to somewhere else?
        const historyService = new ChromeHistoryService((items) => {

            const analyzationConfig: IAnalyzationFlowConfigurations = {
                historyItemsInput: items,
                onCorpusAnalyzationUpdate: (update) => { if (update.isLastAnalyzation) console.debug("last update: ", update) },
                onHistoryProcessorResult: (historyItems) => console.debug("history items are: ", historyItems)
            };
            new AnalyzationFlowService().startAnalyzationFlow(analyzationConfig);

            /*const processedResult = new HistoryItemsProcessor().processHistoryItems(items);*/
            /*this.setState({
                isLoading: false,
                searchSessions: processedResult.searchSessions,
                wordSearchesSessions: processedResult.wordSearchSessions,
            });*/
        });

        historyService.startQuery();
    }

    public render() {
        const isLoading = this.state.isLoading;
        const allWordsSessions = this.state.wordSearchesSessions;
        const wordSessionsComp = allWordsSessions.map((wordSession) => {
            return <WordSearchSessionsComp key={wordSession.uniqueKey} wordSearchSessions={wordSession}/>;
        });
        return (
            <div id="content">
                <LoadingPage isLoading={isLoading}/>
                {wordSessionsComp}
            </div>);
    }

}
