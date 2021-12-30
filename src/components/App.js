import React, { Component } from "react";
import uniqid from "uniqid";

import "./App.css";
import Task from "./Task";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasksArr: [
                { task: "Clean Room!", uuid: uniqid() },
                { task: "Math HW :(", uuid: uniqid() },
            ],
            currTask: {},
            /*array to store tasks to render*/
        };

        this.addTask = this._addTask.bind(this);
        this.deleteTask = this._deleteTask.bind(this);
        this.editTask = this._editTask.bind(this);
    }

    _addTask(event) {
        const inputField = document.getElementById("add-task-input");
        if (!inputField.value) {
            return;
        }
        this.setState(
            {
                currTask: {
                    task: inputField.value,
                    uuid: uniqid(),
                },
            },
            () => (inputField.value = "")
        );
        this.setState((prevState) => ({
            tasksArr: [...prevState.tasksArr, prevState.currTask],
        }));
    }

    _deleteTask(taskID) {
        const index = this.state.tasksArr.findIndex((element) => element.uuid === taskID);
        if (index < 0) return;
        const newTaskArr = [...this.state.tasksArr];
        newTaskArr.splice(index, 1);
        this.setState({ tasksArr: newTaskArr });
    }

    _editTask(taskID, newTaskName) {
        const index = this.state.tasksArr.findIndex((element) => element.uuid === taskID);
        if (index < 0) return;
        const newTaskArr = [...this.state.tasksArr];
        newTaskArr[index].task = newTaskName;
        this.setState({ tasksArr: newTaskArr });
    }

    render() {
        return (
            <div className="task-main">
                <div>
                    <form
                        className="add-task-form task-flex-row"
                        onSubmit={(e) => {
                            e.preventDefault(); /*prevents refresh on enter key*/
                            this.addTask();
                        }}
                    >
                        <label className="add-task-label" htmlFor="add-task-input">
                            Add A Task:
                        </label>
                        <input id="add-task-input" placeholder="Type a Task Here!" />
                        <button className="submit-btn" id="submit" type="button" onClick={this.addTask}>
                            Submit
                        </button>
                    </form>
                </div>
                <div className="tasks-pane task-flex-row">
                    <h1 className="task-pane-title">Tasks:</h1>
                    {[...this.state.tasksArr].map((taskObj, idx) => (
                        <Task
                            taskName={taskObj.task}
                            index={idx}
                            key={taskObj.uuid}
                            uuid={taskObj.uuid}
                            deleteFunc={this.deleteTask}
                            editFunc={this.editTask}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
