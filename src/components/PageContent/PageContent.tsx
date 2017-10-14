import * as React from "react";
import ChromeHistorySearch from "../History";
import {LoadingPage} from "../LoadingPage/LoadingPage";

interface ContentState {
    isLoading: boolean
}

export class PageContent extends React.Component<{}, ContentState> {
    constructor(props: {}) {
        super(props);
        this.state = {isLoading: true};

        ChromeHistorySearch((items) => {
                console.log("Items are:", items);
                this.setState({isLoading: false})
            }
        );
    }

    render() {
        const isLoading = this.state.isLoading;
        return <div id="content">
            I'm containing!
            <LoadingPage isLoading={isLoading}/>

            I'm after...
        </div>
    }

}