# CRM Demo

This project is a demo version of a real-world application that allows business to manage customers and sales orders. The front end is built with Angular 7 and Bootstrap 4. JSON server is used to simulate Restful web services that are needed for CRUD (Create, Read, Update, Delete) operations. 

## Functionality Overview

- CRUD operations for customers. Deletion is only allowed for customers that do not have any orders yet.
- CRUD operations for sales orders. Deletion is only allowed for orders in voided status.
- Easy search and filtering on list views.
- Complete order histories on customer detail view.
- Add or remove product items on order detail view.
- Life cycle management of sales orders: from draft, confirmed, to shipped or voided.
- Real time integration with product inventory system.

## Technologies

- Angular 7
- Typescript 3.2
- Bootstrap 4
- HTML 5
- CSS 3

## Advanced Angular Features

- Angular Routing
- Router Guards (CanActivate, CanDeActivate, Resolve)
- Navigation Events Tracking
- Reactive Forms
- Custom Directive
- Custom Validator
- Custom Pipe
- RxJS Extensions
- Asynchronous Http Requests

## Getting Started

### I. Prepare Development Environment
You need to set up your development environment before cloning the project.

1. Installing Node.js. Go to [nodejs.org](https://nodejs.org/en/download/) to download an installer.

2. Installing Angular CLI Package using NPM (Node Package Manager).  Go to command prompt, type 
`npm install --global @angular/cli` to install latest Angluar CLI package.

3. Installing version control tool Git. Go to [git-scm.com](https://git-scm.com/downloads) to choose an installer for your operating system.

4. Installing Visual Studio Code.  Go to [code.visualstudio.com](https://code.visualstudio.com/download) to download the latest version.  Visual studio code is an open source editor that has enhanced support for Angular and integrated with Git.

### II. Download Code & Prepare Project
Now that you have development environment set up, you can proceed to clone the project.

1. Choose a location for the project on your local computer and navigate to project folder in command prompt.
2.  Run `git clone https://github.com/jz200/crm-demo.git` in command prompt to clone the project.
3.  Run `npm install` in command prompt to restore all dependencies specified in package.json. A folder named node-modules will be created.
4.  Run `npm install -g json-server` to install json sever, which will create web service from JSON data.

### III. Run Angular Application
1.  Run `json-server --watch db.json` to start Restful Web Services from JSON data in db.json.  The services will be hosted on `http://localhost:3000/`.  They will serve as backend for all CRUD operations.

2.  Finally run `ng serve` to serve the anuglar application. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

