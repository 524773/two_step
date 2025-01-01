// server.js
const express = require('express');
const app = express();
const port = 3000;

// ルートエンドポイントを設定
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// サーバーを指定したポートで起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
