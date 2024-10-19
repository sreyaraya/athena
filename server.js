import express from "express";

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    //res.send("Hello world");
    res.render("index");
})

app.listen(8000, function() {
    console.log("listening on 8000")
})