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
  "Block4b": [38, 39, 36, 37]
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

// 質問の順番をランダムに生成
let currentQuestionIndex = 0;
const questionOrder = generateRandomQuestionOrder(); // ランダム化された質問の順番

const responses = [];

function displayQuestion(index) {
  const question = questions[questionOrder[index]]; // questionOrder に従って質問を取得
  const container = document.createElement('div');

  // 質問文を表示
  const prompt = document.createElement('p');
  prompt.textContent = question.prompt;
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
    alert("アンケートが完了しました！");
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
