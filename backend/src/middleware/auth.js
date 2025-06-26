const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

const requireGuest = (req, res, next) => {
  if (req.session.userId) {
    return res.status(400).json({ error: 'Already authenticated' });
  }
  next();
};

const attachUser = async (req, res, next) => {
  if (req.session.userId) {
    try {
      // This will be replaced with actual Prisma user lookup when connected
      req.user = { id: req.session.userId };
    } catch (error) {
      console.error('Error attaching user:', error);
    }
  }
  next();
};

module.exports = {
  requireAuth,
  requireGuest,
  attachUser
};
