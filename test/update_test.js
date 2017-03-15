

//You don't need to require mocha.  It will still work.
//const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Updating records', function(){
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
            weight: '50'
            //mongoose automatically creates an ID
        });
        char.save().then(function(){
            assert(char.isNew === false); //This can be removed
            done(); //Okay, it's done.  We can test now.
        });
    });

    // Create tests
    it('Update one record in the database', function(done){
        //.then fires after it updates something.
        MarioChar.findOneAndUpdate({name: 'Mario'}, {name: 'Luigi'}).then(function(){
            //Tries to find what you updated
            MarioChar.findOne({_id: char._id}).then(function(result){
                assert(result.name === 'Luigi' );
                //Ends the test.  Move to the next test
                done();
            });
        });
    });


        it('Increment weight by one', function(done){
            MarioChar.update({}, {$inc: {weight: 1}}).then(function(){
                MarioChar.findOne({name: 'Mario'}).then(function(record){
                    assert(record.weight === 51);
                    done();
                });
            });
        });



});
