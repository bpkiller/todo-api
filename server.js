var express = require('express');
var app = express();
var PORT = process.env.PORT || 80;
var todos = [{
  id: 1,
  description: 'Meet mom for lunch',
  completed: false
},{
  id: 2,
  description: 'Go to market',
  completed: false
},{
  id: 3,
  description: 'Learning',
  completed: true
}];
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
app.listen(PORT,function() {
  console.log('Express listening on port: ' + PORT);
})
