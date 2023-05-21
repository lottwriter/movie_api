const bodyParser = require("body-parser");
const express = require("express");
const req = require("express/lib/request");
const { title } = require("process");
const app = express();
morgan = require('morgan');
path = require('path');
uuid = require('uuid');

  
  let userList = []

  let movieList = [
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
    }
  }
  ]

  let favoriteMovies = [

  ]

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

app.get('/', (req, res) => {
    let responseText = "Welcome to my API!";
    responseText += '<small>\nRequested at: ' + req.requestTime + '</small>';
  res.send(responseText);
   
})

//Returns a list of all movies
app.get('/movies', (req, res) => {
    res.json(movieList)
});
//Returns data of a single movie by title
app.get('/movies/:title', (req, res) => {
  let movie = movieList.find((movie) => { return movie.title === req.params.title });
    if (movie) {
   
      res.status(201).send(movie.title + '\n' + movie.year + '\n' + movie.genre.name + '\n' + movie.director.name);
    } else {
      res.status(404).send('movie with the name ' + req.params.title + ' was not found.');
    }
});

//Returns movie genre and description
app.get('/movies/:title/genre', (req, res) => {
  let movie = movieList.find((movie) => { return movie.title === req.params.title });

  if (movie) {
   
    res.status(201).send('Genre: ' + movie.genre.name + '\n ' + movie.genre.description);
  } else {
    res.status(404).send('movie with the name ' + req.params.name + ' was not found.');
  }
});

//Returns movie director
app.get('/movies/:title/director', (req, res) => {
  let movie = movieList.find((movie) => { return movie.name === req.params.name });

  if (movie) {
   
    res.status(201).send('Director: ' + movie.director.name + '\nBio: ' + movie.director.bio + '\nBirth year: ' + movie.director.birthyear);
  } else {
    res.status(404).send('movie with the name ' + req.params.name + ' was not found.');
  }
});

// Registers a new user
app.post('/users', (req, res) => {
  let newUser = req.body;
  console.log(req.body);
  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    userList.push(newUser);
    res.status(201).send(newUser);
  }
});

//Returns name of a single user
app.get('/users/:name', (req, res) => {
  res.json(userList.find((user) =>
    { return user.name === req.params.name }));
});

// Update the username of a user
app.put('/users/:name/username', (req, res) => {
  let user = userList.find((user) => { return user.name === req.params.name });

  if (user) {
    user.username = req.body.username;
    res.status(201).send('user ' + req.params.name + ' was assigned a username of ' + req.body.username);
  } else {
    res.status(404).send('user with the name ' + req.params.name + ' was not found.');
  }
});

//Gets list of favorite movies
app.get('/favorites', (req, res) => {
  res.json(favoriteMovies);
   
})

// Adds movie to list of favorites
app.post('/favorites', (req, res) => {
  let newFav = req.body;
  console.log(req.body);
  if (!newFav.title) {
    const message = 'Missing title in request body';
    res.status(400).send(message);
  } else {
    newFav.id = uuid.v4();
    favoriteMovies.push(newFav);
    res.status(201).send(newFav);
  }
});

// Deletes a favorite from our list by title
app.delete('/favorites/:title', (req, res) => {
  let favorite = favoriteMovies.find((favorite) => { return favorite.title === req.params.title });

  if (favorite) {
    favoriteMovies = favoriteMovies.filter((obj) => { return obj.title !== req.params.title });
    res.status(201).send('favorite ' + req.params.title + ' was deleted.');
  }
});

// Deregisters a user
app.delete('/user/:name', (req, res) => {
  let user = userList.find((user) => { return user.name === req.params.name });

  if (user) {
    userList = userList.filter((obj) => { return obj.name !== req.params.name });
    res.status(201).send('user ' + req.params.name + ' was deleted.');
  }
});

//serves the documentation.html file to /documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.listen(8080, () => {
    console.log('Listening to port 8080.')
})