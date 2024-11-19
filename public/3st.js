// 2st.js

import { jsPsych } from "https://cdn.jsdelivr.net/npm/jspsych@6.3.1/dist/jspsych.js";
import { CallFunctionPlugin } from "https://cdn.jsdelivr.net/npm/jspsych@6.3.1/dist/plugins/jspsych-call-function.js";
import { CanvasKeyboardResponsePlugin } from "https://cdn.jsdelivr.net/npm/jspsych@6.3.1/dist/plugins/jspsych-canvas-keyboard-response.js";
import { InstructionsPlugin } from "https://cdn.jsdelivr.net/npm/jspsych@6.3.1/dist/plugins/jspsych-instructions.js";

const two_step_task = {
  data: {
    trial_n: 0,
    timeout: false,
    step_1_action: null,
    step_2_action: null,
    step_1_rt: null,
    step_2_rt: null,
    transition: null,
    reward: null,
    reward_probs: {}
  },

  interaction: {
    choice_names: [],
    choice_keys: ['z', 'm'],
    timeout_ms: 2000,
    timeout_display_ms: 1000,
    draw_choices: function(canv) {
      // Choice drawing logic (ここで選択肢を描画)
      const ctx = canv.getContext('2d');
      const width = canv.width;
      const height = canv.height;

      ctx.clearRect(0, 0, width, height);  // キャンバスをクリア

      // 2つの選択肢を描画
      ctx.font = '20px Arial';
      ctx.fillText(this.choice_names[0], width * 0.25, height * 0.5);  // 1番目の選択肢
      ctx.fillText(this.choice_names[1], width * 0.75, height * 0.5);  // 2番目の選択肢
    },
    get_choice_name: function(response) {
      return this.choice_names[response - 1]; // responseは1か2
    },
    get_choice_idx: function(data) {
      return this.choice_keys.indexOf(data.response); // 0または1
    }
  },

  images: {
    filenames: {},  // 画像ファイル名
    data: {},  // 画像データ
    n_loaded: 0,  // ロードされた画像数
    proportional_dims: { width: 0.4, height: 0.4 },  // 比例的な画像サイズ
    absolute_dims: {},  // 絶対的な画像サイズ

    load: function(on_finish) {
      // 画像を読み込む
      const totalImages = Object.keys(this.filenames).length;
      let loadedImages = 0;

      Object.values(this.filenames).forEach(src => {
        const img = new Image();
        img.onload = () => {
          loadedImages += 1;
          if (loadedImages === totalImages) {
            on_finish();  // すべての画像が読み込まれたらon_finishを呼び出す
          }
        };
        img.src = src;
      });
    }
  },

  reward: {
    initialize_probs: function() {
      // 報酬確率の初期化
      this.probs = {
        common: 0.8,  // 共通の報酬確率
        rare: 0.2     // 稀な報酬確率
      };
    },
    update_probs: function() {
      // 報酬確率の更新
      // 例えば、選択に応じて報酬の確率を変更することができます。
    },
    probs: {}
  },

  transition: {
    common_prob: 0.7,  // 遷移の確率
    structure: {
      '1A': { common: '2AA', rare: '2AB' },
      '1B': { common: '2BA', rare: '2BB' }
    }
  },

  animation: {
    canv_dims: [],
    initiate_loop: function() {
      // アニメーションループの開始
      // ここでアニメーションの設定ができます
    },
    prepare: function(response) {
      // アニメーション準備
      // ここでアニメーションを準備します
    },
    draw_final_frame: function(canv) {
      // 最終フレームの描画
      const ctx = canv.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillText('最終フレーム', canv.width / 2, canv.height / 2);
    },
    length_ms: 1000,  // アニメーションの長さ（ミリ秒）
    raf_id: null  // requestAnimationFrameのID
  },

  utils: {
    deepcopy: function(obj) {
      return JSON.parse(JSON.stringify(obj));  // 深いコピー
    }
  },

  // 実験初期化関数
  initialize_experiment: function() {
    var trial = {
      type: CallFunctionPlugin,
      async: true,
      func: function(on_finish) {
        // 初期化処理
        two_step_task.reward.initialize_probs();
        two_step_task.data.trial_n = 0;

        // 画像をロード
        if (two_step_task.images.n_loaded === 0) {
          two_step_task.images.load(on_finish);  // 画像がロードされるまで待機
        } else {
          on_finish();  // 画像がすでにロードされている場合
        }
      }
    };
    return trial;
  },

  // トライアルの初期化
  initialize_trial: function() {
    var trial = {
      type: CallFunctionPlugin,
      func: function() {
        // キャンバスのサイズ設定
        if (typeof window !== 'undefined') {
          const side_len = 0.9 * Math.min(window.innerHeight, window.innerWidth);
          two_step_task.animation.canv_dims = [side_len, side_len];
        }

        // 画像の座標設定
        var ppn_dims = two_step_task.images.proportional_dims;
        two_step_task.interaction.choice_coordinates = [
          {
            x: (0.25 - 0.5 * ppn_dims.width) * side_len,
            y: (0.5 - 0.5 * ppn_dims.height) * side_len
          },
          {
            x: (0.75 - 0.5 * ppn_dims.width) * side_len,
            y: (0.5 - 0.0 * ppn_dims.height) * side_len
          }
        ];

        // 絶対サイズの計算
        for (var k in ppn_dims) {
          two_step_task.images.absolute_dims[k] = side_len * ppn_dims[k];
        }

        // トライアルデータのリセット
        var trial_n = two_step_task.data.trial_n;
        for (var k in two_step_task.data) {
          two_step_task.data[k] = null;
        }
        two_step_task.data.trial_n = trial_n + 1;
        two_step_task.data.timeout = false;
      }
    };
    return trial;
  },

  // ステップ1
  step_1: function() {
    var trial = {
      type: CanvasKeyboardResponsePlugin,
      canvas_size: function() { return two_step_task.animation.canv_dims; },
      on_start: function() {
        two_step_task.interaction.choice_names = jsPsych.randomization.repeat(['1A', '1B'], 1);
      },
      stimulus: function(canv) {
        two_step_task.interaction.draw_choices(canv);
      },
      choices: two_step_task.interaction.choice_keys,
      trial_duration: function() { return two_step_task.interaction.timeout_ms; },
      on_finish: function(data) {
        if (data.response) {
          var choice_name = two_step_task.interaction.get_choice_name(data.response);
          two_step_task.data.step_1_action = choice_name;
          two_step_task.data.step_1_rt = data.rt;
          // アニメーションの準備
          two_step_task.animation.prepare(data.response);
        } else {
          two_step_task.data.timeout = true;
        }
      }
    };
    return trial;
  },

  // インストラクション設定
  setup_instructions: function() {
    return {
      type: InstructionsPlugin,
      pages: [
        'これは最初の指示ページです。',
        '次の指示ページです。',
        '実験を始めるには次をクリックしてください。'
      ],
      show_clickable_nav: true,
    };
  },

function save_results(participant_id, birthday,experiment_name) {
  // 参加者のデータをJSONに変換
  const result_data = JSON.stringify(two_step_task.data);
  // 実験名（2st または 3st）を渡す
  const experiment_name = 'experiment2';  // もしくは 'experiment2'

  // サーバーに結果を送信（API経由でGitHubやVercelに送信）
  fetch("/api/saveResults", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      participant_id: participant_id,
      results: result_data,
      experiment_name: experiment_name,  // 実験名を送信
      birthday: birthday,  // 生年月日を送信
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('保存完了:', data);
    })
    .catch(error => {
      console.error('保存エラー:', error);
    });
}

// 実験の中で実際に呼び出される部分
function finishExperiment(participant_id, experiment_name) {
  // 実験終了後に結果を送信
  two_step_task.save_results(participant_id, experiment_name);
}

// 例えば、experiment1（2st.js）が行われた場合
finishExperiment('P001', 'experiment1');

// またはexperiment2（3st.js）の場合
finishExperiment('P001', 'experiment2');
};

export default two_step_task;
