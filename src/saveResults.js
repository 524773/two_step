// src/saveResults.js

export async function saveResults(participant_id, results) {
  try {
    // サーバーにデータを送信するためのPOSTリクエスト
    const response = await fetch('/api/saveResults', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participant_id, results }),
    });

    // レスポンスを取得
    const data = await response.json();

    if (response.ok) {
      console.log('データが保存されました:', data.message);
      return data;  // データが保存されたことを返す
    } else {
      console.error('エラーが発生しました:', data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('データ送信中にエラーが発生しました:', error);
    throw error;
  }
}
