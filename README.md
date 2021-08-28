# Building a simple task list keeping app with Slashdb, ReactJS and SlashDB SDK for Javascript and ReactJS

This repository contains a task list keeping app which shows how to use SlashDB for your React project. The app allows users to create and maintain list with tasks. List can be created or deleted. Tasks associated with a specific list can be added, removed, and checked as complete or incomplete. The app automaticaly calcupates percentage of completed tasks in each list. All lists and tasks can be changed after they have been created. This is achived by utilizing SlashDB API to retrive and commit changes to a sqlite database(may be any other number of database formats). This demo app contains and utilizing a Javascript and ReactJS SDK developed for the purpose of helping developers integrate SlashDB in their project quickly and easily.

![Login Screen](public\images\Login_Screen.png 'Login Screen')

The SDK can be abstractly broken up into two parts one dedicated to functinality soully requiring the use of Javascript and one geared towards ReactJS based projects. The SDK exposes methods which allow set up of connection to a database via SlashDB, basic authentication with the use of an API key ,and username ,and password as well retriving and commiting data to said database. Custom hooks complishing the above listed functionality are also inclited. This part of the SDK caters to ReactJS project and abstracts some of the state management.

If you simply wish to use the SDK part of the project, please follow the link to this repo "insert link here". From there you can use import staments in your project to access the exposed methods found in the sdk. If you wish to run the demo app in your local environment, follow the instructions under "Run app in local environment - demo server". If you wish to run the app in your local environment with a local Slashdb server follow the instructions under "Run app in local environment - slash local server". To simple access life version of the demo app follow this link "insert link here".

# How to run app

## How to run app in local environment with connection to remote SlashDB demo server

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

## How to run app in local environment with connection to a local SlashDB server

## SDK Exposed Functionality

### Vanilla JavaScript

### ReactJS
