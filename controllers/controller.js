
const Connection = require('mysql/lib/Connection');
const db1 = require('../models/database1.js');
const db2 = require('../models/database2.js');
const db3 = require('../models/database3.js');

var isNode1Online = true;
var isNode2Online = true;
var isNode3Online = true;

// checks if node 1 is online
db1.connect(function(err) {
    if (err) {
        isNode1Online = false;
    }
    else isNode1Online = true;

    console.log("Node 1 Connected");
})

// checks if node 2 is online
db2.connect(function(err) {
    if (err) {
        isNode2Online = false;
    }
    else 
    {
    isNode2Online = true;
    console.log("Node 2 Connected");
    }
})

// checks if node 3 is online
db3.connect(function(err) {
    if (err) {
        isNode3Online = false;
    }
    else 
    {
        isNode3Online = true;
        console.log("Node 3 Connected");
    }

    
})

const controller = {
    getIndex: function (req, res) {
        // SELECT ALL
        const limit = 20;

        // const offset = (page - 1) * limit;

        // let sql = "SELECT * FROM movies limit " + limit + "OFFSET " + offset;
        let sql = "SELECT COUNT(*) as count FROM movies";
        if (isNode1Online) {
            db1.query(sql, function(err, results) {
                if(err) throw err;

                const numOfResults = results[0].count;
                const numberOfPages = Math.ceil(numOfResults/limit);
                let page = req.query.page ? Number(req.query.page) : 1;
                if (page > numberOfPages) {
                    res.redirect('/?page='+encodeURIComponent(numberOfPages));
                } else if (page < 1) {
                    res.redirect('/?page='+encodeURIComponent(1));
                }
                
                // Determine the SQL Limit starting number
                const startingLimit = (page - 1) * limit;
                sql = `SELECT * FROM movies ORDER BY id DESC LIMIT ${startingLimit}, ` + limit;
                db1.query(sql, function(err, results){
                    if (err) throw err;
                    let iterator = (page - 5) < 1 ? 1 : page - 5;
                    let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
                    if(endingLink < (page = 4)) {
                        iterator -= (page + 4) - numberOfPages;
                    }
                    var currentPage = page;
                    console.log("page count: ", numberOfPages);
                    res.render('index', {movies: results, currentPage: currentPage, pageCount: numberOfPages, size: 5});
                });
            });
        }
        else {

        }
        

    },
    getEdit: function (req, res) {
        var id = req.params.id;
        var sqlSelect = "SELECT * FROM movies WHERE `id` = " + id;
        db1.query("START TRANSACTION", function (err, result) {
        });
        db1.query(sqlSelect, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render('edit-movie', {name: result[0].name, year: result[0].year, rank: result[0].rank, id: id})
        });
        db1.query("COMMIT", function (err, result) {
        });
        db1.query("DO SLEEP(2)", function (err, result) {
        });
    },
    getAdd: function (req, res) {
        res.render('add-movie');
    },
    postAdd: async function (req, res) {
        console.log("\n ------- ADDING ------- \n")
        var max_row = 0;
        var sql = "SELECT MAX(id) AS max_row FROM movies";
        var sqlInsert = "INSERT INTO movies SET ?";
        var post = {};
        // first finds the highest id
        console.log("name " + req.body.name);
        console.log("year " + req.body.year);
        console.log("rank " + req.body.rank);

        // node 1
        if (isNode1Online) {
            db1.query(sql, function(err, results) {
            
                if(err) throw err;
                // increments the id of the highest id since autoincrement isn't possible
                max_row = results[0].max_row + 1
                console.log(max_row);
                
                post = {id: max_row, name: req.body.name, year: req.body.year, rank: req.body.rank};
                db1.query("START TRANSACTION", function (err, result) {
                });
                db1.query(sqlInsert, post, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                });
                db1.query("COMMIT", function (err, result) {
                });
                db1.query("DO SLEEP(2)", function (err, result) {
                });
            });
        }
        setTimeout( function() {
            // for checking if max_id is still seen
            console.log("Max Id: " + max_row);
            
            // node 2
            if (req.body.year < 1980 && isNode2Online) {
                console.log("post: " + post);
                db2.query("START TRANSACTION", function (err, result) {
                });
                db2.query(sqlInsert, post, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                });
                db2.query("COMMIT", function (err, result) {
                });
                db2.query("DO SLEEP(2)", function (err, result) {
                });
            }

            // node 3
            else if (req.body.year >= 1980 && isNode3Online) {
                console.log("post: " + post);
                db3.query("START TRANSACTION", function (err, result) {
                });
                db3.query(sqlInsert, post, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                });
                db3.query("COMMIT", function (err, result) {
                });
                db3.query("DO SLEEP(2)", function (err, result) {
                });
            }
            res.redirect('/');
        }, 500);
        
        
    },
    postEdit: async function (req, res) {
        console.log("\n ------- UPDATING ------- \n")
        var userId = req.body.id;
        var oldYear = req.body.oldYear;
        console.log("id: " + userId);
        var sqlUpdate = "UPDATE movies SET `name`='" + req.body.name + "', `year`=" + req.body.year + ", `rank`=" + req.body.rank + " WHERE `id` = " + userId + ";"
        
        // node 1
        if (isNode1Online){
            console.log("Updating Node 1");
            db1.query("START TRANSACTION", function (err, result) {
            });
            db1.query(sqlUpdate, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
            db1.query("COMMIT", function (err, result) {
            });
            db1.query("DO SLEEP(2)", function (err, result) {
            });
        }
        
        setTimeout(function() {
            // node 2
            if (oldYear < 1980 && isNode2Online){
                if (req.body.year < 1980) {
                    console.log("Updating Node 2");
                    db2.query(sqlUpdate, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                    });
                }
                else if (req.body.year >= 1980) {
                    var sqlDelete = "DELETE FROM movies WHERE `id` = " + userId + ";"
                    console.log("Deleting to Node 2");
                    db2.query( sqlDelete, (err, result) => {
                        if (err) throw err;
                        console.log("Query Deleted");
                    });  

                    if (isNode3Online) {
                        "Inserting to Node 3"
                        const post = {id: userId, name: req.body.name, year: req.body.year, rank: req.body.rank};
                        sqlInsert = "INSERT INTO movies SET ?"
                        db3.query(sqlInsert, post, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                        });
                    }
                }
            }

            // node 3
            else if (oldYear >= 1980 && isNode3Online){
                if (req.body.year >= 1980) {
                    console.log("Updating Node 3");
                    db3.query(sqlUpdate, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                    });
                }
                else if (req.body.year < 1980) {
                    var sqlDelete = "DELETE FROM movies WHERE `id` = " + userId + ";"
                    console.log("Deleting to Node 3");
                    db3.query( sqlDelete, (err, result) => {
                        if (err) throw err;
                        console.log("Query Deleted");
                    });  

                    if (isNode2Online) {
                        "Inserting to Node 2"
                        const post = {id: userId, name: req.body.name, year: req.body.year, rank: req.body.rank};
                        sqlInsert = "INSERT INTO movies SET ?"
                        db2.query(sqlInsert, post, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                        });
                    }
                }
                
            }
            res.redirect('/');
        }, 500);
        

    },
    postDelete: async function (req, res) {
        console.log("\n ------- DELETING ------- \n")
        var id = req.params.id;
        var year = req.params.year;

        console.log("year: " + year);
        var sqlDelete = "DELETE FROM movies WHERE `id` = " + id + ";"

        // node 1
        if (isNode1Online)
        {
            console.log("Deleting to Node 1");
            db1.query( sqlDelete, (err, result) => {
                if (err) throw err;
                console.log("Query Deleted");
            });       
        }

        setTimeout(function() {
            // node 2
            if (year < 1980 && isNode2Online) {
                console.log("Deleting to Node 2");
                db2.query( sqlDelete, (err, result) => {
                    if (err) throw err;
                    console.log("Query Deleted");
                });  
            }
            // node 3
            else if (year >= 1980 && isNode3Online){
                console.log("Deleting to Node 3");
                db3.query( sqlDelete, (err, result) => {
                    if (err) throw err;
                    console.log("Query Deleted");
                    
                });  
            }
            
        res.redirect('/');
        }, 500);
        
    }
}

module.exports = controller;