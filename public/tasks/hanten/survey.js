// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyCA0zQz0WBXJ4DfiDwBBIEXKdKygwJg_Q8",
  authDomain: "utokyo-edup.firebaseapp.com",
  projectId: "utokyo-edup",
  storageBucket: "utokyo-edup.firebasestorage.app",
  messagingSenderId: "92702717304",
  appId: "1:92702717304:web:9e41b501faceff6efb448d",
  measurementId: "G-M9LRC5KRTZ"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// パラメータから生年月日を取得
function getDOBFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('dob');
}

const dob = getDOBFromURL();
if (!dob) {
  console.error('Date of birth (dob) not provided');
  alert('生年月日が提供されていません。');
  throw new Error('dobが提供されていません');
}

let participant_id = dob + '_' + Date.now();  // Participant ID
localStorage.setItem('participant_id', participant_id);

const questions = [
  { prompt: "0これは非常に長い質問文です。<br>もう一行表示したい場合、<br>こちらのように改行できます。", options: ['赤', '青', '緑'] },
  { prompt: "1好きな動物は何ですか？", options: ['犬', '猫', '鳥', '魚'] },
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
  { prompt: "16これは非常に長い質問文です。<br>もう一行表示したい場合、<br>こちらのように改行できます。", options: ['サッカー', '野球', 'バスケ', 'テニス'] },
  { prompt: "17好きな季節はいつですか？", options: ['春', '夏', '秋', '冬'] },
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

  let questionOrder = [];
  selectedBlocks.forEach(block => {
    questionOrder = questionOrder.concat(blocks[block]);
  });
  

  return questionOrder;
}
// ランダムに並べ替えられた質問順
const questionOrder = generateRandomQuestionOrder();
let currentQuestionIndex = 0;
const responses = [];

function displayQuestion(index) {
  const question = questions[questionOrder[index]];
  const container = document.createElement('div');

  // 質問文を表示
  const prompt = document.createElement('p');
  prompt.innerHTML = question.prompt;
  container.appendChild(prompt);

  // 選択肢のボタンを表示
  question.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('choice');
    button.onclick = function() {
      document.querySelectorAll('.choice').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      responses[questionOrder[index]] = option;
      document.getElementById('next-button').disabled = false;
    };
    container.appendChild(button);
  });

  return container;
}

function isQuestionAnswered() {
  return responses[questionOrder[currentQuestionIndex]] !== undefined;
}

// Firebaseにデータを送信
async function sendResponses() {
  const sortedResponses = new Array(questions.length);
  questionOrder.forEach((questionIndex, i) => {
    const responseIndex = questions[questionIndex].options.indexOf(responses[questionIndex]) + 1;
    sortedResponses[questionIndex] = `${questionIndex + 1},${responseIndex}`;
  });

  const data = {
    participant_id: participant_id,
    responses: sortedResponses,
    dob: dob,
    timestamp: new Date().toISOString()
  };

  try {
    await db.collection("survey_responses").add(data);
    console.log("データが正常に送信されました");

    const messageContainer = document.createElement('p');
    messageContainer.textContent = '調査終了です。ありがとうございました。';
    document.getElementById('survey-container').appendChild(messageContainer);
  } catch (error) {
    console.error("データ送信エラー: ", error);
    alert("データ送信に失敗しました。再試行してください。");
  }
}

function showNextQuestion() {
  if (!isQuestionAnswered()) {
    document.getElementById('error-message').style.display = 'block';
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questionOrder.length) {
    const questionElement = displayQuestion(currentQuestionIndex);
    const container = document.getElementById('survey-container');
    container.innerHTML = '';
    container.appendChild(questionElement);
    document.getElementById('next-button').disabled = true;
    document.getElementById('error-message').style.display = 'none';
  } else {
    sendResponses();
  }
}

// 最初の質問を表示
const container = document.getElementById('survey-container');
const firstQuestionElement = displayQuestion(currentQuestionIndex);
container.appendChild(firstQuestionElement);

// 次へボタンの設定
document.getElementById('next-button').addEventListener('click', showNextQuestion);
