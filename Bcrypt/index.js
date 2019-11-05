var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Bcryptjs
var bcrypt = require('bcryptjs');

app.get("/", function(req, res){
    res.render("home");
});

app.post("/taopw", function(req, res){
    
    bcrypt.genSalt(15, function(err, salt) {
        bcrypt.hash(req.body.pw, salt, function(err, hash) {
            if(err){
                res.send("Loi Bcrypt roi: " + err);
            }else{
                res.send(hash);
            }
        });
    });

});







app.post("/check", function(req, res){
    bcrypt.compare(req.body.new, req.body.pw, function(err, kq) {
        if(kq){
            res.send("OKAY");
        }else{
            res.send("WRONG");
        }
    });
});