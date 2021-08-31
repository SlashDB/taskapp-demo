/**
 * Custom React hook for ease of state management with uise of SlashDB and SDK
 */
//import React build-in hooks to use under the hood
import { useState, useEffect, useContext, useRef } from 'react';
//import vanilla JS class from SDK
import { slashDB } from './slashdb';
//import custom context for use of param passing though out project
import { SlashDBContext } from './Context';

/**
 * Take values for baseUrl and setUpOptions passed to SlashDBContext via evolking
 * SlashDBProvider at top level of user/client project and call method setUp passing
 * those params
 */
export const useSetUp = () => {
  const { baseUrl, setUpOptions } = useContext(SlashDBContext);
  slashDB.setUp(baseUrl, setUpOptions);
};

//Parking lot - add functionality to take table after database as param
/**
 *
 * @param {String} database Name of database to be accessed
 * @param {[]} defaultFilterParameters Array with names of resources to be accesed i.e. table name, column name, comlumn value
 * eg. [Album, AlbumId, 1, Artist]
 * @param {Object} queryStrParameters Query params in key value pairs format to be send via url eg. {limit: 29} => ?limit=29
 * @returns {[data, _get, _post, _put, _delete]} Array with data accessed (usually whole database )
 * and GET, POST, PUT and DELETE functions for interaction with the data accessed
 */
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
  /**
   *
   * @param {[]} defaultFilterParameters Array with names of resources to be accesed i.e. table name, column name, comlumn value
   * eg. [Album, AlbumId, 1, Artist]
   * @param {Object} queryStrParameters Query params in key value pairs format to be send via url eg. {limit: 29} => ?limit=29
   * @param {*} headers Any headers user may wish to pass
   */
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

  /**
   *
   * @param {[]} defaultFilterParameters Array with names of resources to be accesed i.e. table name, column name, comlumn value
   * eg. [Album, AlbumId, 1, Artist]
   * @param {*} body Payload to be delivered
   * @param {Object} queryStrParameters Query params in key value pairs format to be send via url eg. {limit: 29} => ?limit=29
   * @param {*} headers Any headers user may wish to pass
   */
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

  /**
   *
   * @param {[]} defaultFilterParameters Array with names of resources to be accesed i.e. table name, column name, comlumn value
   * eg. [Album, AlbumId, 1, Artist]
   * @param {*} body Payload to be delivered
   * @param {Object} queryStrParameters Query params in key value pairs format to be send via url eg. {limit: 29} => ?limit=29
   * @param {*} headers Any headers user may wish to pass
   */
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

  /**
   *
   * @param {[]} defaultFilterParameters Array with names of resources to be accesed i.e. table name, column name, comlumn value
   * eg. [Album, AlbumId, 1, Artist]
   * @param {Object} queryStrParameters Query params in key value pairs format to be send via url eg. {limit: 29} => ?limit=29
   * @param {*} headers Any headers user may wish to pass
   */
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

/**
 * Function for executing query from slashDB server on a database
 *
 * @param {String} defHttpMethod GET, POST, PUT or DELETE - HTTP method to be used
 * @param {String} queryID ID/name of query as is in SlashDB server interface/config files
 * @param {Object} defParameters Params for query being executed eg. if query requires itemID the pass object with key
 * value pair { itemID: `itemID_Value`,}
 * @param {Object} defQueryStrParameters Query params in key value pairs format to be send via url eg. {limit: 29} => ?limit=29
 * @returns {[]} [data, _executeQuery] data received as payload from response to query and function to be called for further
 * query execution
 */
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

  /**
   * Function to be used for query execution after initial useExecuteQuery has been called
   *
   * @param {String} httpMethod GET, POST, PUT or DELETE - HTTP method to be used
   * @param {*} parameters Any params user may wish to pass for query
   * @param {Object} queryStrParameters Query params in key value pairs format to be send via url eg. {limit: 29} => ?limit=29
   * @param {*} headers Any headers user may wish to pas
   */
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
