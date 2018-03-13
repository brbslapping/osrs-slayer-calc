import React from 'react';
import ReactDOM from 'react-dom';
import {SlayerCalc} from './SlayerCalculator';
import {taskList} from './RawTaskList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <SlayerCalc taskList={taskList} />,
  document.getElementById('root')
);
registerServiceWorker();





