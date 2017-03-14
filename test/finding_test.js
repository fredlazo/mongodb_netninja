

//You don't need to require mocha.  It will still work.
//const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Finding records', function(){
    //This is run  BEFORE EACH test
    //so we actually have something to find.

    //char is declared here because because
    //it's defined in beforeEach, and you don't have
    //access outside of beforeEach
    var char;

    beforeEach(function(done){
        //This var char is no longer declared here...
        char = new MarioChar({
            name: 'Mario',
            weight: '500'
            //mongoose automatically creates an ID

        });
        char.save().then(function(){
            assert(char.isNew === false); //This can be removed
            done(); //Okay, it's done.  We can test now.
        });
    });

    // Create tests
    it('Finds one record from the database', function(done){
        //.then fires after it finds something.
        MarioChar.findOne({name: 'Mario'}).then(function(result){
            assert(result.name === 'Mario');
            done();
        })
    });


    it('Finds one record by ID from the database', function(done){
        //.then fires after it finds something.
        //Don't need .toString.  Mongoose knows.
        MarioChar.findOne({_id: char._id}).then(function(result){
            //But we need .toString here
            assert(result._id.toString() === char._id.toString());
            done();
        })
    });
});
