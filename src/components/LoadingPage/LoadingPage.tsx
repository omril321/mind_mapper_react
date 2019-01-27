import * as React from "react";
import "./LoadingPage.scss";

interface ILoadingPageProps {
    isLoading: boolean;
}

export default class LoadingPage extends React.Component<ILoadingPageProps, {}> {
    public render() {
        const isLoading = this.props.isLoading;
        const loadingPage =
            (
                <div key="loading-page" className="loading-page">
                    <p className="loading-page_text">Loading!</p>
                </div>
            );
        const elementToAdd = isLoading ? loadingPage : null;

        return (
            <div id="loading-page">
                {elementToAdd}
            </div>
        );
    }
}
