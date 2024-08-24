import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, profilePicture } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing some required fields, please include all of them' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture: profilePicture || null,
    };

    await req.db.collection('users').insertOne(newUser);
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error when inserting user into database', error);
    res.status(500).json({ error: 'Error occurred when adding a user' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ error: 'Please fill out both email and password fields' });
  }

  try {
    const user = await req.db.collection('users').findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ error: 'Invalid email and/or password' });
    }

    res.status(200).json({ message: 'Correct login' });
  } catch (error) {
    console.error('Error when logging in', error);
    res.status(500).json({ error: 'Error occurred when logging in' });
  }
};

export const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).json({ error: 'Please fill out both email and password fields' });
  }

  try {
    const user = await req.db.collection('users').findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ error: 'Invalid email and/or password' });
    }

    const token = jwt.sign(
      { userId: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error when verifying user', error);
    res.status(500).json({ error: 'Error occurred when verifying user' });
  }
};
