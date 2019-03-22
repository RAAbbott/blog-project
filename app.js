//jshint esversion:6
//jslint es6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-alex:08251996admin@cluster0-dvf4b.mongodb.net/blogDB", { useNewUrlParser: true });

const postSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, "Blog Title is required..."]
  },
  body: {
    type: String,
    required: [true, "Body is required..."]
  }
});

const Post = mongoose.model("Post", postSchema);


const homeStartingContent = "Welcome to this Daily Journal/Blog app! Take some time to write down your thoughts about whatever is on your mind at the moment. Writing is a great way to relieve stress and provoke deep thought. If you are struggling with a question or are anxious about something, write it down, express how you feel and you'll feel better! Just click on the NEW ENTRY option at the top to get started. Anyways, thanks for stumbling on this page, and I hope you enjoy the app!";
const aboutContent = "There isn't much to see here, this is mostly a filler page. If I were a blogger I'd have a ong story introducing myself, what I like to do and why I'm entering the blogging space. I'd probably have some professional pictures posted here as well.";
const contactContent = "If you want to get ahold of me you can check out my links at the bottom of the page! I have my email, github and linkedIn where you can reach me. I love meeting new people and talking about random things, so get in touch if you want to chat!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {homeContent: homeStartingContent, posts: posts});
    }
  }) 
  
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
  Post.findOne({title: req.params.postTitle}, function(err, post) {
    if (err) {
      console.log(error);
    } else {
      res.render("post", {title: post.title, body: post.body, postTitle: req.params.postTitle});
    }
  })
});

app.post("/compose", function(req, res) {
  const newPost = new Post({
    title: req.body.entryTitle,
    body: req.body.entryBody,
  });

  newPost.save();

  res.redirect("/");
});

app.post("/delete", function(req, res) {
  Post.deleteOne({_id: req.body.hiddenInput}, function(err) {
    if (err) console.log(err);
    else {
      res.redirect("/");
    }
  });
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
