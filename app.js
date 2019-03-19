//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const posts = [];

const homeStartingContent = "Welcome to this Daily Journal/Blog app! Take some time to write down your thoughts about whatever is on your mind at the moment. Writing is a great way to relieve stress and provoke deep thought. If you are struggling with a question or are anxious about something, write it down, express how you feel and you'll feel better! Just click on the NEW ENTRY option at the top to get started. Anyways, thanks for stumbling on this page, and I hope you enjoy the app! (Notes are saved for as long as you are on the page, after you leave they disappear).";
const aboutContent = "There isn't much to see here, this is mostly a filler page. If I were a blogger I'd have a ong story introducing myself, what I like to do and why I'm entering the blogging space. I'd probably have some professional pictures posted here as well.";
const contactContent = "If you want to get ahold of me you can check out my links at the bottom of the page! I have my email, github and linkedIn where you can reach me. I love meeting new people and talking about random things, so get in touch if you want to chat!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.render("home", {homeContent: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/post/:postTitle", function(req, res){
  const singlePost = posts.filter(post => _.lowerCase(post.title) == _.lowerCase(req.params.postTitle));
  res.render("post", {title: singlePost[0].title, body: singlePost[0].body, postTitle: req.params.postTitle});
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.entryTitle,
    body: req.body.entryBody,
  };
  posts.push(post);

  res.redirect("/");
});





app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
