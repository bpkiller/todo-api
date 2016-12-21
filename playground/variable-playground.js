// var person = {
//   name : "Andrew",
//   age : 21
// };
//
// function updatePerson(obj) {
//   // obj = {
//   //   name : 'Andrew',
//   //   age: 24
//   // };
//   obj.age = 24;
// }
// updatePerson(person);
// console.log(person);
var x = [15,37];
function  updateArray(obj) {
  obj.push(10);
  debugger;
}
updateArray(x);
console.log(x);
var bool =true;
function toggle(bool) {
  return !bool;
}
bool = toggle(bool);
console.log(bool);
