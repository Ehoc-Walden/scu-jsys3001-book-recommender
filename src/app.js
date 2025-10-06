const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookrecommender', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 路由
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// 前端路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server started!`);
  console.log(`📚 The good book recommendation app is now available at:`);
  console.log(`👉 Local: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://${getLocalIP()}:${PORT}`);
  console.log(`\n按 Ctrl+C Stop server`);
});

// 获取本地IP地址的函数
function getLocalIP() {
  const interfaces = require('os').networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const interface of interfaces[interfaceName]) {
      if (interface.family === 'IPv4' && !interface.internal) {
        return interface.address;
      }
    }
  }
  return 'localhost';
}