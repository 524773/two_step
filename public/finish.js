// finish.js

export function showFinishMessage(results, birthday) {
  // 研究への参加を感謝するメッセージをページ内に表示する
  const finishMessage = document.createElement('div');
  finishMessage.style.position = 'absolute';
  finishMessage.style.top = '50%';
  finishMessage.style.left = '50%';
  finishMessage.style.transform = 'translate(-50%, -50%)';
  finishMessage.style.padding = '20px';
  finishMessage.style.backgroundColor = '#f0f0f0';
  finishMessage.style.border = '1px solid #ccc';
  finishMessage.style.textAlign = 'center';
  finishMessage.style.fontSize = '18px';
  finishMessage.innerHTML = `
    <p>研究にご参加いただき、ありがとうございました！</p>
    <p>結果は正常に保存されました。</p>
  `;
  document.body.appendChild(finishMessage);

  // 結果をVercelサーバーに送信
  saveResults(results, birthday);
}

async function saveResults(results, birthday) {
  const participant_id = generateParticipantId(birthday);  // 生年月日と実験開始時刻から参加者IDを生成

  const resultData = {
    participant_id,
    results: results,
    experiment_name: 'experiment1',  // もしくは 'experiment2' を指定
    birthday: birthday,  // 生年月日
  };

  try {
    const response = await fetch('/api/saveResults', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData)  // 実験結果をJSONで送信
    });

    if (response.ok) {
      console.log("データが保存されました");
    } else {
      const errorData = await response.json();
      console.error("データ保存に失敗しました:", errorData.error);
      alert("結果の保存中にエラーが発生しました。");
    }
  } catch (error) {
    console.error("サーバーへの送信中にエラーが発生しました:", error);
    alert("ネットワークエラーが発生しました。後でもう一度試してください。");
  }
}

// 動的に参加者IDを生成する関数
function generateParticipantId(birthday) {
  // 生年月日（例: '1956-12-07'）を YYYYMMDD 形式に変換
  const birthDate = new Date(birthday);  // 生年月日をDateオブジェクトに変換
  const formattedBirthday = birthDate.getFullYear().toString().padStart(4, '0') +
                            (birthDate.getMonth() + 1).toString().padStart(2, '0') +
                            birthDate.getDate().toString().padStart(2, '0');

  // 実験開始時刻を現在の時刻として取得
  const now = new Date();
  const formattedTime = now.getFullYear().toString().padStart(4, '0') +
                        (now.getMonth() + 1).toString().padStart(2, '0') +
                        now.getDate().toString().padStart(2, '0') +
                        now.getHours().toString().padStart(2, '0') +
                        now.getMinutes().toString().padStart(2, '0') +
                        now.getSeconds().toString().padStart(2, '0') +
                        now.getMilliseconds().toString().padStart(3, '0');

  // 参加者IDを生成: 生年月日 + 実験開始時刻
  return `${formattedBirthday}${formattedTime}`;
}

