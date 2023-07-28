import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET'],
  },
});
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://aprygin:Htvjyn2010@chess.gbmxs8o.mongodb.net/chess?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('connected', { player: 123, ballPosition: 312 });
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован.' });
  } catch (err) {
    res.status(500).json({ error: 'Что-то пошло не так.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: 'Неправильное имя пользователя или пароль.' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Неправильное имя пользователя или пароль.' });
      return;
    }

    // Создание токена авторизации
    const token = jwt.sign({ username: user.username }, 'секретный_ключ_для_подписи_токена');
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так.' });
  }
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
