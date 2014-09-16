# Sample project demonstrating how to integrate [ng-grid](http://angular-ui.github.io/ng-grid/) with [Backand](https://www.backand.com/)

Please follow below steps to setup and run this project.

## angular-grunt-seed — the seed for AngularJS apps with Bower and Grunt support (jshint, Karma, Watch, express, livereload etc)

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects. This comes with default Grunt build for lint, Karma, Watch, livereload, express server etc.


## How to use angular-grunt-seed

Clone the angular-grunt-seed repository and start hacking...


### Running the app during development

> grunt

This will run following tasks:

1. Compile LESS to CSS using 'grunt-contrib-less' Plugin

2. Combine 3rd party JS files in to one single JS file using 'usemin' plugin. Also combine all project related JS files in to one single JS file. (This is little pain while debugging but will evolve over next iterations)

3. Copy template \ partial files (currently we do not have any but Grunt is ready to handle that)

4. Copy images to '.build' folder.

5. Run 'jshint' on Grunt and project JS files

6. Watch for any changes to LESS, JS, HTML files and run specific tasks

7. Any changes to project files except Grunt files will kick-off 'livereload' and refresh your browser session  (This is very useful in Development)

8. Start Express server at "9000"
