const express = require('express');
const app = express();

// JSON データを処理するためのミドルウェア
app.use(express.json()); // JSON リクエストボディを解析する

// URLエンコードされたデータも解析できるように
app.use(express.urlencoded({ extended: true }));

// POST リクエストを受け取るエンドポイントの定義
app.post('/your-api-endpoint', (req, res) => {
    // クライアントから送られてきたデータ
    const { participant_id, results, dob } = req.body;

    // 受け取ったデータをログに出力（必要に応じてデータベースなどに保存）
    console.log('参加者ID:', participant_id);
    console.log('生年月日:', dob);
    console.log('結果:', results);

    // 必要に応じてデータベースに保存する処理を追加します

    // 成功レスポンスを返す
    res.json({ message: '結果保存成功' });
});

// サーバーを指定のポートで起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});
