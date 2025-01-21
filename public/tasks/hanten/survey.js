const firebaseConfig = {
  apiKey: "AIzaSyCA0zQz0WBXJ4DfiDwBBIEXKdKygwJg_Q8",
  authDomain: "utokyo-edup.firebaseapp.com",
  projectId: "utokyo-edup",
  storageBucket: "utokyo-edup.firebasestorage.app",
  messagingSenderId: "92702717304",
  appId: "1:92702717304:web:9e41b501faceff6efb448d",
  measurementId: "G-M9LRC5KRTZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // すでに初期化されている場合は再初期化しない
}

// Firestoreインスタンスを取得
const db = firebase.firestore();

function getDOBFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const dob = urlParams.get('dob'); // dobパラメータを取得
  return dob;
}

// dobを取得
const dob = getDOBFromURL();

if (!dob) {
  console.error('Date of birth (dob) not provided');
  alert('生年月日が提供されていません。');
  throw new Error('dobが提供されていません');
}

let participant_id = dob + '_' + Date.now();  // Participant ID
localStorage.setItem('participant_id', participant_id);


const questions = [
  { prompt: "0好きな動物は何ですか？", options: ['犬', '猫', '鳥', '魚'] },
  { prompt: "1（A）100%の確率で1,050円を「もらえる」<br><br><br>（B）50%の確率で2,100円を「もらえる」か、<br>50%の確率で０円<br><br><br>◆　AとBのどちらか1つしか選べない場合、<br>選ぶ可能性を選んでください。", options: ['１<br>Aを選ぶ<br>可能性が<br>高い', '２', '３','４','５','６<br>Bを選ぶ<br>可能性が<br>高い'] },
  { prompt: "2好きな食べ物は何ですか？", options: ['寿司', 'ピザ'] },
  { prompt: "3好きな映画は何ですか？", options: ['アクション', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "4好きなスポーツは何ですか？", options: ['サッカー', 'バスケ', 'テニス'] },
  { prompt: "5好きな季節はいつですか？", options: ['春','秋', '冬'] },
  { prompt: "6好きな色は何ですか？", options: ['赤', '青', '緑', '黄色'] },
  { prompt: "7好きな動物は何ですか？", options: ['犬', '猫', '鳥', '魚'] },
  { prompt: "8好きな食べ物は何ですか？", options: ['寿司', 'ピザ', 'パスタ', 'ラーメン'] },
  { prompt: "9好きな映画は何ですか？", options: ['アクション', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "10好きなスポーツは何ですか？", options: ['サッカー', '野球', 'バスケ', 'テニス'] },
  { prompt: "11好きな季節はいつですか？", options: ['春', '夏', '秋', '冬'] },
  { prompt: "12好きな色は何ですか？", options: ['赤', '青', '緑', '黄色'] },
  { prompt: "13好きな動物は何ですか？", options: ['犬', '猫', '鳥', '魚'] },
  { prompt: "14好きな食べ物は何ですか？", options: ['寿司', 'ピザ', 'パスタ', 'ラーメン'] },
  { prompt: "15好きな映画は何ですか？", options: ['アクション', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "16「あなたは休暇中にホテルの部屋に滞在しています。<br>テレビをつけると、そこで映画がやっています。<br>５分間見ましたが、映画は面白くありません。」<br><br>　★　今、この感情を数値であらわしてください。", options: ['1<br>すぐにみるのを<br>やめる', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "17「あなたは休暇中にホテルの部屋に滞在しています。<br>テレビをつけると、そこで映画がやっています。<br>５分間見ましたが、映画は面白くありません。」<br><br>  ■　この状況を普段どおりに考えてみてください。<br>あなたはどうしますか？", options: ['-4<br>とても<br>うれしくない', '-3', '-2', '-1','0','+1','+2','+3','+4<br>とても<br>うれしい'] },
  { prompt: "18好きな色は何ですか？", options: ['赤', '青', '緑', '黄色'] },
  { prompt: "19好きな動物は何ですか？", options: ['犬', '猫', '鳥', '魚'] },
  { prompt: "20好きな食べ物は何ですか？", options: ['寿司', 'ピザ', 'パスタ', 'ラーメン'] },
  { prompt: "21好きな映画は何ですか？", options: ['アクション', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "22好きなスポーツは何ですか？", options: ['サッカー', '野球', 'バスケ', 'テニス'] },
  { prompt: "23好きな季節はいつですか？", options: ['春', '夏', '秋', '冬'] },
  { prompt: "24好きな色は何ですか？", options: ['赤', '青', '緑', '黄色'] },
  { prompt: "25好きな動物は何ですか？", options: ['犬', '猫', '鳥', '魚'] },
  { prompt: "26好きな食べ物は何ですか？", options: ['寿司', 'ピザ', 'パスタ', 'ラーメン'] },
  { prompt: "27好きな映画は何ですか？", options: ['アクション', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "28好きなスポーツは何ですか？", options: ['サッカー', '野球', 'バスケ', 'テニス'] },
  { prompt: "29好きな季節はいつですか？", options: ['春', '夏', '秋', '冬'] },
  { prompt: "30好きな色は何ですか？", options: ['赤', '青', '緑', '黄色'] },
  { prompt: "31好きな動物は何ですか？", options: ['犬', '猫', '鳥', '魚'] },
  { prompt: "32好きな食べ物は何ですか？", options: ['寿司', 'ピザ', 'パスタ', 'ラーメン'] },
  { prompt: "33好きな映画は何ですか？", options: ['アクション', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "34好きなスポーツは何ですか？", options: ['サッカー', '野球', 'バスケ', 'テニス'] },
  { prompt: "35好きな季節はいつですか？", options: ['春', '夏', '秋', '冬'] },
  { prompt: "36好きな食べ物は何ですか？", options: ['寿司', 'ピザ', 'パスタ', 'ラーメン'] },
  { prompt: "37好きな映画は何ですか？", options: ['アクション', 'コメディ', 'ドラマ', 'ホラー'] },
  { prompt: "38好きなスポーツは何ですか？", options: ['サッカー', '野球', 'バスケ', 'テニス'] },
  { prompt: "39好きな季節はいつですか？", options: ['春', '夏', '秋', '冬'] },
  { prompt: "お疲れ様でした。ここからは質問セクションです", options: ['了解'] },
  
];

const blocks = {
  "Block1a": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  "Block1b": [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  "Block2a": [16, 17, 18, 19],
  "Block2b": [18, 19, 16, 17],
  "Block3a": [20, 21, 22, 23, 24, 25, 26, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35],
  "Block3b": [35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20],
  "Block4a": [36, 37, 38, 39],
  "Block4b": [38, 39, 36, 37],
};

const blockPairs = [
  ["Block1a", "Block1b"],
  ["Block2a", "Block2b"],
  ["Block3a", "Block3b"],
  ["Block4a", "Block4b"]
];

function generateRandomQuestionOrder() {
  const selectedBlocks = blockPairs.map(pair => pair[Math.floor(Math.random() * 2)]);
  

  // 一部のブロックの順番をランダムに入れ替える
  if (Math.random() < 0.5) {
    [selectedBlocks[0], selectedBlocks[2]] = [selectedBlocks[2], selectedBlocks[0]];
  }
  if (Math.random() < 0.5) {
    [selectedBlocks[1], selectedBlocks[3]] = [selectedBlocks[3], selectedBlocks[1]];
  }

  let questionOrder = [41];
  selectedBlocks.forEach(block => {
    questionOrder = questionOrder.concat(blocks[block]);
  });
  

  return questionOrder;
}

// 質問の順番をランダムに生成
let currentQuestionIndex = 0;
const questionOrder = generateRandomQuestionOrder(); // ランダム化された質問の順番

const responses = [];

function displayQuestion(index) {
  const question = questions[questionOrder[index]]; // questionOrder に従って質問を取得
  const container = document.createElement('div');

  // 質問文を表示（innerHTMLを使用して、改行タグを解釈させる）
  const prompt = document.createElement('p');
  prompt.innerHTML = question.prompt; // innerHTMLを使うことで改行を表示できる
  container.appendChild(prompt);

  // 選択肢を表示
  question.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('choice');
    button.onclick = function() {
      // すべての選択肢の赤色を解除
      document.querySelectorAll('.choice').forEach(btn => btn.classList.remove('selected'));

      // 現在クリックされた選択肢に赤色を付ける
      button.classList.add('selected');
      
      // 選択肢を記録
      responses[questionOrder[index]] = option; // questionOrder に基づいて回答を記録

      // '次へ'ボタンを有効化
      document.getElementById('next-button').disabled = false;
    };
    container.appendChild(button);
  });

  return container;
}

// 回答が選択されたかを確認する関数
function isQuestionAnswered() {
  return responses[questionOrder[currentQuestionIndex]] !== undefined; // 回答が記録されていればtrue
}



async function sendResponses() {
  // 質問の順番を0番目から41番目まででソート
  const sortedResponses = new Array(questions.length);
  questionOrder.forEach((questionIndex, i) => {
    // 選択肢のインデックスを取得し、1を加算して選択肢番号を1から始める
    const responseIndex = questions[questionIndex].options.indexOf(responses[questionIndex]) + 1;
    sortedResponses[questionIndex] = `${questionIndex + 1},${responseIndex}`; // 質問番号と選択肢番号をセットで保存
  });

  // データ構造を定義
  const data = {
    participant_id: participant_id,
    responses: sortedResponses, // ソートされた順番で回答を送信
    dob: dob,  // 生年月日 (dob)
    timestamp: new Date().toISOString() // タイムスタンプ
  };

  try {
    // Firebaseにデータを送信 (非同期処理)
    await db.collection("survey_responses").add(data);
    console.log("データが正常に送信されました");

    // 送信後、メッセージ表示
    const messageContainer = document.createElement('p');
    messageContainer.textContent = '以上ですべての調査終了です。たいへんお疲れ様でした。このままブラウザを閉じてください。';
    document.getElementById('survey-container').appendChild(messageContainer);
  } catch (error) {
    console.error("データ送信エラー: ", error);
    alert("データ送信に失敗しました。再試行してください。");
  }
}




// 次の質問を表示する関数
function showNextQuestion() {
  // 質問に答えていない場合
  if (!isQuestionAnswered()) {
    document.getElementById('error-message').style.display = 'block'; // エラーメッセージ表示
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questionOrder.length) {
    // 新しい質問を表示
    const questionElement = displayQuestion(currentQuestionIndex);

    const container = document.getElementById('survey-container');
    container.innerHTML = ''; // 既存の内容をクリア
    container.appendChild(questionElement);

    // ボタンを無効化しておく
    document.getElementById('next-button').disabled = true;

    // エラーメッセージを非表示に
    document.getElementById('error-message').style.display = 'none';
  } else {
    sendResponses();
  }
}

// 初期化
const container = document.getElementById('survey-container');
const firstQuestionElement = displayQuestion(currentQuestionIndex);
container.appendChild(firstQuestionElement);

// 次へボタンを常に表示
document.getElementById('next-button').style.display = 'block'; // 常に表示
document.getElementById('next-button').disabled = true; // 初期状態では無効
document.getElementById('next-button').addEventListener('click', showNextQuestion);
