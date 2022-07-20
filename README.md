# Demo task list keeping app with Slashdb, ReactJS and SlashDB SDK for Javascript and ReactJS
---
[SlashDB](https://www.slashdb.com/), [SlashDB documentation](https://www.slashdb.com/documentation/), [react-slashdb](https://github.com/SlashDB/react-slashdb), [react-slashdb documentation](https://slashdb.github.io/react-slashdb/)
---

This repository contains a proof-of-concept task list app which demonstrates how to use SlashDB in a React project.  It utilizes a Javascript and ReactJS SDK created to help developers integrate SlashDB in their project quickly and easily.

## Table of Contents
[Overview](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#overview)

[Tools used](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#tools-used)

[Running the App](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#running-the-app)

&nbsp;&nbsp;&nbsp;&nbsp;[Prerequisites](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#prerequisites)

&nbsp;&nbsp;&nbsp;&nbsp;[Demo server](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#how-to-run-app-in-local-environment-with-connection-to-slashdb-demo-server)

&nbsp;&nbsp;&nbsp;&nbsp;[Local server](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#how-to-run-app-in-local-environment-with-connection-to-a-local-slashdb-server)

[How it was build and example react-slashdb package use](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#how-the-app-was-built-and-example-use-of-sdk-functionality)

&nbsp;&nbsp;&nbsp;&nbsp;[set up](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#setting-up-params-for-connection-to-slashdb-server-data-format-and-api-key)

&nbsp;&nbsp;&nbsp;&nbsp;[auth](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#authentication-and-login-functionality)

&nbsp;&nbsp;&nbsp;&nbsp;[hooks for data access](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#using-hooks-to-interact-with-database-via-slashdb-api)

[What are useDataDiscovery and useExecuteQuery hooks?](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#what-are-usedatadiscovery-and-useexecutequery-hooks)

&nbsp;&nbsp;&nbsp;&nbsp;[useDataDiscovery](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#usedatadiscovery)

&nbsp;&nbsp;&nbsp;&nbsp;[useExecuteQuery](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#useexecutequery)

[References](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#references)

## Overview

App functions:
- lists can be created or deleted
- tasks associated with a specific list can be added/removed/marked completed
- the app automatically calculates the percentage of completed tasks in each list
- all lists and tasks can be changed after they have been created; this is achieved by utilizing the SlashDB API to perform updates on a SQLite database


![Login Screen](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/Login_Screen.jpg 'Login Screen')

![Task_App_Main_Sreen](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/Task_App_Main_Sreen.jpg 'Task_App_Main_Sreen')

The SDK is divided into two parts: a vanilla Javascript library for SlashDB and a ReactJS package for creating React apps that can use a database that is exposed by SlashDB. The SDK exposes methods that allow:
- setting up a connection to a SlashDB instance
- basic authentication using an API key or username/password
- CRUD operations on the SlashDB-enabled database

Custom hooks accomplishing this functionality are also included. This part of the SDK caters to ReactJS projects and abstracts some of the state management.

If you want to use the SDK part of the project, please follow the link to this repo: https://github.com/SlashDB/react-slashdb. From there, you can use import statements in your project to access the exposed methods found in the SDK. 

If you want to run the demo app in your local environment, follow the instructions under **[How to run app in local environment with connection to remote SlashDB demo server](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#how-to-run-app-in-local-environment-with-connection-to-slashdb-demo-server)**. 

If you want to run the app in your local environment with a local SlashDB server, follow the instructions under **[How to run app in local environment with connection to a local SlashDB server](https://github.com/SlashDB/taskapp-demo/blob/main/README.md#how-to-run-app-in-local-environment-with-connection-to-a-local-slashdb-server)**. 

        
## Tools used

### SlashDB

SlashDB is an application that automatically creates a fully functional REST API for any given relational database.  By automating this process, developers can focus their time on product development, and put aside designing/coding/testing an API for database-centric applications - SlashDB takes care of the details.


### ReactJS

ReactJS is a front-end framework for creating web applications, using a component-based development model. 

### SQLite

SQLite is a simple relational database package. While SlashDB supports a variety of SQL databases, this project utilizes SQLIte to demonstrate the capabilities of the SDK and how to integrate SlashDB in Javascript and ReactJS applications.

### Stack

![Stack](https://github.com/SlashDB/taskapp-demo/blob/main/public/images/Stack.jpg 'Stack')

### Database

The database used for this app is a SQLite database named taskdatadb. It consists of two tables: TaskList(TaskListId (PK), Name) and TaskItem(TaskitemId (PK), Task, Checked, TaskListId (FK)). A list may contain any number of tasks or none. If a task exists, it must be associated with one and only one list.

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
  
### How to run app in local environment with connection to SlashDB demo server

1. Pull this repo to your local environment via preferred method. Use ```git clone <https://github.com/SlashDB/taskapp-demo.git>``` in your target local directory or download the zip archive and extract to your target local directory.

2. Open a terminal and navigate to the target local directory. Run commands:

to pull all dependencies:

        npm install

to start dev server:

        npm start

Open browser and navigate to http://localhost:3000/

### How to run app in local environment with connection to a local SlashDB server

#### Pull demo app repo

1. Pull this repo to your local environment via preferred method. Use ```git clone <https://github.com/SlashDB/taskapp-demo.git>``` in your target local directory or download the zip archive and extract to your target local directory.


2. Open a terminal and navigate to the target local directory. To pull all dependencies, run command:

        npm install

3. Edit file .env and modify this line:

   ```REACT_APP_SLASHDB_SERVER_URL=https://demo.slashdb.com```
   to
   ```REACT_APP_SLASHDB_SERVER_URL=http://localhost:8000```

*The local SlashDB server will be configured to listen on port 8000 in the next section; if using an alternate port, make sure to modify the command accordingly*

#### Set up local server of SlashDB with Docker

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

7.  Navigate to folder slashdb and run command:

   Linux:

         docker run -d -p 8000:80 -v $(pwd):/etc/slashdb -v $(pwd):/var/log/slashdb slashdb/slashdb

   Windows:

         docker run -d -p 8000:80 -v C:\Current\TestLocalWithConfic\slashdb:/etc/slashdb -v C:\Current\TestLocalWithConfic\slashdb:/var/log/slashdb slashdb/slashdb

8.  In your browser go to http://localhost:8000 to finish the initialization process. For more details see the [video](https://www.youtube.com/watch?v=XLqTX0XHXNI) and [SlashDB Documentation](https://docs.slashdb.com/user-guide/configuration.html)

9.  Visit and browse task app data at http://localhost:8000/db/taskdatadb.html. You can find more on how to use SlashDB API at https://docs.slashdb.com/user-guide/using-slashdb.html

![Server view](https://user-images.githubusercontent.com/807888/132827985-7813ebc9-9adf-4418-a369-fc1684995882.png 'Server view')

#### Start app

1.  Run app with node dev server. Open a terminal and navigate to the target local directory. Run command:

         npm start

Open browser and navigate to http://localhost:3000/

## How the app was built and example use of sdk functionality
---

### Setting up params for connection to SlashDB server, data format and API key.

We use the exposed React component **SlashDBProvider** from the npm package **react-slashdb** in file index.js to pass variables to the sdk for use later when making http requests. Under the hood the ReactJS custom components and hooks used in this app call plain Javascript methods so in practise those can be used instead if you do not wish to use React. However since React makes front-end dev. quicker and more reusable this project is heavily geared towards demonstratng how to use react-slashdb with ReactJS. 

Fist we import **SlashDBProvider** into index.js and then we wrap the App component so that all passed params can be retrieved down the component tree if need be. We pass the params as key value pairs in the component. Here is a code snipit of how to do so:

Import:

        import { SlashDBProvider } from 'react-slashdb';

Call component and wrap:

        <SlashDBProvider
        baseUrl={process.env.REACT_APP_SLASHDB_SERVER_URL}
        setUpOptions={{
        dataFormatExt: 'json',
        apiKey: process.env.REACT_APP_USER_API_KEY,
        }}
        >
        <App />
        </SlashDBProvider> 
        
Here we have used .env file to both hide some params and to only need to change values in one place in case we need to pass the same params somewhere higher up the component tree (no the case with this demo app but good practice). All the passed params are strings. For more detail please refer to the documentation available from the git repo associated with the package react-slashdb.

Second we will call **useSetUp** in the app.js to ensure internal values are set based on passed params from previous step.

        import { useSetUp } from 'react-slashdb';
        ...
        useSetUp();
        
### Authentication and login functionality     
        
Next we will take a look at the Login.js. Now here there are a few things to understand. First when using a local SlashDB server (review steps above for spinning up the app with local server) you will have the option to log-in only with username and password. The remote demo server of SlashDB does not allow cors and so you will need to provide an API key as shown in step one of this brief explanation on how the app was set up. In file Login.js there are a few things that happen: we allow user to input username and password and we store them locally with help from the React useState hook as this is not related to how to use the sdk and it is general knowledge on React, it will not be of concern. What is of concern us the method **login** of the class **auth** exposed by the package **react-slashdb**. This method takes a username, password and a function to perform upon successful validation. Note if you are using local server for SlashDB and no API key password must be valid if you are using local or remote server as long as API key and username are correct the method auth.login with pass with success and the passed function will run. Here is a code snipit:

        import { useSetUp, auth } from 'react-slashdb';
        ...
        const handleSubmit = (event) => {
                auth.login(username, password, () => {
                props.history.push('/app');
        });
                event.preventDefault();
        };
We have called useSetUp as a redundancy in case it is not called before.

If we have successfully logged-in, the path app will be pushed to the url and the file ListApp.js will be loaded. This is where we actually access our database and retrieve some information. First we will import the needed fuctions as so:

        import { useDataDiscovery, auth } from 'react-slashdb';
        
Then we will use the imported hook useDataDiscovery get the table **TaskList** and also map some function name for later use:
        
        const [lists, getList, postList, putList, deleteList] = useDataDiscovery(
        process.env.REACT_APP_DATABASE_NAME,
        ['TaskList']
        );
The lists const will now hold all information in TaskList table and as the names imply getList, postList, putList and deleteList are mapped to functions we can call and by passing a few params execute HTTP request GET, POST, PUT and DELETE to the SlashDB API in order to interact with our database.

The other important part here is the **auth.logout**. This simply sends a logout request to the SlashDB API to logout the user.

        onClick={async () => {
          await auth.logout(() => {
            props.history.push('/');
          });
        }}
        
From there we pass our constants down the component tree to be used at the need level.

### Using hooks to interact with database via Slashdb API 

Let's take a look at the file List. You may think that list will be of interest but we simply pass down params and functions we just discussed and map throw the items in the table  **TaskList** to display a list for each item in the table. As this is only React specific code it is outside of the scope of this guide. In the file List.js we will have some sdk interactions and so they are of intrest to look at.

List.js

          const { TaskListId, list, getList, putList, deleteList } = props;
          const [task, setTask] = useState('');

          const location = ['TaskList', 'TaskListId', `${TaskListId}`];

          const [tasks, getTasks, postTask, putTask, deleteTask] = useDataDiscovery(
            'taskdatadb',
            ['TaskItem', 'TaskListId', `${list.TaskListId}`]
          );

          const [queryData, executeMyQuery] = useExecuteQuery(
            'get',
            'percent-complete',
            {
              TaskListId: `${TaskListId}`,
            }
          );
          
Ok so what's going on here. First we deconstruct props we got from parent cmponent. The we declare const to hold a task and to be able to update task. The we define an array which holds the path to the resource we will access. How do we know what that path is and what to put in the array? Well first we can visit the SlashDB server and access the database from the GUI and observe the url path or simple just go down the database. Here is an example: https://demo.slashdb.com/db/taskdatadb/TaskList/TaskListId as you can see first we have the base url we provided in step one of this guide then we have the database name we provided when we called **useDataDiscovery** in the previous step and after that we have the values from the array in order. This location param will be passed down the component tree for later use. Now we again call the custom hook  **useDataDiscovery** and map some functions for use later on. This time we are mapping on a different table for the same database. As the Tasks are list specific we also pass the TaskListId as a inherit param so that each time this component is called it will map task related data and functions to specific lists. Next we will used **useExecuteQuery** this allows us to make use of the other major functionality of SlashDB - SQL Pass-thru. So to sum up **useDataDiscovery** hook utilizes Data Discovery functionality and **useExecuteQuery** utilizes SQL Pass-thru. If you want to know more about what SlashDB offers and what the react-slashdb sdk offers please review the documentation for both products. Note as of date the package react-slashdb only offers limited fuctionality of what SlashDB offers as a whole. **useExecuteQuery** takes a few params - first, method to be used by HTTP request, second, name of query to be executed, and third, any params the query itself requres in order to execute.

Let's look at examples of how to use the fuctions we get back from both **useDataDiscovery** and **useExecuteQuery**

## What are useDataDiscovery and useExecuteQuery hooks? 
---

**useDataDiscovery**
---

        const [lists, getList, postList, putList, deleteList] = useDataDiscovery(
                process.env.REACT_APP_DATABASE_NAME,
                ['TaskList']
        );
        
PLease refer to the documentation of the sdk itself for full description of the methods and functions below you may find a quick and simple explanation accompanied by examples this does not mean it is the only way to use it. Some functions may be able to take more params than in the examples below. 

**data** - lists
The first const this hook maps to is the data returned from the initial get request made to the table provided in the set up params of the useDataDiscovery hook. We use it like any other array in this and most cases. For more details you will need to look at what your database holds at that endpoint. Here we iterate over the elements in lists and create a list component for each one.    

        {lists.map((list) => (
        <List
          key={list.TaskListId}
          TaskListId={list.TaskListId}
          list={list}
          getList={getList}
          putList={putList}
          deleteList={deleteList}
        />
      ))}

**get** - getList
This fuction allows us to fetch data from the SlashDB server (previously defined in the set-up stage with the help of SlashDBProvider), the database (previously defined in the initial call of the custom hook useDataDiscovery) and whatever other params we provide to specify the resource we want to retreive. Be careful when using this method as it will update the value of the **data**. As this is part of the custom hook functionality for abstracting state management within ReactJS projects when we call this method what will happen in the backgound is a fetch request will be made to the desired end point if we do not provide any params we will fetch and replace the value held in the **data** part of the hook. In other word let's say we made the call as shown above for **useDataDiscovery** now our lists constant holds an array with some data if we call **getList();** we will simply update the value but still be accessing the same endpoint (this may be useful when the same data is accessed from more than one source and data needs to be refreshed periodically without any other manipulation on the data). However, if you are using the data or in this example's case **lists** and all of a sudden you give it a new value, bad things will happen. If you need to drill down the database either use **useDataDiscovery** with new params and set up second (or as many as you need) instances or drill down manually - the same way you would any other array or object.  
        
        getList(['TaskList', 'TaskListId', `${TaskListId}`]);
        or
        getList();
        
**post** - postList
Used for adding new data to the database we are interacting with. As with other functions we have seen so far from the **useDataDiscovery** we will provide first an array with the path to the resource we wish to access. In this case the resource array only refers to the table to be added to. Second we will provide an object with key value pairs to be inserted in the table as a new entry. For specifics on the object key value pairs refer to your database. In our case, IDs are generated automatically based on index so the only value we need to provide for this entry is the name.    

        postLists(['TaskList'], {
                Name: listName ? listName : 'New List',
        })

**put** - putList
As similar to the **post** functionality but here we only update a value of an existing entry. So the fisrt param needs to point to the actual entry not just the table it is in. The secound param is just as with the previous function an object with the key value pairs we wish to update.    

        await update(['TaskList', 'TaskListId', `${TaskListId}`], { [fieldName]: `${fieldValue}` });

**delete** - deleteList
Remove entry at the specified location

        deleteList(['TaskList', 'TaskListId', `${TaskListId}`]);

All functions **get**, **post**, **put** and **delete** also fetch the value of **data** as is in the database after they interact with it. In this way state management is abstracted and user does not need to worry about useEffects. Only exception is **get** which can not only fetch the value but can change the value being targeted.  

**useExecuteQuery**
---

        const [queryData, executeMyQuery] = useExecuteQuery(
                'get',
                'percent-complete',
                {
                TaskListId: `${TaskListId}`,
                }
        );

**data** - queryData
The data returned by the query after execution. Array with objects. We access the array position and the value of the key we wish to use. In this case the query is pretty simple but a lot more complex queries are possible. For your convenience please find below the query code, as well.

        <p>Completed tasks {queryData[0].Percentage} %</p>
        
        SELECT
                (SUM(Checked) * 100 / COUNT(Checked)) Percentage
        FROM TaskItem
        Where TaskListId = :TaskListId
        
**execute** - executeMyQuery       
Just as the name implies it allows for execution of query with new or same params. 

        executeMyQuery('get', 'percent-complete', {
                TaskListId: `${TaskListId}`,
        });
        
## References 
---

### SlashDB Docs - https://www.slashdb.com/documentation/
### SlashDB Website - https://www.slashdb.com/

### SDK for React (react-slasshdb package) - https://github.com/SlashDB/react-slashdb and https://www.npmjs.com/package/react-slashdb
         
