# What is node-app-starter ?

<img src="https://raw.githubusercontent.com/canabina/node-app-starter/master/static/logo.png" width="300"/>

This is simple API server

```javascript
const app = require('node-app-starter');

app({
    'GET /info' (req, res) {
        return res.send('Hello world')
    },
    'POST /data' (req, res) {
        return res.send('Data saved!')
    }
});
```
If you are tired all the time coming to stackoverflow for create test http server. If you a wanna have the tool to create http server in 5 seconds. This package provide the simple and fast way to setup the node http server with simple routing and middlewares.

# To install
Go to the app directory and run the following command
```sh
$ npm i node-app-starter
```
Include the package to your application, for example in `index.js`
```javascript
const app = require('node-app-starter');
```
Add the some endpoints to your application
```javascript
app({
    'POST /app' (req, res) {
        return res.send({
            message: 'Hello world'
        });
    },
});
```
And run your application
```sh
$ node index.js
```
Your application will be available on **http://localhost:3001**

### Usage example
* Just some endpoints
```javascript
const app = require('node-app-starter');

app({
    'POST /app' (req, res) {
        const out = {
            message: 'Is POST request'
        }; 
        return res.send(out);
    },
    'GET /app' (req, res) {
        const out = {
            message: 'Is GET request'
        }; 
        return res.send(out);
    }
});
```
* Array of middlewares
```javascript
const app = require('node-app-starter');

app({
    'POST /app': [
        (req, res, next) => {
            next()
        },
        (req, res, next) => {
            next();
        },
        (req, res, next) => {
            next();
        },
        (req, res) => {
            res.send('Hello world');
        },
    ]
})
```
* With different port
```javascript
const app = require('node-app-starter');

app({
    'POST /app' (req, res) {
        const out = {
            message: 'Hello world'
        }; 
        return res.send(out);
    }
}, {
    port: 2222
});
```
* Handle the app object of express
```javascript
const { starter } = require('node-app-starter');
const Starter = new starter();
const app = Starter.app;

app.use();

Starter.import({
    'POST /app' (req, res) {
        const out = {
            message: 'Hello world'
        }; 
        return res.send(out);
    }
}, {
    port: 2222
}).launch();
```
