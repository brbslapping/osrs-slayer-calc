import React from 'react';
import {CollapsableList} from '../accordion/Accordion';
import {LockList} from '../lockList/LockList';
import {Requirements} from '../enums/Enums';

export function LockedTasks(props) {
  return (
  	<div>
	  	<h3>Locked Tasks</h3>
	    <CollapsableList labelText={["Slayer Reward Unlocks", "Quest Requirements", "Level Requirements"]}>
	      <LockList reqType={Requirements.UNLOCK} taskList={props.taskList} handleClick={props.handleClick} />
	      <LockList reqType={Requirements.QUEST} taskList={props.taskList} handleClick={props.handleClick} />
	      <LockList reqType={Requirements.LEVEL} taskList={props.taskList} handleClick={props.handleClick} />
	    </CollapsableList>
    </div>
  );
}
