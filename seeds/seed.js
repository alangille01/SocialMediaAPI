const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));

db.once('open', async () => {
  console.log('Connected to MongoDB for seeding');

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Seed data
  const users = [
    {
      username: 'lernantino',
      email: 'lernantino@gmail.com',
    },
    {
      username: 'johndoe',
      email: 'john.doe@example.com',
    },
  ];

  const thoughts = [
    {
      thoughtText: 'Here\'s a cool thought...',
      username: 'lernantino',
      createdAt: new Date(),
      reactions: [],
    },
    {
      thoughtText: 'Another interesting thought...',
      username: 'johndoe',
      createdAt: new Date(),
      reactions: [],
    },
  ];

  // Insert seed data into database
  const createdUsers = await User.insertMany(users);
  const createdThoughts = await Thought.insertMany(thoughts);

  // Update users with associated thoughts
  await User.findOneAndUpdate(
    { username: 'lernantino' },
    { $push: { thoughts: createdThoughts[0]._id } }
  );

  await User.findOneAndUpdate(
    { username: 'johndoe' },
    { $push: { thoughts: createdThoughts[1]._id } }
  );

  console.log('Seeding complete!');
  mongoose.connection.close();
});
