/**
 * Vanila Javascript methods for use of Slashdb in javascript based project.
 * Also serves as under the hood methods for React specific functionality.
 */

//import cookie handling functionality from cookies.js
import { setCookie, getCookie, delete_cookie } from './cookies';

//export all exposed functions
export const slashDB = {
  setUp,
  get,
  post,
  put,
  delete: _delete,
  executeQuery,
  dataDiscovery,
  authenticateCookieSessionLogin,
  authenticateCookieSessionLogout,
  isAuthenticated,
  getIsAuthenticated,
  setIsAuthenticated,
};

//declare local variables
let baseUrl = '';
let dataFormat = ``;
let apiKeyValue = ``;

//set initial value for authentication
let isAuthenticatedVar = false;

/**
 * Set internal variables values for server connection.
 *
 * @param {String} baseUrlPath - Root path of slashdb server. Example http://localhost:8000.
 * @param {Object} setUpOptions - Setup options for use and connection to slashdb server.
 * @param {String} setUpOptions.dataFormatExt - Format of data. Json, XML, CSV, HTML, XSD.
 * @param {String} setUpOptions.apikey - API key for authentication purposes.
 */
function setUp(baseUrlPath, setUpOptions) {
  baseUrl = baseUrlPath;
  if (setUpOptions) {
    setUpOptions.dataFormatExt &&
      (dataFormat = `.${setUpOptions.dataFormatExt}`);
    setUpOptions.apikey && (apiKeyValue = `${setUpOptions.apikey}`);
  }
}

/**
 * Login via username and password - Cookie Session authentication.
 * Send POST request with login: username, password: password as payload.
 *
 * @param {String} username - Username of user.
 * @param {String} password - password of user.
 */
async function authenticateCookieSessionLogin(username, password) {
  const temp = dataFormat;
  dataFormat = '';
  const urlPath = '/login';
  const body = { login: username, password: password };
  await raw('POST', urlPath, body, undefined, undefined, true).then((res) => {
    if (res) {
      if (res.status === 200 || 304) {
        isAuthenticatedVar = true;
        setCookie('user_id', username);
      } else {
        isAuthenticatedVar = false;
        delete_cookie('user_id');
      }
    }
  });
  dataFormat = temp;
}

/**
 * Send request to log out user. Delete cookie.
 *
 */
async function authenticateCookieSessionLogout() {
  const temp = dataFormat;
  dataFormat = '';
  const urlPath = '/logout';
  await raw('GET', urlPath, undefined, undefined, undefined, true).then(() => {
    isAuthenticatedVar = false;
    delete_cookie('user_id');
  });

  dataFormat = temp;
}

/**
 * Check if session is valid. Check if user is still logged in.
 */
async function isAuthenticated() {
  const localUser = getCookie('user_id');
  const url = `/userdef/${localUser}`;

  await raw('GET', url, undefined, undefined, undefined, true)
    .then((response) => {
      return response.status === 200;
    })
    .then((value) => {
      setIsAuthenticated(value);
    });
  return getIsAuthenticated();
}

/**
 * Returns value of isAuthenticatedVar.
 *
 * @return {boolean} isAuthenticatedVar.
 */
function getIsAuthenticated() {
  return isAuthenticatedVar;
}

/**
 * Set value of isAuthenticatedVar.
 *
 * @param {boolean} x Value isAuthenticatedVar assumes.
 */
function setIsAuthenticated(x) {
  isAuthenticatedVar = x;
}

/** Internal method for handling HTTP requests
 *
 * @param {String} httpMethod - HTTP Method to be used in in the http request send.
 * @param {String} urlPath - Url path to be added to base url path provided in SetUp where request will be made.
 * @param {Object} body - payload to be send. Object of key value pairs.
 * @param {Object} queryStrParams - params to be send via url.
 * @param {Object} headers - Header params to be included. Object of key value pairs.
 * @param {Boolean} onlyRes - Only response needed or expecting incoming payload.
 * @returns {Boolea} returnObj.data -response payload
 * @returns {Object} returnObj.res -response
 */
async function raw(
  httpMethod,
  urlPath,
  body,
  queryStrParams,
  headers,
  onlyRes
) {
  const queryStrParameters =
    queryStrParams !== undefined
      ? queryStrParamsConstructor(queryStrParams)
      : '';
  const url = baseUrl + urlPath + queryStrParameters;
  const requestOptions = {
    method: `${httpMethod}`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      apikey: apiKeyValue !== undefined ? apiKeyValue : null,
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : null,
  };

  const returnObj = { data: null, res: null };
  try {
    await fetch(url, requestOptions)
      .then((response) => {
        returnObj.res = response;
        returnObj.data = onlyRes ? null : handleResponse(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  } catch (error) {
    console.log(error);
  }
  if (onlyRes) {
    return returnObj.res;
  } else {
    return [returnObj.data, returnObj.res];
  }
}

/** Internal method for handling HTTP GET requests
 *
 * @param {String} urlPath - Url path to be added to base url path provided in SetUp where request will be made.
 * @param {String} queryStrParameters - params to be send via url.
 * @param {Object} headers - Header params to be included. Object of key value pairs.
 * @returns {Object} data - response payload
 */
async function get(urlPath, queryStrParameters, headers) {
  const [data, res] = await raw(
    'GET',
    urlPath,
    undefined,
    queryStrParameters,
    headers
  );
  return data;
}

/** Internal method for handling HTTP POST requests
 *
 * @param {String} urlPath - Url path to be added to base url path provided in SetUp where request will be made.
 * @param {Object} body - payload to be send. Object of key value pairs.
 * @param {String} queryStrParameters - params to be send via url.
 * @param {Object} headers - Header params to be included. Object of key value pairs.
 * @returns {Object} data - response payload
 */
async function post(urlPath, body, queryStrParameters, headers) {
  const [data, res] = await raw(
    'POST',
    urlPath,
    body,
    queryStrParameters,
    headers
  );
  return data;
}
/** Internal method for handling HTTP POST requests
 *
 * @param {String} urlPath - Url path to be added to base url path provided in SetUp where request will be made.
 * @param {Object} body - payload to be send. Object of key value pairs.
 * @param {String} queryStrParameters - params to be send via url.
 * @param {Object} headers - Header params to be included. Object of key value pairs.
 * @returns {Object} data - response payload
 */
async function put(urlPath, body, queryStrParameters, headers) {
  const [data, res] = await raw(
    'PUT',
    urlPath,
    body,
    queryStrParameters,
    headers
  );
  return data;
}
/** Internal method for handling HTTP POST requests
 *
 * @param {String} urlPath - Url path to be added to base url path provided in SetUp where request will be made.
 * @param {String} queryStrParameters - params to be send via url.
 * @param {Object} headers - Header params to be included. Object of key value pairs.
 * @returns {Object} data - response payload
 */
async function _delete(urlPath, queryStrParameters, headers) {
  const [data, res] = await raw(
    'DELETE',
    urlPath,
    undefined,
    queryStrParameters,
    headers
  );
  return data;
}

/** Method to utalize SQLpassthrough - for executing a query
 *
 * @param {String} httpMethod - HTTP Method to be used in in the http request send.
 * @param {String} queryID - Name of as is in SlashDB interface.
 * @param {Object} parameters - params to be send via url.
 * @param {Object} queryStrParameters - Specific params to be passed in url string for query in object as key value pair format.
 * @param {Object} headers - Header params to be included. Object of key value pairs.
 * @returns
 */
async function executeQuery(
  httpMethod,
  queryID,
  parameters,
  queryStrParameters,
  headers
) {
  const queryUrlParametersStr = `/query/${queryID}${queryParamsConstructor(
    parameters
  )}`;
  switch (httpMethod) {
    case 'get':
      return await get(queryUrlParametersStr, queryStrParameters, headers);
    case 'post':
      return await post(
        queryUrlParametersStr,
        undefined,
        queryStrParameters,
        headers
      );
    case 'put':
      return await put(
        queryUrlParametersStr,
        undefined,
        queryStrParameters,
        headers
      );
    case 'delete':
      return await _delete(queryUrlParametersStr, queryStrParameters, headers);

    default:
      return await get(queryUrlParametersStr, queryStrParameters, headers);
  }
}
//Function to utalize data discovery
/**
 *
 * @param {String} httpMethod - HTTP Method to be used in in the http request send.
 * @param {String} database - Name of database to be accessed
 * @param {Object} parameters - params to be send via url.
 * @param {*} queryStrParameters
 * @param {Object} body - payload to be send. Object of key value pairs.
 * @param {Object} headers - Header params to be included. Object of key value pairs.
 * @returns
 */
async function dataDiscovery(
  httpMethod,
  database,
  parameters,
  queryStrParameters = {},
  body = undefined,
  headers
) {
  const dataDiscoveryUrlParametersStr = `/db/${database}${dataDiscoveryParamsConstructor(
    parameters
  )}`;
  switch (httpMethod) {
    case 'get':
      return await get(
        dataDiscoveryUrlParametersStr,
        queryStrParameters,
        headers
      );
    case 'post':
      return await post(
        dataDiscoveryUrlParametersStr,
        body,
        queryStrParameters,
        headers
      );
    case 'put':
      return await put(
        dataDiscoveryUrlParametersStr,
        body,
        queryStrParameters,
        headers
      );
    case 'delete':
      return await _delete(
        dataDiscoveryUrlParametersStr,
        queryStrParameters,
        headers
      );

    default:
      return await get(
        dataDiscoveryUrlParametersStr,
        queryStrParameters,
        headers
      );
  }
}
//helper functions
//handles the requests responce
async function handleResponse(response) {
  return await response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
//help construct url path from array for data discovery
function dataDiscoveryParamsConstructor(queryParamsArr) {
  let pathStr = '';
  if (queryParamsArr) {
    queryParamsArr.map((param) => {
      return (pathStr += `/${param}`);
    });
  }
  return pathStr;
}
//help construct string url path from object for ease of use
function queryParamsConstructor(queryParamsObj) {
  let pathStr = '';
  Object.keys(queryParamsObj).forEach(function eachKey(key) {
    pathStr += `/${key}/${queryParamsObj[key]}`;
  });
  return pathStr;
}
//help construct string options for url
function queryStrParamsConstructor(queryStrParamsObj) {
  let queryStrParams = '?';
  Object.keys(queryStrParamsObj).forEach(function eachKey(key) {
    queryStrParams += `${key}=${queryStrParamsObj[key]}&`;
  });
  return queryStrParams;
}
