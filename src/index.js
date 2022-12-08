const express = require('express');
const cors = require('cors');
const { v4: uuidv4} = require("uuid")

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user)=> user.username === username);

  if(!user){
    return response.status(400).json({error: "user not found!"});
  }

  request.user = user;
  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  users.push({
    name,
    username,
    id: uuidv4(),
    todos: [],
  });

  return response.status(201).json(users);
});

app.get("/todos",checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;

  return response.json(username.todos);
});

app.post("/todos",checksExistsUserAccount, (request, response) => {
  const { title } = request.body;
  const { user } = request;

  const todoAdd = {
    title
  }
  user.todos.push(todoAdd);

  return response.status(201).json({user});
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;