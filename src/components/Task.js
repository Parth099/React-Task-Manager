import "./Task.css";
import React, { Component } from "react";

export default class Task extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="task-container">
                <p>
                    <span className="task-ordering-text">{this.props.index + 1}</span>| {this.props.taskName}
                </p>
            </div>
        );
    }
}
