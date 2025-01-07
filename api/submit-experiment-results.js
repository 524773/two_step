// api/submit-experiment-results.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { participant_id, results, dob } = req.body;

    // 受け取ったデータをログに出力（ここにデータベース保存などを追加可能）
    console.log('参加者ID:', participant_id);
    console.log('生年月日:', dob);
    console.log('結果:', results);

    // データベース保存などの処理を追加できる

    // 成功レスポンスを返す
    res.status(200).json({ message: '結果が正常に送信されました' });
  } else {
    // 許可されていないメソッドのエラー
    res.status(405).json({ message: '許可されていないメソッドです' });
  }
}

