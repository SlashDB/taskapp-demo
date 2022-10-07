import React from 'react';
import Name from './Name';

import { DataDiscoveryFilter } from '@slashdb/js-sdk/modules/datadiscoveryfilter.js';
import { SQLPassThruFilter } from '@slashdb/js-sdk/modules/sqlpassthrufilter.js';
import { eq } from '@slashdb/js-sdk/modules/filterfunctions.js';

const Task = (props) => {
  const { task, getTasks, putTask, deleteTask, executeMyQuery } = props;

  const taskIDPath = new DataDiscoveryFilter(eq('TaskItemId',task.TaskItemId))
  const queryParams = new SQLPassThruFilter({'TaskListId':task.TaskListId});  
  
  const taskItemStyle = {
    listStyleType: 'none',
    padding: '7.5px',
    color: 'white',
    margin: '10px',
    verticalAlign: 'middle',
  };

  const removeButtonStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 'auto',
    lineHeight: '130%',
    outline: 'none',
    border: 'none',
    color: '#d10000',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  };

  const checkStyle = {
    cursor: 'pointer',
    verticalAlign: 'middle',
    margin: 'auto',
    marginRight: '6px',
  };

  return (
    <li style={taskItemStyle} key={task.TaskItemId}>
      <Name
        style={{
          textDecoration: task.Checked ? 'line-through' : 'none',
          fontSize: '1rem',
          height: 'auto',
          margin: 'auto',
        }}
        fieldName="Task"
        fieldValue={task.Task}
        update={putTask}
        path={taskIDPath}
      ></Name>
      <div
        style={{
          display: 'inline',
          float: 'right',
          verticalAlign: 'middle',
        }}
      >
        <input
          style={checkStyle}
          type="checkbox"
          checked={task.Checked}
          onChange={() => {
            putTask(taskIDPath, {
              Checked: !task.Checked,
            }).then(() => {
              executeMyQuery(queryParams)
            });
          }}
        ></input>
        <button
          style={removeButtonStyle}
          onClick={() => {
            deleteTask(taskIDPath).then(
              () => {
                executeMyQuery(queryParams);
               });
              }
            }
        >
          X
        </button>
      </div>
    </li>
  );
};

export default Task;
