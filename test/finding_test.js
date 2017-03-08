

//You don't need to require mocha.  It will still work.
//const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Finding records', function(){

    beforeEach(function(done){
        var char = new MarioChar({
            name: 'Mario',
            weight: '500'
        });
        char.save().then(function(){
            assert(char.isNew === false); //This can be removed
            done();
        });
    });

    // Create tests
    it('Finds one record from the database', function(done){
        MarioChar.findOne({name: 'Mario'}).then(function(result){
            assert(result.name === 'Mario');
            done();
        })
    });
});
