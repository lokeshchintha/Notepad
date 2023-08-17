//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to the Lokesh's Notepad Website !!! ";
const aboutContent =  "I am currently a student of aditya engineering college all the website copyrights should belongs to me only !";
const contactContent = "";
const signup="Enter details to Signup";
const login="Welcome Back Login into your account";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/signup",function(req,res){
  res.render("signup",{
          signup:signup
  });
});

app.get("/login",function(req,res){
  res.render("login",{
          login:login
  });
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.post("/delete/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const index = posts.findIndex(post => _.lowerCase(post.title) === requestedTitle);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

app.post("/signup",function(req,res){
  res.redirect("/");
});

app.post("/login",function(req,res){                                                    res.redirect("/");      
});

const port=process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server started on port "+port);
});
