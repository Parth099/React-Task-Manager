import "./Task.css";
import React, { Component } from "react";

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.deleteTaskCaller = this._deleteTaskCaller.bind(this);
    }

    _deleteTaskCaller() {
        const { deleteFunc, uuid } = this.props;
        deleteFunc(uuid);
    }

    render() {
        return (
            <div className="task-container">
                <p>
                    <span className="task-ordering-text">{this.props.index + 1}</span> {this.props.taskName}
                </p>
                <button className="delete-btn" onClick={this.deleteTaskCaller}>
                    Delete
                </button>
            </div>
        );
    }
}
