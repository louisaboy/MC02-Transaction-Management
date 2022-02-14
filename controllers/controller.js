
const Connection = require('mysql/lib/Connection');
const db = require('../models/database.js');

const controller = {
    getIndex: function (req, res) {
        // SELECT ALL
        // const limit = 20;

        // const page = req.query.page;

        // const offset = (page - 1) * limit;

        // let sql = "SELECT * FROM movies limit " + limit + "OFFSET " + offset;

        let sql = "SELECT * FROM movies order by `id` desc LIMIT 0, 20";
        db.query(sql, function(err, results) {
            if(err) throw err;
            res.render('index', {movies: results});
        });
        
        // in progress 
        // bug: syntax error when updating multiple columns (+rank) year is int and rank is float;
        // let data = {name: "movie5", year: 2004, rank: 100};
        // const userId = '10000001';
        // // sqlUpdate = "UPDATE movies SET `name`='" + data.name + "', `year`=" + data.year + "' where id = '" + userId +";";
        // sqlUpdate = "UPDATE movies SET `name` = '" + data.name + "', `year` = '" + data.year + "', `rank` = '" + data.rank + "'WHERE id = " + userId + ";"
        // console.log
        //     db.query(sqlUpdate, (err, result) => {
        //         if (err) throw err;
        //         console.log(result);
        //     });
    },
    getEdit: function (req, res) {
        const userId = req.query.id;
        sqlUpdate = "UPDATE movies SET `name`='" + req.query.name + "', `year`='" + req.query.year + "', `rank`='" + req.query.rank + "' where id = '" + userId;
            db.query(sqlUpdate, (err, result) => {
                if (err) throw err;
                console.log(result);
            });
        res.render('edit-movie')
    },
    getAdd: function (req, res) {
        res.render('add-movie');
    },
    postAdd: function (req, res) {
        
        var max_row = 0;
        let sql = "SELECT MAX(id) AS max_row FROM movies";
        // first finds the highest id
        console.log("name " + req.body.name);
        console.log("year " + req.body.year);
        console.log("rank " + req.body.rank);
        db.query(sql, function(err, results) {
            
            if(err) throw err;
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

        res.redirect('/');
    },
    postEdit: function (req, res) {

    },
    postDelete: function (req, res) {

    },
    postSearch: function (req, res) {
        var name = req.body.name;
        var year = req.body.year;
        var rank = req.body.rank;
        let sql;

        if (name != "" && year != 0 && rank != -1)
            sql = "SELECT * FROM movies WHERE `name` = " + name + ", `year` = " + year + ", `rank` = " + rank;

        if (name != "" && year == 0 && rank == -1)
        sql = "SELECT * FROM movies WHERE `name` = " + name;
        
        if (name != "" && year != 0 && rank == -1)
            sql = "SELECT * FROM movies WHERE `name` = " + name + ", `year` = " + year;

        if (name != "" && year == 0 && rank != -1)
            sql = "SELECT * FROM movies WHERE `name` = " + name + ", `rank` = " + rank;

        db.query(sql, function(err, results) {
            if(err) throw err;
            res.render('index', {movies: results});
    });
    }
}

module.exports = controller;