# Application

Hello Query is a full stack web app using React.js to take users "questions" and log it is JSON format into our database. Hello Query will allow users to comment on each other questions as well.

The notion API will be our backend that connects Hello query to our database.


## Important Links
- [Client Repo](https://github.com/teejaymoo/HelloQuery-client)
- [Deployed API](https://notion-api-626.herokuapp.com/)
- [Deployed Client](https://teejaymoo.github.io/HelloQuery-client/#/)


## Planning Story

Planning and Designing the Schemas for comments and queries.
For future out of scope references: add Chatroom.


### User Stories

- As a unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a unregistered user, I would like to see all users queries.
- As a unregistered user, I would like to see comments on those queries.
- As a signed in user, I would to create queries.
- As a signed in user, I would to comment on other users's queries.
- As a signed in user, I would to update my queries and comments.
- As a signed in user, I would to delete my queries and comments.

### Technologies Used

- React
- HTML/CSS
- Bootstrap
- Javascript
- React Router
- Mongoose

### Catalog of Routes
Queries
Verb         |	URI Pattern
------------ | -------------
GET | /queries
GET | /queries/:id
POST | /queries
PATCH | /queries/:id
DELETE | /queries/:id


Comment
Verb         |	URI Pattern
------------ | -------------
GET | /queries/:id/comments
POST | /queries/:id
PATCH | /queries/:id
DELETE | /queries/:id

### Unsolved Problems

Add Chatroom Schema.

Updating and Deleting comments!



#### Wireframe:

![capstoneMain](https://i.imgur.com/IrFzWfJ.jpg)
