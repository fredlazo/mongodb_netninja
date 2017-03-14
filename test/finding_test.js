

//You don't need to require mocha.  It will still work.
//const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Finding records', function(){
    //This is run  BEFORE EACH test
    //so we actually have something to find.
    beforeEach(function(done){
        var char = new MarioChar({
            name: 'Mario',
            weight: '500'
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
});
