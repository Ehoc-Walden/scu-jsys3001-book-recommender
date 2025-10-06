const mongoose = require('mongoose');
require('dotenv').config();

// 简单的书籍数据模型定义（避免依赖外部模型文件）
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    coverImage: { type: String, default: '/images/default-book-cover.jpg' },
    publishedYear: { type: Number },
    isbn: { type: String },
    recommendationCount: { type: Number, default: 0 },
    tags: [String]
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

const sampleBooks = [
    {
        title: "Trisomy",
        author: "Liucixin",
        description: "The landmark work of Chinese science fiction tells about the contact and conflict between the earth civilization and the three body civilization.",
        genre: "science fiction",
        rating: 4.8,
        publishedYear: 2008,
        coverImage: "https://n.sinaimg.cn/sinakd20221208s/249/w1080h1569/20221208/efc3-afeb8e1e42d5d5c0c8b598e9395d252e.jpg",
        recommendationCount: 156
    },
    {
        title: "Alive",
        author: "Yu Hua",
        description: "From the perspective of an ordinary farmer, it shows the changes of modern Chinese history and the tenacity of human nature.",
        genre: "novel",
        rating: 4.7,
        publishedYear: 1993,
        coverImage: "https://img13.360buyimg.com/n0/jfs/t17410/49/1720742472/193058/e66fc487/5ad5c2e3N28db4e91.jpg",
        recommendationCount: 203
    },
    {
        title: "A brief history of mankind",
        author: "Yuval herali",
        description: "From cognitive revolution to scientific revolution, reinterpret the development of human history.",
        genre: "history",
        rating: 4.6,
        publishedYear: 2011,
        coverImage: "https://ts4.tc.mm.bing.net/th/id/OIP-C.mFzxZJ4zHknI47o4ozuA2wHaJu?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
        recommendationCount: 89
    },
    {
        title: "Little prince",
        author: "Antoine de Saint Exupery",
        description: "A fairy tale for adults, about love, responsibility and the true meaning of life.",
        genre: "novel",
        rating: 4.9,
        publishedYear: 1943,
        coverImage: "https://ts3.tc.mm.bing.net/th/id/OIP-C._rH_DZx9BmG24pVqafmv-AAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
        recommendationCount: 312
    },
    {
        title: "A hundred years of solitude",
        author: "Gabriel Garcia Marquez",
        description: "The representative work of magic realism literature tells the legend of seven generations of the boundia family.",
        genre: "novel",
        rating: 4.7,
        publishedYear: 1967,
        coverImage: "https://ts2.tc.mm.bing.net/th/id/OIP-C.Od27fFwmuNwwCxt3fZVUYwHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
        recommendationCount: 178
    },
    {
        title: "Thinking, fast and slow",
        author: "Daniel Kahneman",
        description: "Reveal the operation mode of the two systems in human thinking, and help us make better decisions.",
        genre: "self-help",
        rating: 4.5,
        publishedYear: 2011,
        coverImage: "https://ts2.tc.mm.bing.net/th/id/OIP-C.rY2cj76jtb5-OaGWkis9cAHaFk?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
        recommendationCount: 67
    }
];

async function seedDatabase() {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookrecommender';
        
        console.log('Connecting to database...');
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database successfully');

        // 清空现有数据
        console.log('Clearing existing books...');
        await Book.deleteMany({});
        console.log('Existing books cleared');

        // 插入示例数据
        console.log('Inserting sample books...');
        await Book.insertMany(sampleBooks);
        console.log('Sample books inserted successfully');

        // 验证插入的数据
        const count = await Book.countDocuments();
        console.log(`Total books in database: ${count}`);

        // 显示插入的书籍标题
        const books = await Book.find({}, 'title author');
        console.log('\nInserted books:');
        books.forEach(book => {
            console.log(`- ${book.title} by ${book.author}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        console.log('\nTroubleshooting tips:');
        console.log('1. Make sure MongoDB is running');
        console.log('2. Check your MONGODB_URI in .env file');
        console.log('3. For local MongoDB, run: mongod');
        process.exit(1);
    }
}

// 处理进程退出
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
});

seedDatabase();