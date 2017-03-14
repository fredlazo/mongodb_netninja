

//You don't need to require mocha.  It will still work.
//const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Saving records', function(){
    // Create tests
    it('Saves a record to the database', function(done){
            var char = new MarioChar({
                name: 'Mario',
                weight: 45
            });
            //PROMISE that after it's SAVED,
            //THEN it will run the function.  because
            //it is ASYNCHRONOUS, meaning it will happen
            //later because it's slow.
            char.save().then(function(){
                //True if not saved
                //It's old, it's already been saved.

                assert(char.isNew === false);
                //Mocha doesn't know when char has been saved.
                //Okay, the test is DONE.  Move to the next test.
                done();
            });
    });
});
