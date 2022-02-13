
const db = require('../models/database.js');

const controller = {
    getIndex: function (req, res) {
        // SELECT ALL
        // let sql = "SELECT * FROM movies";

        // db.query(sql, function(err, results) {
        //     if(err) throw err;
        //     res.send(results);
        // });
        
        // in progress 
        // bug: syntax error when updating multiple columns (+rank) year is int and rank is float;
        let data = {name: "movie5", year: 2004, rank: 100};
        const userId = '10000002';
        // sqlUpdate = "UPDATE movies SET name='" + data.name + "', year='" + data.year + "' where id = '" + userId +";"
        sqlUpdate = "UPDATE movies SET name = '" + data.name + "', year = '" + data.year + "'WHERE id = " + userId + ";"

        //delete statement
        // dis works sa SQL koo so i placed it here na rin
        // sqlUpdate = "DELETE FROM movies WHERE id = '" + userId + "';"

            db.query(sqlUpdate, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
    },
    getEdit: function (req, res) {
        const userId = req.body.id;
        sqlUpdate = "UPDATE movies SET name='" + req.body.name + "', year='" + req.body.year + "', rank='" + req.body.rank + "' where id = '" + req.body+userId;
            db.query(sqlUpdate, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
        res.render('edit-movie')
    },
    getAdd: function (req, res) {
        var max_row = 0;
        let sql = "SELECT MAX(id) AS max_row FROM movies";
        // first finds the highest id
        db.query(sql, function(err, results) {
            if(err) throw err;
            res.send(results);
            // increments the id of the highest id since autoincrement isn't possible
            max_row = results[0].max_row + 1
            console.log(max_row);
            
            const post = {id: max_row, name: req.body.name, year: req.body.year, rank: req.body.rank};
            sqlInsert = "INSERT INTO movies SET ?"
            db.query(sqlInsert, post, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
        });
        res.render('add-movie');
    },
    postAdd: function (req, res) {
        res.render('index');
    },
    postEdit: function (req, res) {
        res.render('index');
    },
    postDelete: function (req, res) {
        res.render('index');
    },
}

module.exports = controller;