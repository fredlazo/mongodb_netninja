

//You don't need to require mocha.  It will still work.
//const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Deleting records', function(){
    //This is run  BEFORE EACH test
    //so we actually have something to delete.

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
    it('Deletes one record from the database', function(done){
        //.then fires after it deletes something.
        MarioChar.findOneAndRemove({name: 'Mario'}).then(function(){
            //Tries to find what you deleted
            MarioChar.findOne({name: 'Mario'}).then(function(result){
                assert(result === null);
                //Ends the test.  Move to the next test
                done();
            });
        });
    });
});
