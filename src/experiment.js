// experiment.js

// jsPsychとそのプラグインをインポート
import jsPsych from 'jspsych';
import { CallFunctionPlugin } from '@jspsych/plugin-call-function';
import { InstructionsPlugin } from '@jspsych/plugin-instructions';

// 参加者に生年月日を入力してもらう
function askBirthday() {
  const birthday = prompt("参加者の生年月日を8桁（例: 19481207）で入力してください:");

  // 入力された生年月日から日付部分（dd）を抽出
  const day = parseInt(birthday.slice(-2), 10);

  // 偶数か奇数かで分岐
  if (day % 2 === 0) {
    // 偶数生まれの場合、実験1を先に実行
    startExperiment(2);
  } else {
    // 奇数生まれの場合、実験2を先に実行
    startExperiment(3);
  }
}

// 参加者の実験結果を保存するためのオブジェクト
let experimentResults = {
  experiment_1: {},
  experiment_2: {}
};

// 実験の進行（実験1または実験2の順番を選択）
function startExperiment(firstExperiment) {
  const experiment = {
    timeline: [
      {
        type: InstructionsPlugin,
        pages: ["実験へようこそ！これからいくつかの質問に答えてもらいます。"],
        show_clickable_nav: true
      }
    ]
  };

  // 生年月日による実験の順番を決める
  if (firstExperiment === 2) {
    // 実験1（2st.js）を先に実行
    experiment.timeline.push({
      type: CallFunctionPlugin,
      func: function() {
        import('./2st.js').then(module => {
          module.startExperiment(experimentResults, 'experiment_1'); // 結果を渡す
        });
      }
    });
  } else {
    // 実験2（3st.js）を先に実行
    experiment.timeline.push({
      type: CallFunctionPlugin,
      func: function() {
        import('./3st.js').then(module => {
          module.startExperiment(experimentResults, 'experiment_2'); // 結果を渡す
        });
      }
    });
  }

  // 最後に共通の終了ページを表示
  experiment.timeline.push({
    type: CallFunctionPlugin,
    func: function() {
      import('./finish.js').then(module => {
        module.showFinishMessage(experimentResults); // 結果を送信
      });
    }
  });

  // 実験の開始
  jsPsych.init({
    timeline: experiment.timeline,
    on_finish: function() {
      console.log("実験が終了しました！");
    }
  });
}

// 実験を開始
askBirthday();
