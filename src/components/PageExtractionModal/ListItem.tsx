import React, { createElement } from "react";

interface ListItemInputProps {
    ref: any;
    item: any;
    render: any;
    isVisible: boolean;
}

interface ListItemState {
    renderTarget: any;
    shouldRenderItem: boolean;
}

class ListItem extends React.Component<ListItemInputProps, ListItemState> {
    constructor(props: ListItemInputProps) {
        super(props);
        const renderTarget = this.props.render(this.props.item);
        const isPromise = renderTarget instanceof Promise;
        if (isPromise) {
            renderTarget.then((result: any) => this.setState({ renderTarget: result, shouldRenderItem: true }));
        }
        this.state = {
            renderTarget: isPromise ? undefined : renderTarget,
            shouldRenderItem: !isPromise
        };
    }
    render(): JSX.Element {
        if (!this.props.isVisible || !this.state.shouldRenderItem) {
            return <></>;
        }
        return (
            <div
                ref={this.props.ref}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.5em 0px" }}
            >
                {this.state.renderTarget}
            </div>
        );
    }
}

export default ListItem;