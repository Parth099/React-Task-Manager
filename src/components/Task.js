import "./Task.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.deleteTaskCaller = this._deleteTaskCaller.bind(this);
        this.editTaskCaller = this._editTaskCaller.bind(this);
        this.saveTaskCaller = this._saveTaskCaller.bind(this);
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

        const editBtn = currTaskColumn.querySelector(".edit-btn");
        const saveBtn = currTaskColumn.querySelector(".save-btn");
        editBtn.classList.add("void");
        saveBtn.classList.remove("void");

        //need to improve here: wasteful searching in DOMqueries :( 
    }

    _saveTaskCaller(evt) {
        const field = document.querySelector("#edit-field");
        if (!field) return;
        if (!field.value || /^\s*$/.test(field.value)) return; /*if blank*/

        const taskColumns = document.querySelectorAll(".task-container");
        if (taskColumns.length < 1) return;
        const currTaskColumn = taskColumns[this.props.index];
        const editBtn = currTaskColumn.querySelector(".edit-btn");
        const saveBtn = currTaskColumn.querySelector(".save-btn");
        editBtn.classList.remove("void");
        saveBtn.classList.add("void");
        currTaskColumn.querySelector(".task-name").classList.remove("void");

        const { editFunc, uuid } = this.props;
        editFunc(uuid, field.value);
        ReactDOM.unmountComponentAtNode(currTaskColumn.querySelector(".task-edit"));
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
                    <button className="edit-btn task-btn" onClick={this.editTaskCaller}>
                        Edit
                    </button>
                    <button className="save-btn task-btn void" onClick={this.saveTaskCaller}>
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
