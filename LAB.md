![cf](http://i.imgur.com/7v5ASc8.png) http-simple-persistence
====

## Description

For this assignment, write an http server that will act as 
a simple data store, backed my in-memory storage objects. 

It should respond to GET, POST, PUT and DELETE requests for a named resource of your choosing, for example "notes":

* `GET` - A get request sent to `/notes` should respond with a list of all
of the notes that have been saved thus far. A get request sent to 
`/notes/name_of_resource` should respond with that resource.

* `POST` - The in-coming post request body should be saved 
to in-memomory storage. For example if a request 
is sent to `/notes` with a body of `{ noteBody: 'hello world' }` the in-memory array
would now contain an object from that data.

* `PUT` - The data coming in should be saved to the named resource either
creating or updating in entirety. So a request to `/notes/name_of_resources`
is idempotent in that the contents in the body of the request always become
the new data for that resource.

* `DELETE` - The corresponding resource should be removed. `notes/name_of_resource`
would remove resource `name_of_resource`

Verbs that are missing expected arguments should respond with `400` status code.

In-memory storage should always be asynchronous.

The in-memory data storage module should be directly unit tested.

The api exposed by the server should be E2E tested with `chai-http`

## To Submit this Assignment

* Use our normal process with all require artifacts! (see `install-node` repo)
* Remember, you _can_ do this exercise as a team

#### Rubric:
* Design/Organziation: 2pts
* Data Storage: 2pts
* Data Storage Testing: 2pts
* "Routing": 2pts
* "Routing" Testing: 2pts

## Bonus Points For More Fun:

* Reanimation: *2pts* 
	* Persist your data store when server closes and read it when it starts
	
* Promises: *5pts* 
	* Include a Promise based API for your data storage and use that in your server 
