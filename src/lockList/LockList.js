import React from 'react';
import {Status, Requirements} from '../enums/Enums';

const LockedStyle = Object.freeze({
  [Status.ACTIVE]: "table-success",
  [Status.SKIPPED]: "table-success",
  [Status.BLOCKED]: "table-success",
  [Status.LOCKED]: "table-danger"
});

export function LockList(props) {
  return (
    <table className={"table"}>
      <LockListHeaders reqType={props.reqType} />
      <LockListBody reqType={props.reqType} taskList={props.taskList} handleClick={props.handleClick} />
    </table>);
}

function LockListHeaders(props) {
  let headers = [];
  headers.push(<th>Name</th>);
  if(props.reqType === Requirements.QUEST || props.reqType === Requirements.LEVEL)
    headers.push(<th>Level</th>);

  if(props.reqType === Requirements.UNLOCK) {
    headers.push(<th>Unlock Name</th>);
    headers.push(<th>Unlock Cost</th>);
  }

  if(props.reqType === Requirements.QUEST)
    headers.push(<th>Quest</th>)

  return (
    <thead>
      <tr>
        {headers}
      </tr>
    </thead>
  );
}

function LockListBody(props) {
  return (
    <tbody>
        {props.taskList.map(
          task => {
            if (task.reqType === props.reqType)
              return <LockedTask key={task.name} reqType={props.reqType} task={task} handleClick={props.handleClick} />;
            else
              return null;
          }      
        )}
      </tbody>
  );
}

function LockedTask(props) {
  let headers = [];
  headers.push(<th>{props.task.name}</th>);
  if(props.reqType === Requirements.QUEST || props.reqType === Requirements.LEVEL) {
    let levelReq = 1;
    if(props.task.requirements.level !== undefined)
      levelReq = props.task.requirements.level;
    headers.push(<td>{levelReq}</td>);
  }

  if(props.reqType === Requirements.UNLOCK) {
    headers.push(<td>{props.task.requirements.unlock.name}</td>);
    headers.push(<td>{props.task.requirements.unlock.cost}</td>);
  }
  if(props.reqType === Requirements.QUEST)
    headers.push(<td>{props.task.requirements.quest}</td>);

  return (
    <tr className={LockedStyle[props.task.status]} onClick={() => props.handleClick(props.task.name)}>
      {headers}
    </tr>
  );
}