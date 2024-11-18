// experiment.js

// 参加者の生年月日をフォームから取得
function askBirthday() {
  const birthday = document.getElementById('birthday').value;  // 入力された生年月日を取得

  if (birthday) {
    // 入力された生年月日から日付部分（dd）を抽出
    const day = parseInt(birthday.slice(-2), 10);

    // 偶数か奇数かで分岐
    if (day % 2 === 0) {
      // 偶数生まれの場合、2st.js を先に実行
      startExperiment1();  // 2st.jsを先に実行
      startExperiment2();  // 3st.jsを後に実行
    } else {
      // 奇数生まれの場合、3st.js を先に実行
      startExperiment2();  // 3st.jsを先に実行
      startExperiment1();  // 2st.jsを後に実行
    }
  } else {
    alert('生年月日を入力してください。');
  }
}

// 実験1（2st.js）を開始する関数
function startExperiment1() {
  // 2st.jsが既に静的にインポートされているので、実行する関数を呼び出す
  if (typeof startExperiment2st === "function") {
    startExperiment2st();  // 2st.js 内の処理を実行
  } else {
    console.error("2st.jsの関数が未定義です。");
  }
}

// 実験2（3st.js）を開始する関数
function startExperiment2() {
  // 3st.jsが既に静的にインポートされているので、実行する関数を呼び出す
  if (typeof startExperiment3st === "function") {
    startExperiment3st();  // 3st.js 内の処理を実行
  } else {
    console.error("3st.jsの関数が未定義です。");
  }
}

// 実験終了後の共通の処理
function finishExperiment() {
  console.log("実験が終了しました！");
  // 実験終了後に finish.js へ遷移
  window.location.href = '/finish.js';
}
