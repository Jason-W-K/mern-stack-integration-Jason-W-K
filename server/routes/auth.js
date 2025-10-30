const express = require('express');
const router = express.Router();

// Sample GET route
router.get('/', (req, res) => {
  res.json({ message: 'Auth route is working!' });
});

module.exports = router;