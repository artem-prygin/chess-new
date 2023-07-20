import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET'],
  },
});

app.get('/', (req, res) => {
  res.send('test');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('connected', { player: 123, ballPosition: 312 });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

const uri = 'mongodb+srv://aprygin:Htvjyn2010@chess.gbmxs8o.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db('chess');
    const movies = database.collection('users');
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'test' };
    const movie = await movies.findOne(query);
    console.log(movie.name);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
