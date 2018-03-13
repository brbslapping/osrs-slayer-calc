import React from 'react';
import {Status} from '../enums/Enums';
import {precisionRound} from '../util/Util';

const StatusStyle = Object.freeze({
  [Status.ACTIVE]: "table-success",
  [Status.SKIPPED]: "table-warning",
  [Status.BLOCKED]: "table-danger",
  [Status.LOCKED]: "table-danger"
});

export function TaskList(props) {
  return (
    <div>
      <h3>Active Tasks</h3>
      <table className={"table"}>
        <thead className={"thead-dark"}>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Chance</th>
            <th>Chance With Skips</th>
          </tr> 
        </thead>
        <tbody>
        {props.taskList.map(
          task => {
            if (task.status !== Status.LOCKED)
              return <Task key={task.name} task={task} totalWeight={props.totalWeight} handleClick={props.handleClick} />;
            else
              return null;
          }
        )}
        </tbody>
      </table>
    </div>
  );
}

function Task(props) {
  return (<tr className={StatusStyle[props.task.status]} onClick={() => props.handleClick(props.task.name)}>
    <th>{props.task.name}</th>
    <td>{props.task.weight}</td>
    <td>{_calcAssignChance(props.task, props.totalWeight.withoutSkips, false)}</td>
    <td>{_calcAssignChance(props.task, props.totalWeight.withSkips, true)}</td>
  </tr>);
}

function _calcAssignChance(task, totalWeight, withSkips){
  if(task.status === Status.ACTIVE || (withSkips && task.status === Status.SKIPPED))
    return precisionRound(100*task.weight/totalWeight, 2);
  return 0;
}