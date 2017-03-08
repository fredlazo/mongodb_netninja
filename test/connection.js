//The folder is called test because we'll test using Mocha later
//This file contains all of our code for connecting to the database

//Require mongoose
const mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

// Connect to the database before the tests run
before(function(done){



//Connect to mongodb
//This is where you say where you want to connect to
//localhost because we installed it locally
//mongoose will create dbs even it they don't exist yet (testaroo)
mongoose.connect('mongodb://localhost/testaroo');

//App doesn't know when the db is ready
//.once is an event listener equivalent to .on
//.
mongoose.connection.once('open', function(){
    console.log('Connection has been made...');
    done();
}).on('error', function(error){
    console.log('Connection error', error);
});

});
