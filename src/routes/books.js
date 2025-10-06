const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// 获取所有书籍
router.get('/', async (req, res) => {
  try {
    const { genre, search, limit = 10 } = req.query;
    let query = {};
    
    if (genre) query.genre = genre;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    const books = await Book.find(query).limit(parseInt(limit));
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 获取单个书籍
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加新书籍
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新书籍推荐计数
router.patch('/:id/recommend', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $inc: { recommendationCount: 1 } },
      { new: true }
    );
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 按类型获取书籍
router.get('/genre/:genre', async (req, res) => {
  try {
    const books = await Book.find({ genre: req.params.genre });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;