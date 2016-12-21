var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 80;
var todos = [];
var todoNextId =1;
app.use(bodyParser.json());
app.get('/',function(req,res) {
  res.send('Todo API Root');
});
//GET /todos
app.get('/todos',function(req,res) {
  res.json(todos);
});
//GET /todos/:id
app.get('/todos/:id',function(req,res){
  var todoId = parseInt(req.params.id,10);
  var matchedTodo;
  //Iterate of todos array, Find the match
  todos.forEach(function(todo) {
    if(todo.id == todoId) {
      matchedTodo = todo;
    }
  });
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
app.listen(PORT,function() {
  console.log('Express listening on port: ' + PORT);
})
