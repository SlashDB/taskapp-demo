# Demo Task List App using Slashdb, React and SlashDB SDK for Javascript and React
---
[SlashDB](https://www.slashdb.com/), [SlashDB documentation](https://www.slashdb.com/documentation/), [react-slashdb](https://github.com/SlashDB/react-slashdb), [react-slashdb documentation](https://slashdb.github.io/react-slashdb/)
---

This repository contains a proof-of-concept task list app which demonstrates how to use SlashDB in a React project.  It utilizes a Javascript and React SDK created to help developers integrate SlashDB into their projects quickly and easily.

## Table of Contents
[Overview](#overview)

[Tools used](#tools-used)

[Running the App](#running-the-app)

&nbsp;&nbsp;&nbsp;&nbsp;[Prerequisites](#prerequisites)

&nbsp;&nbsp;&nbsp;&nbsp;[Demo server](#how-to-run-app-in-local-environment-with-connection-to-slashdb-demo-server)

&nbsp;&nbsp;&nbsp;&nbsp;[Local server](#how-to-run-app-in-local-environment-with-connection-to-a-local-slashdb-server)

[How the App was Created / Example Use of SDK Functionality](#how-the-app-was-created--example-use-of-sdk-functionality)

&nbsp;&nbsp;&nbsp;&nbsp;[Set Up](#setting-up-parameters-for-connection-to-slashdb-server-data-format-and-api-key)

&nbsp;&nbsp;&nbsp;&nbsp;[Auth](#authentication-functionality)

&nbsp;&nbsp;&nbsp;&nbsp;[Hooks for Data Access](#using-hooks-to-interact-with-database-via-slashdb-api)

[References](#references)

## Overview

App functions:
- lists can be created or deleted
- tasks associated with a specific list can be added/removed/marked completed
- the app automatically calculates the percentage of completed tasks in each list
- all lists and tasks can be changed after they have been created; this is achieved by utilizing the SlashDB API to perform updates on a SQLite database


![Login Screen](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/Login_Screen.jpg 'Login Screen')

![Task_App_Main_Screen](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/Task_App_Main_Sreen.jpg 'Task_App_Main_Screen')

The SDK provides methods that allow:
- setting up a connection to a SlashDB instance
- basic authentication using an API key or username/password
- CRUD operations on the SlashDB-enabled database
- executing pre-defined queries on the SlashDB-enabled database

The React package uses the [SlashDB JavaScript SDK](https://github.com/SlashDB/js-slashdb) under the hood.  It also includes custom hooks to execute the functions listed above, and abstracts some of the state management.

If you want to use the SDK as part of the project, you can get it at this repo: https://github.com/SlashDB/react-slashdb.  It's also available as an npm package, [@slashdb/react-slashdb](https://www.npmjs.com/package/@slashdb/react-slashdb).  From there, you can use import statements in your project to access the exposed methods found in the SDK. 

If you want to run the demo app in your local environment, follow the instructions under **[How to run app in local environment with connection to remote SlashDB demo server](#how-to-run-app-in-local-environment-with-connection-to-slashdb-demo-server)**. 

If you want to run the app in your local environment with a local SlashDB server, follow the instructions under **[How to run app in local environment with connection to a local SlashDB server](#how-to-run-app-in-local-environment-with-connection-to-a-local-slashdb-server)**. 

        
## Tools used

### SlashDB

SlashDB is an application that automatically creates a fully functional REST API for most popular SQL-based relational databases.  By automating this process, developers can focus their time on product development, and put aside designing/coding/testing an API for database-centric applications - SlashDB takes care of the details.

### React
React is a front-end framework for creating web applications, using a component-based development model. 

### SlashDB JavaScript SDK
[A JavaScript SDK written in ES6 syntax for interacting with SlashDB](https://github.com/SlashDB/js-slashdb)

### SQLite

SQLite is a simple relational database package. While SlashDB supports a variety of SQL databases, this project utilizes SQLIte to demonstrate the capabilities of the SDK and how to integrate SlashDB in Javascript and React applications.

### Stack

![Stack](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/Stack.jpg 'Stack')

### Database

The database used for this app is a SQLite database named ```taskdatadb```. It consists of two tables: ```TaskList(TaskListId (PK), Name)``` and ```TaskItem(TaskitemId (PK), Task, Checked, TaskListId (FK))```. A list may contain any number of tasks or none. If a task exists, it must be associated with one and only one list.

![UML Diagram](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/UML_Diagram.jpg 'UML Diagram')

## Running the App

### Prerequisites
- NodeJS
  
  https://nodejs.org/en/
  
  ```sudo apt install nodejs```
- npm (Node Package Manager)
  
  https://www.npmjs.com/
  
  ```sudo apt install npm```
    
- Docker (for local SlashDB only)
  
  https://www.docker.com
  
  ```sudo apt install docker```
  
### How to Run App in Local Environment with Connection to SlashDB Demo Server

1. Pull this repo to your local environment via preferred method. Use ```git clone https://github.com/SlashDB/taskapp-demo.git``` in your target local directory or download the zip archive and extract to your target local directory.

2. Open a terminal and navigate to the target local directory. Run commands:

to pull all dependencies:

        npm install

to start dev server:

        npm start

Then open a browser and navigate to http://localhost:3001/

### How to Run App in Local Environment with Connection to a Local SlashDB Server

#### Pull Demo App Repo

1. Pull this repo to your local environment via preferred method. Use ```git clone <https://github.com/SlashDB/taskapp-demo.git>``` in your target local directory or download the zip archive and extract to your target local directory.


2. Open a terminal and navigate to the target local directory. To pull all dependencies, run command:

        npm install

3. Edit file .env and modify this line:

   ```REACT_APP_SLASHDB_SERVER_URL=https://demo.slashdb.com```
   to
   ```REACT_APP_SLASHDB_SERVER_URL=http://localhost:8000```

*The local SlashDB server will be configured to listen on port 8000 in the next section; if using an alternate port, make sure to modify the command accordingly.*

#### Set Up Local SlashDB Server with Docker

1.  Open terminal and navigate to taskapp-demo folder:

        cd taskapp-demo

2.  Download the SlashDB docker image provided by our team from Docker Hub:

        docker pull slashdb/slashdb

3.  Check if the image is present in your local repo by (image id may differ):

        docker images
        REPOSITORY      TAG         IMAGE ID        CREATED             SIZE
        slashdb         latest      edfc56915a4c    About an hour ago   1.237 GB

4.  Download and unzip the default SlashDB configuration files while in the local target directory:

        wget -c https://downloads.slashdb.com/latest/default-slashdb-configs.zip
        unzip default-slashdb-configs.zip

5.  Copy and replace the files ```databases.cfg, taskdatadb.sqlite, users.cfg and querydefs.cfg.``` from ```data``` to ```slashdb```

        cp ./data/* ./slashdb

![Copy_Files_2](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/Copy_Files_2.jpg 'Copy_Files_2')

6.  Verify list of files

        ls slashdb
        auth.cfg  databases.cfg  license.key  nginx.conf  querydefs.cfg  slashdb.ini  taskdatadb.sqlite  users.cfg

7.  Create folder for **SlashDB** logs.

        mkdir slashdb-log

8.  Create **SlashDB** docker container:

   Linux:

         docker run -d -p 8000:80 -v $(pwd)/slashdb:/etc/slashdb -v $(pwd)/slashdb-log:/var/log/slashdb slashdb/slashdb

   Windows (PowerShell):

         docker run -d -p 8000:80 -v $pwd/slashdb:/etc/slashdb -v $pwd/slashdb-log:/var/log/slashdb slashdb/slashdb

   Windows (Command Prompt):

         docker run -d -p 8000:80 -v %cd%/slashdb:/etc/slashdb -v %cd%/slashdb-log:/var/log/slashdb slashdb/slashdb

9.  In your browser, go to http://localhost:8000 to finish the initialization process. For more details see the [video](https://www.youtube.com/watch?v=XLqTX0XHXNI) and [SlashDB Documentation](https://docs.slashdb.com/user-guide/configuration.html)

10.  Browse task app data at http://localhost:8000/db/taskdatadb.html. You can find more on how to use SlashDB API at https://docs.slashdb.com/user-guide/using-slashdb.html

![Server view](https://user-images.githubusercontent.com/807888/132827985-7813ebc9-9adf-4418-a369-fc1684995882.png 'Server view')

#### Start App

1.  Run app with node dev server. Open a terminal and navigate to the target local directory. Run command:

         npm start

Then open a browser and navigate to http://localhost:3000/

## How the App was Created / Example Use of SDK Functionality

### Setting up Parameters for Connection to SlashDB Server, Data Format and API Key

We use the React component ```SlashDBProvider``` from the npm package react-slashdb in file ```index.js``` to pass variables to the app for use later when making HTTP requests. See the [SlashDB React SDK documentation](https://github.com/SlashDB/react-slashdb) for more details.  Below is the code used in the demo app:

Import:

        import { SlashDBProvider } from '@slashdb/react-slashdb';

Call component and wrap:

        <SlashDBProvider
        baseUrl={process.env.REACT_APP_SLASHDB_SERVER_URL}
        setUpOptions={{
        username: process.env.REACT_APP_DATABASE_USERNAME,
        apiKey: process.env.REACT_APP_USER_API_KEY,
        }}
        >
        <App />
        </SlashDBProvider> 

Here we have used a ```.env``` file (a feaure of NodeJS) to store the SlashDB connection parameters. 

Now we will call ```useSetUp``` in the ```App.js``` file to ensure the custom hooks can access the parameters provided in the previous step.

    import { useSetUp } from '@slashdb/react-slashdb';
    ...
    useSetUp();

### Authentication Functionality

Let's examine the ```Login.js``` file. We provide a username and password to the ```auth.login``` method:

    import { useSetUp, auth } from '@slashdb/react-slashdb';
    ...
    sdbClient = useSetUp();
    const handleSubmit = (event) => {
            auth.login(username, password, sdbClient, () => {
            props.history.push('/app');
    });
            event.preventDefault();
    };
On successful login, the browser will redirect to the ```/app``` URL.  For more information on the ```auth``` class, see the [SlashDB React SDK](https://github.com/SlashDB/react-slashdb)

### Using Hooks to Interact with Database via SlashDB API
Once we have logged in, the file ```ListApp.js``` will be loaded. This is where we actually access the database and retrieve some information.  First, we will import the required functions:

    import { useDataDiscovery, auth } from '@slashdb/react-slashdb';
    
Then we will call the imported hook ```useDataDiscovery``` to retrieve the data in table ```TaskList``` and obtain some function references for interacting with the table:

    const [lists, getList, postList, putList, deleteList] = useDataDiscovery(
    process.env.REACT_APP_DATABASE_NAME,
    'TaskList'
    );

```lists``` is an array that will hold all information in the ```TaskList``` table .   Constants ```getList```, ```postList```, ```putList```, and ```deleteList``` are function references that we can call with some parameters to make GET, POST, PUT and DELETE calls to the SlashDB API to interact with the database.  We can pass these constants down to the child components.

The file ```Lists.js``` is a simple container for our ```List``` components; the constants created above are passed down in this file to each ```List``` component.  In the file ```List.js``` we have the following code:

      import { DataDiscoveryFilter, SQLPassThruFilter, eq } from '@slashdb/js-slashdb';
      .
      .
      .
      const { TaskListId, list, getList, putList, deleteList } = props;
      const [task, setTask] = useState('');

      const taskListIDPath = new DataDiscoveryFilter(eq('TaskListId',TaskListId));
      const queryParams = new SQLPassThruFilter({'TaskListId':TaskListId});

      const [tasks, getTasks, postTask, putTask, deleteTask] = useDataDiscovery(
        'taskdatadb',
        taskListIDPath
      );

      const [queryData, executeMyQuery] = useExecuteQuery(
        'get',
        'percent-complete',
        queryParams
      );

Let’s step through what’s happening here:
- we deconstruct props from the parent component
- we call the ```useState``` hook to hold and update a task
- We use two classes from the [SlashDB JavaScript SDK](https://github.com/SlashDB/js-slashdb) to create filters for the `useDataDiscovery` and `useExecuteQuery` hooks: `DataDiscoveryFilter` and `SQLPassThruFilter`, along with the `eq` filter function.  It's not required to use these classes to create filters, but it makes things easier for someone who doesn't understand SlashDB URL endpoints.  These classes create endpoints to a resource path like the one below.  You can access the SlashDB server in a browser, open the database table for ```TaskItem```, and check the URL path in the location bar. For example: 

  https://demo.slashdb.com/db/taskdatadb/TaskItem/TaskListId
  
  contains the base URL (```https://demo.slashdb.com```), the database name used in the ```useDataDiscovery``` call (```taskdatadb```), the table to return (```TaskItem```), and a field to filter by (```TaskListId```).
- we call the ```useDataDiscovery``` hook with the `DataDiscoveryFilter` object to get function references for updating the individual tasks, requesting data from the ```TaskItem``` table in the same database.  Since the task items are specific to each list, we also provide the ```TaskListId``` so that the data returned is filtered for each unique list.  
- with the ```useExecuteQuery``` hook, we can make use of another SlashDB feature - SQL Pass-thru. 

To summarize, the ```useDataDiscovery``` hook enables Data Discovery functionality, and ```useExecuteQuery``` enables SQL Pass-thru. ```useExecuteQuery``` takes two parameters - the name of the query to be executed, and any parameters the query requires to execute.  The query itself is defined in the SlashDB administrative panel, and the query name used in the function parameter should match the name given in SlashDB.  This app uses the query below:

    SELECT
            (SUM(Checked) * 100 / COUNT(Checked)) Percentage
    FROM TaskItem
    Where TaskListId = :TaskListId

 If you want to know more about what SlashDB offers and what the react-slashdb SDK offers, you can review the documentation for both products. Note that currently,  the react-slashdb package has some limited functionality as compared to what SlashDB contains. 

## References 
### SlashDB Docs - https://www.slashdb.com/documentation/
### SDK for React (react-slashdb package) - https://github.com/SlashDB/react-slashdb and https://www.npmjs.com/package/react-slashdb
### SlashDB Website - https://www.slashdb.com/         
