const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 获取用户收藏的书籍
router.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favoriteBooks');
    res.json(user.favoriteBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加书籍到收藏
router.post('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { favoriteBooks: req.body.bookId } },
      { new: true }
    ).populate('favoriteBooks');
    res.json(user.favoriteBooks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;