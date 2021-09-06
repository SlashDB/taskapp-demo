# Demo task list keeping app with Slashdb, ReactJS and SlashDB SDK for Javascript and ReactJS

This repository contains a task list keeping app which shows how to use SlashDB for your React project. The app allows users to create and maintain lists with tasks. Lists can be created or deleted. Tasks associated with a specific list can be added, removed, and checked as complete or incomplete. The app automaticaly calculates percentage of completed tasks in each list. All lists and tasks can be changed after they have been created. This is achived by utilizing SlashDB API to retrive and commit changes to a sqlite database. This demo app contains and utilizes a Javascript and ReactJS SDK developed for the purpose of helping developers integrate SlashDB in their project quickly and easily.

![Login Screen](https://github.com/SlashDB/slashdb-react-sdk/blob/main/public/images/Login_Screen.jpg 'Login Screen')

![Task_App_Main_Sreen](https://github.com/SlashDB/slashdb-react-sdk/blob/main/public/images/Task_App_Main_Sreen.jpg 'Task_App_Main_Sreen')

The SDK can be abstractly broken up into two parts one dedicated to functionality soley requiring the use of Javascript and one geared towards ReactJS based projects. The SDK exposes methods which allow set up of connection to a database via SlashDB as midware, basic authentication with the use of an API key, username and password as well retrieving, and committing data to said database. Custom hooks accomplishing the above listed functionality are also included. This part of the SDK caters to ReactJS projects and abstracts some of the state management.

If you simply wish to use the SDK part of the project, please follow the link to this repo "insert link here". From there you can use import statements in your project to access the exposed methods found in the sdk. If you wish to run the demo app in your local environment, follow the instructions under "How to run app in local environment with connection to remote SlashDB demo server". If you wish to run the app in your local environment with a local Slashdb server follow the instructions under "How to run app in local environment with connection to a local SlashDB server". To simply access live version of the demo app follow this link "insert link here".

## Brief Description

---

### SlashDB

SlashDB can automatically generate a REST API from relational databases making it easy to access and modify data. In general, it is a big time-saver and makes connecting and using relational databases in web-based applications much easier.

### ReactJS

ReactJS is a front-end framework developed by Facebook. It is ideal for single page applications and it strongly lends itself to the component-based model of development. Allowing for highly flexible and reusible code.

### SQLite

Sqlite is a simple relational database management system. While SlashDB supports a wide array of other more powerful ones for this demo project it is enough to use a sqlite database to show the capabilities of the SDK and how easy it is to integrate SlashDB in JS and ReactJS projects.

### Stack

![Stack](https://github.com/SlashDB/slashdb-react-sdk/blob/main/public/images/Stack.jpg 'Stack')

### Database

The database used for this app is a sqlite database named taskdatadb. It consists of two tables: TaskList(TaskListId (PK), Name) and TaskItem(TaskitemId (PK), Task, Checked, TaskListId (FK)). A list may contain any number of tasks or none. If a task exists it must be associated with one and only one list.

![UML Diagram](https://github.com/SlashDB/slashdb-react-sdk/blob/main/public/images/UML_Diagram.jpg 'UML Diagram')

## How to run app

### How to run app in local environment with connection to remote SlashDB demo server

1. Pull repo to your local environment via preferred method. Use "git clone <https://github.com/SlashDB/slashdb-react-sdk.git>" in preferred local directory or Download zip and unzip in preferred local directory.

2. Open a terminal and navigate to where the repo resides on your local system. Run commands:

**If you do not have NodeJS on your system get it from here - "https://nodejs.org/en/"**

to pull all dependencies:

        npm install

to start dev server:

        npm start

Use a browser to visit - "http://localhost:3000/"

### How to run app in local environment with connection to a local SlashDB server

#### Pull demo app repo

1. Pull repo to your local environment via preferred method. Use "git clone <https://github.com/SlashDB/slashdb-react-sdk.git>" in preferred local directory or Download zip and unzip in preferred local directory.

2. Open a terminal and navigate to where the repo resides on your local file system. Run commands:

**If you do not have NodeJS on your system get it from here - "https://nodejs.org/en/"**

to pull all dependencies:

        npm install

3. Go to file .env and change

   REACT_APP_SLASHDB_SERVER_URL=<https://demo.slashdb.com>
   to
   REACT_APP_SLASHDB_SERVER_URL=<http://localhost:8000>

**This is important as port 8000 is where we will start our local Slahsdb server**

#### Set up local server of SlashDB with Docker

1.  First download the SlashDB docker image provided by our team from Docker Hub. Input the following:

        docker pull slashdb/slashdb

2.  Check if the image is present in your local repo by (image id may differ):

        docker images
        REPOSITORY      TAG         IMAGE ID        CREATED             SIZE
        slashdb         latest      edfc56915a4c    About an hour ago   1.237 GB

3.  Unzip the default SlashDB configuration files:

        wget -c https://downloads.slashdb.com/latest/default-slashdb-configs.zip

        unzip default-slashdb-configs.zip

![Unzip_slashdb](https://github.com/SlashDB/slashdb-react-sdk/blob/main/public/images/unzip_slashdb.jpg 'Unzip_slashdb')

4.  Copy and replace files from the demo app repo found in folder "data" into folder "slashdb". The files in question are: databases.cfg, taskdatadb.sqlite, users.cfg and querydefs.cfg.

![Copy_Files_1](https://github.com/SlashDB/slashdb-react-sdk/blob/main/public/images/Copy_Files_1.jpg 'Copy_Files_1')

![Copy_Files_2](https://github.com/SlashDB/slashdb-react-sdk/blob/main/public/images/Copy_Files_2.jpg 'Copy_Files_2')

5.  Cd into folder slashdb and run command:

    Linux:

         docker run -d -p 8000:80 -v $(pwd):/etc/slashdb -v $(pwd):/var/log/slashdb slashdb/slashdb

    Windows:

         docker run -d -p 8000:80 -v C:\Current\TestLocalWithConfic\slashdb:/etc/slashdb -v C:\Current\TestLocalWithConfic\slashdb:/var/log/slashdb slashdb/slashdb

#### Start app

1.  Run app with node dev server. Open a terminal and navigate to where the repo resides on your local system. Run command:

         npm start

    Use a browser to visit - "http://localhost:3000/"

## How the app was build and example use of sdk functionality

## SDK Exposed Functionality

### Vanilla JavaScript

### ReactJS
