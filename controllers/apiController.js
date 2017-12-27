var personModel = require('../models/personModel');
var qnapUsersModel = require('../models/qnapUsersModel');
var bodyParser = require('body-parser');
var config = require("../config");
var cassandra = require('cassandra-driver');



// var ExpressCassandra = require('express-cassandra');


module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // const client = new cassandra.Client(config.getCassandraSettings());
     
    
    // HTTP get to create reminder table
    app.get('/api/createreminder', function(req, res){

        const query = config.createReminderTable();
        client.execute(query, [])
        .then(result => res.send("Success"))
        .catch(error => res.send("Error: "+error));
        
    });

    //HTTP post to add reminder to the table
    app.post('/api/addreminder', function(req, res){
        const query = config.addReminder();
        const queryParams = [req.body.userId, new Date(), req.body.reminder];
        client.execute(query, queryParams, { prepare: true }, (err)=> {
            if (err) throw err;
            res.send("Insert Successful");
        });

    });


    //HTTP get to get the node data
    app.get('/api/getnodedata', function(req, res){
        const query = config.getNodeData();
        var currentDate = new Date();
        const queryParams = [currentDate, currentDate.setHours(currentDate.getHours()-1)];
        client.execute(query, queryParams, { prepare: true }, (err, data)=> {
            if (err) throw err;
            res.send(data);
        });
    });


    // var models = ExpressCassandra.createClient({
    //     clientOptions: config.getclientOptions(),
    //     ormOptions: config.getOrmOptions()
    // });


    // var MyModel = models.loadSchema('Person', personModel);
    // var MyModel = models.loadSchema('qnapuser', qnapUsersModel);

    // MyModel.syncDB(function(err) {
    //     if (err) throw err;
    // });

    // HTTP get to validate if Cassandra is connected
    // app.get('/', function(req, res){
    //     res.send("Cassandra Connected!");
    // });

    
    //HTTP get to retrieve all recods matching the condition in the params
    // app.get('/api/findPersonWithAge/:age', function(req, res) {


    //     var query = {
    //         age: {'$eq': parseInt(req.params.age)}
    //     };

    //     models.instance.Person.find(query, {allow_filtering: true}, (err, people)=>{

    //         var result = {};
    //         if(err) throw err;
    //         for(person of people){
    //             result[person.name] = person;
    //         }
    //         res.send(JSON.stringify(result));
    //     });

    // });

    //HTTP post to update a record
    // app.post('/api/updatePerson', function(req, res) {

    //     var query_object = {name: req.header.name};
    //     var update_values_object = req.body;
    //     var options = {if_exists: true};

    //     models.instance.Person.update(query_object, update_values_object, options, function(err){
    //         if(err) throw err;
    //         else res.send('Update successful');
    //     });

    // });


    //HTTP post to create a record
    // app.post('/api/createPerson', function(req, res){
    //     var john = new models.instance.Person({
    //         name: req.body.name,
    //         surname: req.body.surname,
    //         age: req.body.age,
    //         created: Date.now()
    //     });

    //     john.save(function(err){
    //         if(err) throw err;
    //         else res.send('Save successful');
    //     });
    // });


    //Streaming records
    // app.get('/api/getQNAPUsers', function(req, res){

    //     models.instance.qnapuser.eachRow({user_name: 'ram'}, {autoPage : true, allow_filtering: true}, function(n, row){
    //         // invoked per each row in all the pages
    //     }, function(err, result){
    //         // called once the page has been retrieved.
    //         if(err) throw err;
    //         res.send(result);
            
    //         if (result.nextPage) {
    //             // retrieve the following pages
    //             // the same row handler from above will be used
    //             result.nextPage();
    //         }
    //     });
    //     console.log("validating streaming");
    // });


  }

        //   

    //Mongoose side
    // app.get('/api/todos/:un ame', function(req, res) {
        
    //     Todos.find({ username: req.params.uname }, function(err, todos) {
    //         if (err) throw err;
            
    //         res.send(todos);
    //     });
        
    // });
    
    // app.get('/api/todo/:id', function(req, res) {
       
    //    Todos.findById({ _id: req.params.id }, function(err, todo) {
    //        if (err) throw err;
           
    //        res.send(todo);
    //    });
        
    // });
    
    // app.post('/api/todo', function(req, res) {
        
    //     if (req.body.id) {
    //         Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
    //             if (err) throw err;
                
    //             res.send('Success');
    //         });
    //     }
        
    //     else {
           
    //        var newTodo = Todos({
    //            username: 'test',
    //            todo: req.body.todo,
    //            isDone: req.body.isDone,
    //            hasAttachment: req.body.hasAttachment
    //        });
    //        newTodo.save(function(err) {
    //            if (err) throw err;
    //            res.send('Success');
    //        });
            
    //     }
        
    // });
    
    // app.delete('/api/todo', function(req, res) {
        
    //     Todos.findByIdAndRemove(req.body.id, function(err) {
    //         if (err) throw err;
    //         res.send('Success');
    //     })
        
    // });
    
// }