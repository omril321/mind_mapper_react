import * as React from "react";
import {CSSTransitionGroup} from "react-transition-group";
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
                </div>);
        const elementToAdd = isLoading ? loadingPage : null;

        return (
            <div id="loading-page">
            <CSSTransitionGroup
                transitionName={"loading-page_wrapper"}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
            >
                {elementToAdd}
            </CSSTransitionGroup>
        </div>);
    }
}
