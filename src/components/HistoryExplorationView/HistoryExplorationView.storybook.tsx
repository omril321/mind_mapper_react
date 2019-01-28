import {storiesOf} from "@storybook/react";
import * as React from "react";
import {HistoryExploration} from "~/components/HistoryExplorationView/HistoryExploration";
import datasetProcessor from "~/rawData/datasetProcessor";
import testEntityDatasets from "~/rawData/testEntityDatasets";

storiesOf("HistoryExploration", module)
    .add("With dataset1", () => {
        const processedData = datasetProcessor.mapTestEntitiesDataSetToEntityOccurrences(testEntityDatasets.entitiesDataSet1);
        return <HistoryExploration entitiesToShow={processedData}/>;
    });
