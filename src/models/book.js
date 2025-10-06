const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  coverImage: {
    type: String,
    default: '/images/default-book-cover.jpg'
  },
  publishedYear: {
    type: Number
  },
  isbn: {
    type: String
  },
  recommendationCount: {
    type: Number,
    default: 0
  },
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
const sampleBooks = [
    {
        title: "Trisomy",
        author: "Liucixin",
        description: "The landmark work of Chinese science fiction tells about the contact and conflict between the earth civilization and the three body civilization.",
        genre: "science fiction",
        rating: 4.8,
        publishedYear: 2008,
        coverImage: "https://img1.doubanio.com/view/subject/s/public/s2768378.jpg",
        recommendationCount: 156
    },
    {
        title: "Alive",
        author: "Yu Hua",
        description: "通过一个普通农民的视角，展现中国近代历史的变迁和人性的坚韧。",
        genre: "小说",
        rating: 4.7,
        publishedYear: 1993,
        coverImage: "./",
        recommendationCount: 203
    },
    {
        title: "A brief history of mankind",
        author: "Yuval herali",
        description: "From cognitive revolution to scientific revolution, reinterpret the development of human history.",
        genre: "history",
        rating: 4.6,
        publishedYear: 2011,
        coverImage: "https://img9.doubanio.com/view/subject/s/public/s27814883.jpg",
        recommendationCount: 89
    },
    {
        title: "Little prince",
        author: "Antoine de Saint Exupery",
        description: "A fairy tale for adults, about love, responsibility and the true meaning of life.",
        genre: "novel",
        rating: 4.9,
        publishedYear: 1943,
        coverImage: "https://img9.doubanio.com/view/subject/s/public/s1103152.jpg",
        recommendationCount: 312
    },
    {
        title: "A hundred years of solitude",
        author: "Gabriel Garcia Marquez",
        description: "The representative work of magic realism literature tells the legend of seven generations of the boundia family.",
        genre: "novel",
        rating: 4.7,
        publishedYear: 1967,
        coverImage: "https://img1.doubanio.com/view/subject/s/public/s11063868.jpg",
        recommendationCount: 178
    },
    {
        title: "Thinking, fast and slow",
        author: "Daniel Kahneman",
        description: "Reveal the operation mode of the two systems in human thinking, and help us make better decisions.",
        genre: "self-help",
        rating: 4.5,
        publishedYear: 2011,
        coverImage: "https://img9.doubanio.com/view/subject/s/public/s11341868.jpg",
        recommendationCount: 67
    }
];
exports.sampleBooks = sampleBooks;
