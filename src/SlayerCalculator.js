import React from 'react';
import {TaskList} from './taskList/TaskList';
import {Status} from './enums/Enums';
import {Stats} from './stats/Stats';
import {LockedTasks} from './lockedTasks/LockedTasks';

export class SlayerCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: props.taskList,
      totalWeight: _calcTotalWeight(props.taskList)
    };
    this.handleTaskClick = this.handleClick.bind(this, _nextStatus);
    this.handleLockClick = this.handleClick.bind(this, _toggleLock);
  }

  handleClick(statusChangeFunc, taskName) {
    this.setState(prevState => ({
      taskList: prevState.taskList.map(
        task => {
          if (task.name === taskName)
            task.status = statusChangeFunc(task.status);
          return task;
        }
      )
    }));
    // how to include this in the previous set state
    this.setState(prevState => ({
      totalWeight: _calcTotalWeight(prevState.taskList)
    }));
  }

  render() {
    return (
      <div className={"container"}>
        <div className={"row justify-content-md-center"}>
          <h1 className={"display-3"}>Slayer Calculator</h1>
        </div>
        <div className={"row justify-content-md-center"}>
          <p>Build and share your personal Slayer List</p>
        </div>
        <div className={"row"}>
          <div className={"col col-lg-6"}>
            <TaskList taskList={this.state.taskList} totalWeight={this.state.totalWeight} handleClick={this.handleTaskClick} />
          </div>
          <div className={"col col-lg-6"}>
            <LockedTasks taskList={this.state.taskList} handleClick={this.handleLockClick} />
            <Stats totalWeight={this.state.totalWeight} />
          </div>

        </div>
      </div>
    );
  }
}

function _calcTotalWeight(taskList) {
  var withSkips = 0;
  var withoutSkips = 0;
  taskList.forEach(
    task => {
      if (task.status === Status.ACTIVE) {
        withoutSkips += task.weight;
        withSkips += task.weight;
      }
      if (task.status === Status.SKIPPED) {
        withSkips += task.weight;
      }
    });
  return {
    "withSkips" : withSkips,
    "withoutSkips" : withoutSkips
  };
}

function _nextStatus(status) {
  switch (status) {
    case Status.ACTIVE:
      return Status.SKIPPED;
    case Status.SKIPPED:
      return Status.BLOCKED
    case Status.BLOCKED:
      return Status.ACTIVE
    default:
      return RangeError(status + " is not a valid status");
  }
}

function _toggleLock(status) {
  if(status === Status.LOCKED)
    return Status.ACTIVE;
  return Status.LOCKED;
}


