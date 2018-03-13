import React from 'react';
import {precisionRound} from '../util/Util';

const TASK_POINT_GAIN = precisionRound(15 + 60/10 + 150/50 + 150/100 + 150/250 + 225/1000, 2);

const SKIP_COST = 30;

export function Stats(props) {
  return (
    <div>
      <h3>Stats</h3>
      <table className={"table"}>
        <tbody>
          <tr>
            <th>Total Task Weight</th>
            <td>{props.totalWeight.withSkips}</td>
          </tr>
          <tr>
            <th>Total Active Weight</th>
            <td>{props.totalWeight.withoutSkips}</td>
          </tr>
          <tr>
            <th>Total Skip Weight</th>
            <td>{props.totalWeight.withSkips - props.totalWeight.withoutSkips}</td>
          </tr>
          <tr>
            <th>Average Skip Cost</th>
            <td>{_calcSkipCost(props.totalWeight)}</td>
          </tr>
          <tr>
            <th>Average Point Gain</th>
            <td>{TASK_POINT_GAIN}</td>
          </tr>
          <tr>
            <th>Net Point Change</th>
            <td>{TASK_POINT_GAIN - _calcSkipCost(props.totalWeight)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function _calcSkipCost(totalWeight) {
  var expectedNumSkips = _negBinExpValue(1, totalWeight.withoutSkips/totalWeight.withSkips);
  var skipCost = SKIP_COST * expectedNumSkips;
  return precisionRound(skipCost, 2);
}

function _negBinExpValue(numSuccess, probSuccess) {
  return numSuccess*(1-probSuccess)/probSuccess;
}