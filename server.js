var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 80;
var todos = [];
var todoNextId =1;
app.use(bodyParser.json());
app.get('/',function(req,res) {
  res.send('Todo API Root');
});
//GET /todos?completed=true&q=house
app.get('/todos',function(req,res) {
  var queryParams = req.query;
  var filteredTodos = todos;
  if(queryParams.hasOwnProperty('completed')&& queryParams.completed === 'true') {
    filteredTodos = _.where(filteredTodos,{'completed':true});
  } else if(queryParams.hasOwnProperty('completed')&& queryParams.completed === 'false') {
    filteredTodos = _.where(filteredTodos,{'completed':false});
  }
  if(queryParams.hasOwnProperty('q')&& queryParams.q.trim().length >0) {
    filteredTodos = _.filter(filteredTodos,function(x) {
      return x.description.toLowerCase().indexOf(queryParams.q.trim())!=-1;
    });
  }


  res.json(filteredTodos);
});
//GET /todos/:id
app.get('/todos/:id',function(req,res){
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todos,{id:todoId});
  //Iterate of todos array, Find the match
  // todos.forEach(function(todo) {
  //   if(todo.id == todoId) {
  //     matchedTodo = todo;
  //   }
  // });
  //can use if(matchedTodo) if it is true it means you have some data in it!
  if(typeof matchedTodo=== 'undefined') {
    res.status(404).send();
  } else {
    res.json(matchedTodo);
  }
});
// POST /todos/:id
app.post('/todos/',function(req,res){
  var body = req.body;
   body = _.pick(body,'description','completed');
  body.description = body.description.trim();
  if(!_.isBoolean(body.completed)|| !_.isString(body.description) || body.description.length===0) {
    return res.status(400).send();
  }
  body.id = todoNextId++;
  todos.push(body);
  // todos.push({
  //   id : todoNextId++,
  //   description: body.description,
  //   completed: body.completed
  // });
  //console.log('description: '+ body.description);
  //console.log(body);
  res.json(body);
});
//DELETE /todos/:id
app.delete('/todos/:id',function(req,res){
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todos,{id:todoId});
  if(!matchedTodo) {
    res.status(404).json({"error":"no todo with that id"});
  } else {
    todos = _.without(todos,matchedTodo);
    res.status(200).send();
  }
});
//PUT /todos/:id
app.put('/todos/:id',function(req,res){
  var body = _.pick(req.body,'description','completed');
  var validAttributes = {};
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todos,{id:todoId});
  if(!matchedTodo) {
    return res.status(404).send();
  }
  if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttributes.completed = body.completed;
  }
  else if(body.hasOwnProperty('completed')) {
    res.status(400).send();
  }
  if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0) {
    validAttributes.description = body.description;
  }
  else if(body.hasOwnProperty('description')) {
    res.status(400).send();
  }
  _.extend(matchedTodo,validAttributes);
  res.json(matchedTodo);
});
app.listen(PORT,function() {
  console.log('Express listening on port: ' + PORT);
})
