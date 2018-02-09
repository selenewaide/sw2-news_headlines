var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// url string
url_base = "https://newsapi.org/v2/top-headlines?";
api_key = "&apiKey=xxxxxxxxxxxxxxxxxxxxxxxx"; // API here

// Recognise public folder
app.use(express.static(__dirname + "/public"));

// Root route default is Irish headlines
app.get("/", function(req, res) {
    var url_source = url_base + "country=ie" + api_key;

    request(url_source, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            // Convert body string that is returned to an object
            var data = JSON.parse(body);
            data.source_name = "Ireland";
            res.render("news", {data: data});
        } else {
            res.render("error");
        }
    });
});


// Route for user selected source
app.get("/source", function(req, res) {
    var selection_data = (req.query.news_selection).split(",");
    var source_id = selection_data[0];
    var source_name = selection_data[1];
    var url_source = url_base + source_id + api_key;

    request(url_source, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            // Convert body string that is returned to an object
            var data = JSON.parse(body);
            data.source_name = source_name;
            res.render("news", {data: data});
        } else {
            res.render("error");
        }
    });
});


// Error route
app.get("/error", function(req, res) {
    res.render("error");
});


app.listen(9000, function() {
    console.log("News app has started")
});