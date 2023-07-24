const bodyParser = require("body-parser");
const express = require("express");
const req = require("express/lib/request");
const { title } = require("process");
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;
const Favorites = Models.Favorite;
morgan = require('morgan');
path = require('path');
uuid = require('uuid');
async function startUp() {
    // Connect to mongoose database
//     mongoose.connect("mongodb://127.0.0.1:27017/test", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => {
//         // If it connects log the following
//         console.log("Connected to MongoDB database.");
//     }).catch((e) => {
//         // If it doesn't connect log the following
//         console.log("Unable to connect to MongoDB database. Error:" + e.stack);
//     });
//    ;
// }
mongoose.connect('mongodb+srv://lottwriter:AlecAtlas1@myflixdb.mzlznai.mongodb.net/myFlixDB',
 {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  // If it connects log the following
  console.log("Connected to MongoDB database.");
}).catch((e) => {
  // If it doesn't connect log the following
  console.log("Unable to connect to MongoDB database. Error:" + e.stack);
});
;
}
startUp();
  

  /*let movieList = [
    {
      title: 'Rio', 
    year: 2011, 
    genre: {
      name: "family", 
      description: 'Films for the whole family'
    }, 
    director:  {
      name: "Carlos Saldanha",
     bio: "Carlos Saldanha is a Brazilian animator, director, producer, and voice actor of animated films who worked with Blue Sky Studios until its closure in 2021. He was the director of Ice Age: The Meltdown, Ice Age: Dawn of the Dinosaurs, Rio, Rio 2, Ferdinand, and the co-director of Ice Age and Robots.",
     birthyear: 1965
    }
    },
    {
      title: 'Rio 2',
      year: 2014,
      genre: {
        name: 'family',
        description: 'Films for the whole family'
      },
      director:  {
        name: "Carlos Saldanha",
       bio: "Carlos Saldanha is a Brazilian animator, director, producer, and voice actor of animated films who worked with Blue Sky Studios until its closure in 2021. He was the director of Ice Age: The Meltdown, Ice Age: Dawn of the Dinosaurs, Rio, Rio 2, Ferdinand, and the co-director of Ice Age and Robots.",
       birthyear: 1965
      }
    },
    {
      title: "Ant-Man",
      year: 2015,
      genre: {
        name: 'superhero',
        description: 'Action-packed superhuman adventures'
      },
      director: {
        name: 'Peyton Reed',
        bio: 'Peyton Tucker Reed is an American television and film director. He directed the comedy films Bring It On, Down with Love, The Break-Up, and Yes Man, as well as the superhero film Ant-Man and its sequels.',
        birthyear: 1964
      }
    },
    {
      title: 'Top Gun',
      year: 1986,
      genre: {
        name: 'war',
        description: 'Films about human conflicts'
      },
      director: {
        name: 'Tony Scott',
        bio: 'Anthony David Leighton Scott was an English film director and producer. He was known for directing highly successful action and thriller films such as Top Gun, Beverly Hills Cop II, Days of Thunder, The Last Boy Scout, True Romance, Crimson Tide, Enemy of the State, Man on Fire, Déjà Vu, and Unstoppable.',
        birthyear: 1944
      }
    },
    {
      title: 'Ice Age',
      year: 2002,
      genre: {
        name: 'family',
        description: 'Films for the whole family'
      },
      director: {
        name: 'Chris Wedge',
        bio: 'John Christian Wedge is an American animator, designer, film director, voice actor, film producer, screenwriter, and cartoonist. He is known for directing the films Ice Age, Robots, Epic, and Monster Trucks.',
        birthyear: 1957
      }
    },
    {
      title: 'Top Gun Maverick',
     year: 2022, 
     genre:  {
      name: "war", 
      description: 'Films about human conflicts'
    }, 
    director: {
      name: "Joseph Kosinski",
      bio: "Joseph Kosinski is an American film director best known for his computer graphics and computer-generated imagery work, and for his work in action films. He made his big-screen directorial debut with the 2010 science fiction film Tron: Legacy, the sequel to the 1982 film Tron.",
      birthyear: 1974
    }
  },
    {
      title: 'Dunkirk', 
    year: 2017, 
    genre: {
      name: "war", 
      description: 'Films about human conflicts'
    }, 
    director: {
      name: "Christopher Nolan",
      bio: "Christopher Edward Nolan CBE is a British-American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide.",
      birthyear: 1970
    }
  },
    {
      title: 'Kung-Fu Panda', 
    year: 2008, 
    genre: {
      name: "family", 
      description: 'Films for the whole family'
    }, 
    director: {
      name: "Mark Osborne",
      bio: "Mark Randolph Osborne is an American film director, writer, producer and animator.",
      birthyear: 1970
    }
  },
  {
    title: 'Robots',
    year: 2005,
    genre: {
      name: "family",
      description: 'Films for the whole family'
    },
    director: {
      name: 'Chris Wedge',
        bio: 'John Christian Wedge is an American animator, designer, film director, voice actor, film producer, screenwriter, and cartoonist. He is known for directing the films Ice Age, Robots, Epic, and Monster Trucks.',
        birthyear: 1957
    }
  },
  {
    title: 'How to Train Your Dragon',
    year: 2010,
    genre: {
      name: 'family',
      description: 'Films for the whole family',
    },
    director: {
      name: 'Chris Sanders',
      bio: 'Christopher Michael Sanders is an American animator, director, screenwriter, producer, illustrator, and voice actor. His credits include Lilo & Stitch and How to Train Your Dragon, both of which he co-wrote and co-directed with Dean DeBlois, The Croods with Kirk DeMicco, and The Call of the Wild.',
      birthyear: 1962
    }
  },
  ]
*/

  let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
  };
  app.use(bodyParser.json())
  app.use(express.static('public'));
  app.use(morgan('combined'));
  app.use(requestTime);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  //CORS implementation
  const cors = require('cors');
  let allowedOrigins = ['http://localhost:8080', 'http://testsite.com','http://localhost:1234'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));


  let auth = require('./auth')(app);
  const passport = require('passport');
  require('./passport');
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());


app.get('/', (req, res) => {
    let responseText = "Welcome to my API!";
    responseText += '<small>\nRequested at: ' + req.requestTime + '</small>';
  res.send(responseText);
   
})

//Returns a list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find().then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//Returns data of a single movie by title 
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({title: req.params.Title})
  .then((movie) => {
    res.status(201).json(movie)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: '+ err);
  })
});

//Returns movie genre and description
app.get('/movies/:title/genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ title: req.params.Title })
  .then((movie) => {
  

     res.status(201).json(movie.genre);  
     
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: '+ err)
  });

  
});

//Returns movie director
app.get('/movies/:title/director', passport.authenticate('jwt', { session: false }), (req, res) => {
 Movies.findOne({title: req.params.Title})
 .then((movie) => {
  if (movie) {
   
    res.status(201).send('Director: ' + movie.director.name + '\nBio: ' + movie.director.bio + '\nBirth year: ' + movie.director.birthyear);
  } else {
    res.status(404).send('movie with the name ' + req.params.name + ' was not found.');
  }
 })

  
});

// Registers a new user
app.post('/users', 
[
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
],
(req, res) => {

    // check validation for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user);
           })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
       
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Returns all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Returns user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update the info of a user
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  }, { new: true },
 ).then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Adds movie to list of favorites
app.post('/users/:Username/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
 ).then((user) => {
  res.json(user);
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
});
});

// Deletes a favorite from our list by title
app.delete('/users/:Username/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Deregisters a user
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//serves the documentation.html file to /documentation
app.get('/documentation', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});