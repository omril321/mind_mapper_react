import * as React from "react";
import ChromeHistorySearch from "./History";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        ChromeHistorySearch({text: "typescript"}, (items) => console.log("Items are:", items));
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}