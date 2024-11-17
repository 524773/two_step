// api/saveResults.js

import { Octokit } from "@octokit/rest";
import { parse } from 'json2csv';  // json2csvライブラリをインポート

// GitHubへの結果保存関数（CSV形式で保存）
async function saveToGitHub(filePath, content) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,  // GitHubのPersonal Access Tokenを環境変数から取得
  });

  try {
    // GitHubにファイルを保存（または更新）する
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: 'YOUR_GITHUB_USERNAME',     // GitHubユーザー名を指定
      repo: 'YOUR_REPOSITORY_NAME',      // リポジトリ名を指定
      path: filePath,                    // ファイルパス（例: results/20230101_P001_results.csv）
      message: `保存: ${filePath}`,      // コミットメッセージ
      content: Buffer.from(content).toString('base64'),  // コンテンツをBase64エンコードして送信
      branch: 'main',                    // 保存先のブランチ（例: 'main'）
    });

    console.log('GitHubに保存しました:', response.data);
  } catch (error) {
    console.error('GitHubへの保存中にエラーが発生しました:', error);
    throw new Error('GitHubへの保存に失敗しました');
  }
}

// APIのメインハンドラー
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { participant_id, results, experiment_name, birthday } = req.body;

      // 必要なデータが送信されているか確認
      if (!participant_id || !results || !birthday) {
        return res.status(400).json({ message: '必要なデータが不足しています' });
      }

      // 実験結果をCSVに変換
      const csvContent = parse(results);  // JSONからCSVに変換

      // 生年月日をファイル名に含め、参加者IDも組み込む
      const filePath = `results/${birthday}_${participant_id}_results.csv`;  // 例: 20230101_P001_results.csv

      // GitHubに結果を保存
      await saveToGitHub(filePath, csvContent);

      return res.status(200).json({ message: 'データが保存されました' });
    } catch (error) {
      console.error('サーバーエラー:', error);
      return res.status(500).json({ message: 'データ保存に失敗しました' });
    }
  } else {
    // POST以外のリクエストには405を返す
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
