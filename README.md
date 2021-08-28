# Demo task list keeping app with Slashdb, ReactJS and SlashDB SDK for Javascript and ReactJS

This repository contains a task list keeping app which shows how to use SlashDB for your React project. The app allows users to create and maintain lists with tasks. Lists can be created or deleted. Tasks associated with a specific list can be added, removed, and checked as complete or incomplete. The app automaticaly calculates percentage of completed tasks in each list. All lists and tasks can be changed after they have been created. This is achived by utilizing SlashDB API to retrive and commit changes to a sqlite database. This demo app contains and utilizes a Javascript and ReactJS SDK developed for the purpose of helping developers integrate SlashDB in their project quickly and easily.

![Login Screen](public\images\Login_Screen.jpg 'Login Screen')

The SDK can be abstractly broken up into two parts one dedicated to functinality soully requiring the use of Javascript and one geared towards ReactJS based projects. The SDK exposes methods which allow set up of connection to a database via SlashDB as midware, basic authentication with the use of an API key, username and password as well retriving ,and commiting data to said database. Custom hooks acomplishing the above listed functionality are also inclited. This part of the SDK caters to ReactJS projects and abstracts some of the state management.

If you simply wish to use the SDK part of the project, please follow the link to this repo "insert link here". From there you can use import staments in your project to access the exposed methods found in the sdk. If you wish to run the demo app in your local environment, follow the instructions under "How to run app in local environment with connection to remote SlashDB demo server". If you wish to run the app in your local environment with a local Slashdb server follow the instructions under "How to run app in local environment with connection to a local SlashDB server". To simple access life version of the demo app follow this link "insert link here".

## Brief Description

---

### SlashDB

SlashDB can automatically generates a REST API from relational databases making it easy to access and modify data. In general, it is a big time safer and makes connecting and using relational databases in web-based applications much easier.

### ReactJS

ReactJS is a front-end framework developed by Facebook. It is ideal for single page applications and it strongly leands itself to the component-based model of development. Allowing for highly flexible and reusible code.

### SQLite

Sqlite is a simple relational database management system. While SlashDB supports a wide array of other more powerful ones for this demo project it is enough to use a qslite database to show the capabilities of the SDK and how easy it is to integreate SlashDB in JS and ReactJS projects.

### Stack

![Stack](public\images\Stack.jpg 'Stack')

### Database

The database used for this app is a sqlite database named taskdatadb. It consists of two tables: TaskList(TaskListId (PK), Name) and TaskItem(TaskitemId (PK), Task, Checked, TaskListId (FK)). A list may contain any number of tasks or none. If a task exists it must be associated with one and only one list.  

![UML Diagram](public\images\UML_Diagram.jpg 'UML Diagram')

## How to run app

### How to run app in local environment with connection to remote SlashDB demo server

    - Pull repo to your local environment via preferred method
        - Use "https://github.com/SlashDB/slashdb-react-sdk.git" in prefered local directory
        or
        - Download zip and unzip in preferred local directory
    - Open a terminal and navigate to where the repo resides on your local system.
        Run commands:
        **If yo do not have NodeJS on your syustem get it from here - "https://nodejs.org/en/"**
        - "npm install" - to pull or dependencies
        - "npm start" - to spin up the app
        - use a browser to visit - "http://localhost:3000/"

### How to run app in local environment with connection to a local SlashDB server

## SDK Exposed Functionality

### Vanilla JavaScript

### ReactJS
