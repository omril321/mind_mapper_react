import {storiesOf} from "@storybook/react";
import * as React from "react";
import LoadingPage from "~/components/LoadingPage/LoadingPage";

storiesOf("LoadingPage", module)
    .add("Loading", () => (
        <LoadingPage isLoading={true}/>
    ))
    .add("Not loading", () => (
        <LoadingPage isLoading={false}/>
    ));
