const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

describe('Nesting records', function(){
    //We create a new author (var pat = ...) in each tests
    //We don't want that because we'll have a lot of the same authors.
    //Therefore, we drop the database with a beforeEach

    beforeEach(function(done){ //done so know when Mocha can run tests
        //Drop the authors collection so we can start fresh each time
        mongoose.connection.collections.authors.drop(function(){
            done();
        });
    });


    //Create tests
    it('Creates an author with sub-documents', function(done){
        var pat = new Author({
            name: 'Stephen King',
            books: [{title: 'Pet Sematary', pages: 400}]
        });

        pat.save().then(function(){
            Author.findOne({name: 'Stephen King'}).then(function(returnedcaca){
                assert(returnedcaca.books.length === 1);
                done();
            });
        });
    });


//Database dropped here (beforeEach)

    it('Adds a book to an author', function(done){
        //Could've included this outside in a beforeEach
        //Just doing this for the sake of the tutorial
        var pat = new Author({
            name: 'Stephen King',
            books: [{title: 'Pet Sematary', pages: 400}]
        });

        pat.save().then(function(){
            Author.findOne({name: 'Stephen King'}).then(function(record){
                //add a book to the books array
                record.books.push({title: 'IT', pages: 500});
                record.save().then(function(){
                    Author.findOne({name: 'Stephen King'}).then(function(resultblah){
                        assert(resultblah.books.length === 2);
                        done()
                    });
                });
            });
        });
    });
});
