// learning EJS embedded javascript templates
//var options is used  with the help of javascript

const express = require('express');
const bodyParser = require("body-parser")
const date = require(__dirname+ "/date.js");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

let items =["Buy Food " , "Cook Food" , "Eat Food"];
let workitems=[];

// we have different view engines but now we are fixing it as EJS
app.set('view engine', 'ejs');


app.get("/", function (req, res) {


let day = date.getDate();
res.render('list' , {listTitle : day,  addItems: items});

});


app.get("/work", function (req, res) {
res.render('list' , {listTitle : "Work",  addItems: workitems});
});

app.get("/about" , function (req, res) {
  res.render("about");
});


app.post("/" , function (req, res) {

var item = req.body.newItem;


if(req.body.list ==="Work"){

  workitems.push(item);
  res.redirect("/work");

}
else{

  items.push(item);
  res.redirect("/");
}


});


app.post("/work" , function (req,res) {
  let item = res.body.newItem;
  workitems.push(item);
res.redirect("/work");

});

app.listen(process.env.PORT ||3000 , function () {

  console.log("server running at port 3000");
});
