import "./Task.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.deleteTaskCaller = this._deleteTaskCaller.bind(this);
        this.editTaskCaller = this._editTaskCaller.bind(this);
        this.saveTaskCaller = this._saveTaskCaller.bind(this);

        this.state = {
            editActive: false,
        };
    }

    _deleteTaskCaller() {
        const { deleteFunc, uuid } = this.props;
        deleteFunc(uuid);
    }

    _editTaskCaller(evt) {
        if (document.querySelector("#edit-field")) return; /*only 1 editor can be open*/

        const taskColumns = document.querySelectorAll(".task-container");
        if (taskColumns.length < 1) return;

        const currTaskColumn = taskColumns[this.props.index];
        const currTaskDOM = currTaskColumn.querySelector(".task-name");
        const currTask = currTaskDOM.textContent;
        currTaskDOM.classList.add("void");

        const inputAlt = <input defaultValue={currTask} id="edit-field" />;
        const taskEdit = currTaskColumn.querySelector(".task-edit");

        ReactDOM.render(inputAlt, taskEdit);

        this.setState({
            editActive: !this.state.editActive,
        });

        //need to improve here: wasteful searching in DOMqueries :(
    }

    _saveTaskCaller(evt) {
        const field = document.querySelector("#edit-field");
        if (!field) return;
        if (!field.value || /^\s*$/.test(field.value)) return; /*if blank*/

        const taskColumns = document.querySelectorAll(".task-container");
        if (taskColumns.length < 1) return;
        const currTaskColumn = taskColumns[this.props.index];
        currTaskColumn.querySelector(".task-name").classList.remove("void");

        const { editFunc, uuid } = this.props;
        editFunc(uuid, field.value);
        ReactDOM.unmountComponentAtNode(currTaskColumn.querySelector(".task-edit"));

        this.setState({
            editActive: !this.state.editActive,
        });
    }

    render() {
        return (
            <div className="task-container">
                <p>
                    <span className="task-ordering-text">{this.props.index + 1} </span>
                    <span className="task-name">{this.props.taskName}</span>
                    <span className="task-edit"></span>
                </p>
                <div className="buttons-container">
                    <button className={"edit-btn task-btn " + (this.state.editActive ? "void" : "")} onClick={this.editTaskCaller}>
                        Edit
                    </button>
                    <button className={"save-btn task-btn " + (this.state.editActive ? "" : "void")} onClick={this.saveTaskCaller}>
                        Save
                    </button>

                    <button className="delete-btn task-btn" onClick={this.deleteTaskCaller}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}
