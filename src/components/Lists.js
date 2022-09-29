import React from 'react';
import List from './List';

function Lists(props) {
  const { lists, getList, postList, putList, deleteList } = props;
  const wrapper = {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <div style={wrapper}>
      {lists.map((list) => (
        <List
          key={list.TaskListId}
          TaskListId={list.TaskListId}
          list={list}
          getList={getList}
          postList={postList}
          putList={putList}
          deleteList={deleteList}
        />
      ))}
    </div>
  );
}
export default Lists;
