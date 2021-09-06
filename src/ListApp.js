import React from 'react';
import Lists from './components/Lists';
import NewListArea from './components/NewListArea';

import { useDataDiscovery, auth } from 'react-slashdb';

export default function ListApp(props) {
  const [lists, getList, postList, putList, deleteList] = useDataDiscovery(
    process.env.REACT_APP_DATABASE_NAME,
    ['TaskList']
  );

  const buttonWrapper = {
    position: 'absolute',
    top: '43px',
    right: '-55px',
    height: '26px',
    marginRight: '100px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#fbdfdf',
    backgroundColor: '#d10000',
    outline: 'none',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  };

  return (
    <div>
      <button
        style={buttonWrapper}
        size="lg"
        onClick={async () => {
          await auth.logout(() => {
            props.history.push('/');
          });
        }}
      >
        Logout
      </button>
      <NewListArea postLists={postList} getLists={getList} />
      {lists && (
        <Lists
          lists={lists}
          getList={getList}
          putList={putList}
          deleteList={deleteList}
        />
      )}
    </div>
  );
}
