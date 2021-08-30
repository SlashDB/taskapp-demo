import { useState, useEffect, useContext, useRef } from 'react';
import { slashDB } from './slashdb';
import { SlashDBContext } from './Context';

export const useSetUp = () => {
  const { baseUrl, setUpOptions } = useContext(SlashDBContext);
  slashDB.setUp(baseUrl, setUpOptions);
};

//add functionality to take table after database as param\
export const useDataDiscovery = (
  database,
  defaultFilterParameters,
  queryStrParameters
) => {
  //redundent call - in case user did not call useSetUp at top level of project
  useSetUp();

  const isMountedRef = useRef(null);

  const [data, setData] = useState([]);
  const [didUpdate, setDidUpdate] = useState(new Date().getTime());

  const handleSetData = (data) => {
    setData(data);
  };

  const handleUpdate = () => {
    setDidUpdate(new Date().getTime());
  };

  //filterParam rename
  const _get = async (filterParameters, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'get',
        database,
        filterParameters ? filterParameters : defaultFilterParameters,
        queryStrParameters,
        undefined,
        headers
      )
      .then((data) => handleSetData(data))
      .catch((error) => {
        console.log(error);
      });
  };

  const _post = async (filterParameters, body, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'post',
        database,
        filterParameters ? filterParameters : defaultFilterParameters,
        queryStrParameters,
        body,
        headers
      )
      .then(handleUpdate);
  };

  const _put = async (filterParameters, body, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'put',
        database,
        filterParameters ? filterParameters : defaultFilterParameters,
        queryStrParameters,
        body,
        headers
      )
      .then(handleUpdate);
  };

  const _delete = async (filterParameters, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'delete',
        database,
        filterParameters ? filterParameters : defaultFilterParameters,
        queryStrParameters,
        undefined,
        headers
      )
      .then(handleUpdate);
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      _get(defaultFilterParameters, queryStrParameters);
    }
    return () => (isMountedRef.current = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didUpdate]);

  return [data, _get, _post, _put, _delete];
};

export const useExecuteQuery = (
  defHttpMethod,
  queryID,
  defParameters,
  defQueryStrParameters
) => {
  //redundent call - in case user did not call useSetUp at top level of project
  useSetUp();

  const isMountedRef = useRef(null);

  const [data, setData] = useState([{}]);

  const handleDataSet = (data) => {
    setData(data);
  };

  const _executeQuery = async (
    httpMethod,
    parameters,
    queryStrParameters,
    headers
  ) => {
    await slashDB
      .executeQuery(
        httpMethod ? httpMethod : defHttpMethod,
        queryID,
        parameters ? defParameters : parameters,
        queryStrParameters ? defQueryStrParameters : queryStrParameters,
        headers
      )
      .then((data) => {
        handleDataSet(data);
      });
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      _executeQuery(defHttpMethod, defParameters);
    }
    return () => (isMountedRef.current = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defHttpMethod]);

  return [data, _executeQuery];
};
