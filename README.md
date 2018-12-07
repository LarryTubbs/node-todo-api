

This API assumes you have a file called ./server/config/config.json that sets local environment variables.  You must either declare these variables in your environment prior to running the app, or create this file, or both.  Here is an example of the file the code expects:

{
    "test": {
        "PORT": "the port to start the test express server on",
        "MONGODB_URI": "the URI for your test mongo db server goes here",
        "JWT_SECRET": "your test secret string goes here"
    },
    "development": {
        "PORT": "the port to start the development express server on",
        "MONGODB_URI": "the URI for your development mongo db server goes here",
        "JWT_SECRET": "your development secret string goes here"
    }
}

The top level properties are defined in scripts in package.json.  You can add as many of these as you need.  The code looks for these in the environment variable NODE_ENV.