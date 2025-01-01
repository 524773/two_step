import { Octokit } from "@octokit/rest";
import { parse } from "json2csv";

async function saveToGitHub(filePath, content) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: 'YOUR_GITHUB_USERNAME',
      repo: 'YOUR_REPOSITORY_NAME',
      path: filePath,
      message: `保存: ${filePath}`,
      content: Buffer.from(content).toString('base64'),
      branch: 'main',
    });

    console.log('GitHubに保存成功:', response.data);
  } catch (error) {
    console.error('GitHub保存エラー:', error);
    throw new Error('GitHubへの保存に失敗しました');
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { participant_id, results, birthday } = req.body;

      if (!participant_id || !results || !birthday) {
        return res.status(400).json({ message: 'データが不足しています' });
      }

      const csvContent = parse(results);
      const filePath = `results/${birthday}_${participant_id}_results.csv`;

      await saveToGitHub(filePath, csvContent);

      return res.status(200).json({ message: '保存成功' });
    } catch (error) {
      console.error('APIエラー:', error);
      return res.status(500).json({ message: 'データ保存失敗' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
