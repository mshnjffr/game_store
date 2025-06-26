const prisma = require('../config/prisma');
const { hashPassword, comparePassword } = require('../utils/encryption');
const logger = require('../utils/logger');

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = {
      id: nextUserId++,
      email,
      password_hash: hashedPassword,
      firstName,
      lastName,
      created_at: new Date(),
      updated_at: new Date()
    };

    users.set(user.id, user);

    // Create session
    req.session.userId = user.id;

    logger.info('User registered successfully', { userId: user.id, email });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    logger.error('Registration failed', { error: error.message });
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = Array.from(users.values()).find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create session
    req.session.userId = user.id;

    logger.info('User logged in successfully', { userId: user.id, email });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    logger.error('Login failed', { error: error.message });
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.session.userId;
    
    req.session.destroy((err) => {
      if (err) {
        logger.error('Logout failed', { error: err.message, userId });
        return res.status(500).json({ error: 'Logout failed' });
      }
      
      res.clearCookie('connect.sid');
      logger.info('User logged out successfully', { userId });
      res.json({ message: 'Logout successful' });
    });
  } catch (error) {
    logger.error('Logout error', { error: error.message });
    res.status(500).json({ error: 'Logout failed' });
  }
};

const getSession = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({ authenticated: false });
    }

    const user = users.get(req.session.userId);
    if (!user) {
      req.session.destroy();
      return res.json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    logger.error('Session check failed', { error: error.message });
    res.status(500).json({ error: 'Session check failed' });
  }
};

// Initialize with a test user for development
const initializeTestUser = async () => {
  try {
    const testUser = {
      id: nextUserId++,
      email: 'test@example.com',
      password_hash: await hashPassword('password123'),
      firstName: 'Test',
      lastName: 'User',
      created_at: new Date(),
      updated_at: new Date()
    };
    
    users.set(testUser.id, testUser);
    console.log('Test user created: test@example.com / password123');
  } catch (error) {
    console.error('Failed to create test user:', error);
  }
};

// Initialize test user
initializeTestUser();

module.exports = {
  register,
  login,
  logout,
  getSession
};
