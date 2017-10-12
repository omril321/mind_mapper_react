import * as React from "react";

export interface LoadingPageProps {
    isLoading: boolean
}

export class LoadingPage extends React.Component<LoadingPageProps, {}> {
    render() {
        const isLoading = this.props.isLoading;

        const loadingElement = <h1>Loading!!!!</h1>;
        const notLoadingElement = <h2>no loading...</h2>;

        return isLoading ? loadingElement : notLoadingElement;
    }
}