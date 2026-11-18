const express = require('express');
const router = express.Router();
const UserStore = require('../models/User');

router.post('/register', (req, res) => {
  const { name, email, password, role, campusId, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  const existing = UserStore.findByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const user = UserStore.create({
    name,
    email,
    passwordHash: 'hashed_' + password,
    role: role || 'CUSTOMER',
    campusId,
    phone
  });

  const token = 'mock_jwt_token_' + user.id;
  res.status(201).json({
    token,