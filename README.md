# BASE

## A barebones personal framework.

### 1. Install [Sass](http://sass-lang.com/):

```
$ sudo gem install sass
```

To check if Sass is already installed type `$ sass -v` in Terminal to check version.

To watch Sass with source maps and compressed style, in Terminal, type:

```
$ scss --watch --sourcemap scss:css --style compressed
```

### 2. Install [Node.js](http://nodejs.org/download/)

To check if Node.js is already installed type `$ npm -v` in Terminal to check version.

### 3. Install [Gulp](http://gulpjs.com/) Globally:

```
$ sudo npm install -g gulp
```

To check if Node.js is already installed type `$ gulp -v` in Terminal to check version.

### 4. Install [Gulp](http://gulpjs.com/) in your project:
```
$ sudo npm install --save-dev gulp
```

### 5. Install all Gulp dependencies:

```
$ sudo npm install
```

*See gulpfile.js var imports to see individual task dependencies*

*Prospectively, to install individual tasks: `$ sudo npm install --save-dev <task>`*

### 6. Run Gulp:

```
$ gulp
```

^^^ The **default** task will run.

To run individual tasks, use `$ gulp <task> <othertask>`

*__Production-ready__ Gulp command: `$ gulp production`*
