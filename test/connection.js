//The folder is called test because we'll test using Mocha later
//This file contains all of our code for connecting to the database

//Require mongoose
const mongoose = require('mongoose');

//ES6 Promises instead of mongoose promise library
mongoose.Promise = global.Promise;

// Any code in here (connect to the database) is run
//BEFORE the tests run.
//This is a HOOK:  run this BEFORE or AFTER testing.
before(function(done){ //
//Connect to mongodb
//This is where you say where you want to connect to.
//'localhost' because we installed it locally
//mongoose will create dbs even it they don't exist yet (testaroo)
    mongoose.connect('mongodb://localhost/testaroo');

//App doesn't know when the db is ready
//.once is an event listener equivalent to .on
    mongoose.connection.once('open', function(){
        console.log('Connection has been made...');
        //
        done(); //Tells mongoose this is where it's DONE
    }).on('error', function(error){
        console.log('Connection error', error);
    });

});

//Delete (DROP) contents of mariochars collection BEFORE EACH  test
//So each test runs in isolation
beforeEach(function(done){
    //Drop the collection
    mongoose.connection.collections.mariochars.drop(function(){
        //This says it has done dropping the collection
        done();
    });
});
