R.add(2,3)
R.either()
var gt10 = x => x > 10;
var even = x => x % 2 === 0;
var f = R.either(gt10, even);
f
f(101)
     const allTasks = {
         date: "2017-09-22",
         byPerson: [
             {
                 responsible: "EG",
                 tasks: [
                     {id: 111, desc: "task 111", done: false},
                     {id: 222, desc: "task 222", done: false}
                 ]
             },
             {
                 responsible: "FK",
                 tasks: [
                     {id: 555, desc: "task 555", done: false},
                     {id: 777, desc: "task 777", done: true},
                     {id: 999, desc: "task 999", done: false}
                 ]
             },
             {
                 responsible: "ST",
                 tasks: [{id: 444, desc: "task 444", done: true}]
             }
         ]
     };

//stuffs(allTasks)
const findMyTask = R.either(R.prop("byPerson"), R.identity("invalidJSON"));
const foo = R.identity();
//foo("blah")
//const val = fn(allTasks);
//val
const who = "FK";
//const theirTask = 
//   (R.prop("byPerson")(allTasks))
//helpful suggestions       .find(t => t.responsible === who); 
//theirTask;
const findTest = R.find(R.propEq("responsible", who));
//R.prop("tasks")(findTest(allTasks.byPerson));
const chainedFunction = R.pipe(R.prop("byPerson"),
                                R.find(R.propEq("responsible", who)),
                                R.prop("tasks"),
                                R.filter(R.propEq("done", false)),
                                R.map(R.prop("desc"))
                               );
const result = chainedFunction(allTasks);