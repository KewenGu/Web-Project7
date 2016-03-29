// Author: Kewen Gu
// URL: https://kgu-cs4241-main.herokuapp.com

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var port = process.env.PORT || 9090;
var urlencodedParser = bodyParser.urlencoded({extended: false});


var movies = [
  {
    name: "Toy Story",
    director: "John Lasseter",
    year: "1995",
    likes: 0,
    dislikes: 0,
  //  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg"
  },
  {
    name: "Toy Story 2",
    director: "John Lasseter",
    year: "1999",
    likes: 0,
    dislikes: 0,
  //  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/c/c0/Toy_Story_2.jpg"
  },
  {
    name: "Monsters, Inc.",
    director: "Pete Docter",
    year: "2001",
    likes: 0,
    dislikes: 0,
  //  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/6/63/Monsters_Inc.JPG"
  },
  {
    name: "Finding Nemo",
    director: "Andrew Stanton",
    year: "2003",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg"
  },
  {
    name: "The Incredibles",
    director: "Brad Bird",
    year: "2004",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/e/ec/The_Incredibles.jpg"
  },
  {
    name: "Cars",
    director: "John Lasseter",
    year: "2006",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/3/34/Cars_2006.jpg"
  },
  {
    name: "Ratatouille",
    director: "Brad Bird",
    year: "2007",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/5/50/RatatouillePoster.jpg"
  },
  {
    name: "WALL-E",
    director: "Andrew Stanton",
    year: "2008",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/c/c2/WALL-Eposter.jpg"
  },
  {
    name: "Up",
    director: "Pete Docter",
    year: "2009",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/0/05/Up_%282009_film%29.jpg"
  },
  {
    name: "Toy Story 3",
    director: "Lee Unkrich",
    year: "2010",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/6/69/Toy_Story_3_poster.jpg"
  },
  {
    name: "Cars 2",
    director: "John Lasseter",
    year: "2011",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/7/7f/Cars_2_Poster.jpg"
  },
  {
    name: "Brave",
    director: "Mark Andrews",
    year: "2012",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/9/96/Brave_Poster.jpg"
  },
  {
    name: "Monsters University",
    director: "Dan Scanlon",
    year: "2013",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/2/2a/Monsters_University_poster_3.jpg"
  },
  {
    name: "Inside Out",
    director: "Pete Docter",
    year: "2015",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/0/0a/Inside_Out_%282015_film%29_poster.jpg"
  },
  {
    name: "The Good Dinosaur",
    director: "Peter Sohn",
    year: "2015",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/8/80/The_Good_Dinosaur_poster.jpg"
  },
  {
    name: "Finding Dory",
    director: "Andrew Stanton",
    year: "2016 (in production)",
    likes: 0,
    dislikes: 0,
//  comments: "",
    post: "https://upload.wikimedia.org/wikipedia/en/3/3e/Finding_Dory.jpg"
  }
];


function sendPosts(req, res) {
var compiled = _.template(
"<div class='movies' id=\"<%= name %>\">" +
  "<h2><%= name %></h2>" +
  "<p>Director: <b><%= director %></b></p>" +
  "<p>Year: <b><%= year %></b></p>" +
  "<p><%= likes %><input type='button' value='Like' class='button' onclick='operation(\"/like\", \"<%= name %>\")'></p>" +
  "<p><%= dislikes %><input type='button' value='Dislike' class='button' onclick='operation(\"/dislike\", \"<%= name %>\")'></p>" +
//  "<div class='comments'><%= (function() { return comments.join('<br /><br />') })() %> </div>" +
  "<div class='post'><img src='<%= post %>'></div>" +
"</div>"
);

var str = "";
movies.forEach( function(p, i) {
 str += compiled(p);
});
res.end( str );
}


app.use(express.static(path.join(__dirname, '/public')));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get('/movies', function(req, res) {
  sendPosts(req, res);
});


app.post('/like', urlencodedParser, function(req, res) {
  movies.forEach(function (item) {
    if(item.name === req.body.name) {
      item.likes++;
    }
  });
  res.end();
  //console.log(movies);
});

app.post('/dislike', urlencodedParser, function(req, res) {
  movies.forEach(function (item) {
    if(item.name === req.body.name) {
      item.dislikes++;
    }
  });
  res.end();
  //console.log(movies);
});


// app.post('/filter', urlencodedParser, function(req, res) {
//   modifiedList = [];
//   for (i = 0; i < movieList.length; i++) {
//     pos = movieList[i].toLowerCase().search(req.body.keyword.toLowerCase());
//     if (pos >= 0) {
//       modifiedList.push(movieList[i]);
//     }
//   }
// });
//
//
// app.post('/add', urlencodedParser, function(req, res) {
//   if (req.body.keyword) {
//     movieList.push(req.body.keyword);
//   }
//   modifiedList = movieList;
//   fs.writeFileSync("./public/src/movie-list-user.txt", modifiedList.join('\n'));
// });
//
//
// app.post('/remove', urlencodedParser, function(req, res) {
//   if (modifiedList[req.body.keyword] != null) {
//     modifiedList.splice(req.body.keyword, 1);
//   }
//   fs.writeFileSync("./public/src/movie-list-user.txt", modifiedList.join('\n'));
// });



app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
