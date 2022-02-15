
const Connection = require('mysql/lib/Connection');
const db = require('../models/database1.js');


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
    },
    getEdit: function (req, res) {
        var id = req.params.id;
        var sqlSelect = "SELECT * FROM movies WHERE `id` = " + id;

        db.query(sqlSelect, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render('edit-movie', {name: result[0].name, year: result[0].year, rank: result[0].rank, id: id})
        });
    },
    getAdd: function (req, res) {
        res.render('add-movie');
    },
    getSearch: function (req, res) {
        console.log("id " + req.params.id);
        let sql = "SELECT * FROM movies WHERE `id` = " + req.params.id;
        db.query(sql, function(err, results) {
            if(err) throw err;
            res.render('index', {movies: results});
        });
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
        var userId = req.param.id;
        var sqlUpdate = "UPDATE movies SET `name`='" + req.body.name + "', `year`=" + req.body.year + ", `rank`=" + req.body.rank + " WHERE `id` = " + userId;
        db.query(sqlUpdate, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        res.render('/');
    },
    postDelete: function (req, res) {
        console.log("AAAAAAAAAAAAA");
        var id = req.params.id;
        var sqlDelete = "DELETE FROM movies WHERE `id` = " + id + ";"

        db.query( sqlDelete, (err, result) => {
            if (err) throw err;
            console.log("Query Deleted");
            res.render('/');
        });        
    },
    postSearch: function (req, res) {
        var name = "'" +req.body.name + "'" ;
        var year = req.body.year;
        var rank = req.body.rank;
        let sql;
        
        console.log("name : " + name);
        console.log("year : " + year);
        console.log("rank : " + rank);

        if (name != "" && year != 0 && rank != -1)
            sql = "SELECT * FROM movies WHERE `name` = " + name + ", `year` = " + year + ", `rank` = " + rank;

        if (name != "" && year == 0 && rank == -1)
        sql = "SELECT * FROM movies WHERE `name` = " + name;
        
        if (name != "" && year != 0 && rank == -1)
            sql = "SELECT * FROM movies WHERE `name` = " + name + ", `year` = " + year;

        if (name != "" && year == 0 && rank != -1)
            sql = "SELECT * FROM movies WHERE `name` = " + name + ", `rank` = " + rank;

        var id;
        if (name != "" || year != 0 || rank != -1) {
            console.log(sql);
            db.query(sql, function(err, results) {
                if(err) throw err;
                id = results[0].id;
                console.log(id);
                const url = 'http://localhost:3000/search/' + id;
                console.log(url);
                res.redirect(307, url);
            });
            
        }
    }
}

module.exports = controller;