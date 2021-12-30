import React, { Component } from "react";
import uniqid from "uniqid";
import "./App.css";

import Task from "./Task";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasksArr: [],
            currTask: "",
            /*array to store tasks to render*/
        };

        this.addTask = this.addTaskHandler.bind(this);
    }

    addTaskHandler(event) {
        const inputField = document.getElementById("add-task-input");
        if (!inputField.value) {
            return;
        }
        this.setState(
            {
                currTask: inputField.value,
            },
            () => (inputField.value = "")
        );
        this.setState((prevState) => ({
            tasksArr: [...prevState.tasksArr, prevState.currTask],
        }));
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
                        <input id="add-task-input" placeholder="Insert a Task Here!" />
                        <button className="submit-btn" id="submit" type="button" onClick={this.addTask}>
                            Submit
                        </button>
                    </form>
                </div>
                <div className="tasks-pane task-flex-row">
                    <h1 className="task-pane-title">Tasks:</h1>
                    {[...this.state.tasksArr].map((tName, idx) => (
                        <Task taskName={tName} index={idx} key={uniqid()} />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
