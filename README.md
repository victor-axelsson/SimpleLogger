# About
This is a really simple logger service. You post your entries with a namespace and they gets stored in the sqlite database. 

# Setup

- `git clone https://github.com/victor-axelsson/SimpleLogger.git` 
- `cd SimpleLogger` 
- `npm install` 
- ` node server.js` 

Now you should be up and running!

#Post and entry

``` 
POST http://localhost:3000/v1/entry 
{
"namespace": "server1/app2",
"key": "CPU",
"val": "100%"
}
```
Now it should be in the database, `logger.sqlite3` in the root of the project. 
