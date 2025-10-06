// 简化的种子脚本，不依赖数据库
const fs = require('fs');
const path = require('path');

const sampleBooks = [
    {
        _id: '1',
        title: "Trisomy",
        author: "Liucixin",
        description: "中国科幻文学的里程碑之作，讲述地球文明与三体文明的接触和冲突。",
        genre: "科幻",
        rating: 4.8,
        publishedYear: 2008,
        coverImage: "/images/default-book-cover.jpg",
        recommendationCount: 156
    },
    {
        _id: '2',
        title: "活着",
        author: "余华",
        description: "通过一个普通农民的视角，展现中国近代历史的变迁和人性的坚韧。",
        genre: "小说",
        rating: 4.7,
        publishedYear: 1993,
        coverImage: "/images/default-book-cover.jpg",
        recommendationCount: 203
    }
];

// 将数据写入 JSON 文件供前端使用
const dataPath = path.join(__dirname, '../public/data/books.json');
const dirPath = path.dirname(dataPath);

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(dataPath, JSON.stringify(sampleBooks, null, 2));
console.log('Sample books data generated at:', dataPath);
console.log('You can now run the application with: npm start');