//---------------------------------------//
// Define instructions parameters
//---------------------------------------//

// Define comprehension thresholds.
const max_errors = 0;
const max_loops = 10;
var n_loops = 0;

//---------------------------------------//
// Define instructions (section 1a)
//---------------------------------------//
// The purpose of this section is to introduce the "alien space trading" mechanic.
// The key pieces of information to communicate are:
//   - The two planets and their respective aliens
//   - Trading with aliens for treasure or junk
//   - Probabilistic nature of trading
//   - Keyboard keys for making choices

// Define instructions screens.
const instructions_1a = {
  type: jsPsychTwoStepInstructions,
  pages: [
    "<p>このゲームは、宇宙人と資源の取引をします。取引は普通、得をしたり、損をしますが、こちらは「やさしい宇宙群」のため、プラスマイナス０の取引か利得をえる取引だけになります。</p>",
    `<p>各惑星には2人の宇宙人がいます。例えば:</p><p><b><font color='${practice_info.font_colors[2]}'>${practice_info.planet_names[0]}</font></b>色の宇宙人がいるのは、惑星<b><font color='${practice_info.font_colors[2]}'>${practice_info.planet_names[0]}</font></b>で、</p><p><b><font color='${practice_info.font_colors[3]}'>${practice_info.planet_names[1]}</font></b>色の宇宙人がいるのは、惑星<b><font color='${practice_info.font_colors[3]}'>${practice_info.planet_names[1]}</font></b>です。</p>`,
    "<p>惑星を訪問したら、取引する宇宙人を選びます。</p><p>宇宙人と取引すると<b>我々の協力者で、通訳である感情表現の豊かな「ワープさん」が</b><b>取引結果に応じた表情を見せます。</b></p>",
    "<p>通訳の「ワープさん」は、</p><p>取引で得をすると「にこにこ顔」になります。</p><p>表情はこちらです。（画像は練習用です）</p>",
    "<p>プラスマイナス０の取引結果になれば</p><p>現状維持なので、「真顔」になります。</p><p>真顔はこちらです。（画像は練習用です）</p>",
    "<p>取引する宇宙人を選ぶには、キーボードの</p><p><b>左←か右→の矢印</b>キーを使います。</p>",
    "<p>宇宙人たちは<b>「毎回かならず」</b></p><p>「好条件の取引（プラス１０円）」をしてくれる<b>わけではありません。</b></p><p>同じにみえて、ときおりプラスマイナス０の取引をします。</p>",
    "<p>宇宙人たちは<b>ある時期、ほかの宇宙人よりも</b></p><p><b>頻繁に好条件の取引をする期間があります。</b></p><p>つまり、その時期を把握すれば、選択することで<b>多くの利益を</b>、</p><p><b>得られます。</b></p>",
    "<p>あなたは今回、「やさしい宇宙群」と「きびしい宇宙群」のうち、「やさしい宇宙群」で取引するので、好条件の取引（＋１０円）を選び、<b>謝礼金を増やすことが目標です。</b></p>",
  ],
  add_aliens: [false, false, false, true, false, false, false, true],
  add_rockets: [false, false, false, false, false, false, false, false],
  add_diamonds: [false, false, false, false, false, true, false, false],
  add_rocks: [false, false, false, false, false, false, true, false],
  aliens: practice_info.aliens,
  on_start: function(trial) {

    // if first loop, include additional messages.
    if (jsPsych.data.get().filter({quiz: 1}).count() == 0) {
      trial.pages.unshift(
        "<p>これから「宇宙人との資源交換取引ゲーム」の<b>説明と体験を開始します。</b></p><p>下のNextボタンを使うか、キーボードの矢印キー<br>を使い、進めてください。</p>",
        "<p>手順は3つの短いパートに分かれています。</p><p>各パートの最後には<b>確認テストがありますので、</b>よくお読みになられてください。</p>",
      )
    }

  }
}

// Define section 1 comprehension check.
const quiz_1 = {
  type: jsPsychTwoStepComprehension,
  prompts: [
    "取引する宇宙人を選択するには、どのキーを使用しますか?",
    "<i>True</i> or <i>False</i>:&nbsp;あなたの目標は、どの宇宙人が好条件の取引（＋１０円）をする時期か判断し、選択することです。",
    "<i>True</i> or <i>False</i>:&nbsp;ある宇宙人は、ある時期において、ほかの宇宙人よりも好条件の取引（＋１０円）を頻繁にします。",
  ],
  options: [
    ["a/dのキー", "1/0のキー", "左←/右→の矢印キー"],
    ["正しい", "違う"],
    ["正しい", "違う"],
  ],
  correct: [
    "左←/右→の矢印キー",
    "正しい",
    "正しい"
  ],
  data: {quiz: 1}
}

const instructions_1a_help_node = {
  timeline: [{
    type: jsPsychTwoStepInstructions,
    pages: [
      "<p>確認テストに全問正解できませんでした。</p><p>もう一度説明文をよくお読みになってください。</p>"
    ],
    add_aliens: [false],
    add_rockets: [false],
    add_diamonds: [false],
    add_rocks: [false],
    aliens: practice_info.aliens,
  }],
  conditional_function: function() {
    if (jsPsych.data.get().filter({quiz: 1}).count() > 0) {
      return true;
    } else {
      return false;
    }
  }
}

var instructions_loop_1a = {
  timeline: [
    instructions_1a_help_node,
    instructions_1a,
    quiz_1,
  ],
  loop_function: function(data) {

    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // Check if instructions should repeat.
    n_loops++;
    if (num_errors > max_errors && n_loops >= max_loops) {
      return false;
    } else if (num_errors > max_errors) {
      return true;
    } else {
      return false;
    }

  }
}

//---------------------------------------//
// Define instructions (section 1b)
//---------------------------------------//

// Define instructions screens.
const instructions_1b_node = {
  timeline: [{
    type: jsPsychTwoStepInstructions,
    pages: [
      "<p>お見事です。実際に宇宙人と取引するには、最初に搭乗ロケットを選択し、到着さきの宇宙人を選択する２段階の選択が必要になりますが、ここでは先に後半部分の宇宙人との取引を体験しましょう。</p><p>次の画面で<b>左/右の矢印キーを使って</b>取引する宇宙人を選択します。</p><p>どの宇宙人が好条件の取引をする可能性が高いか試行してください。</p>",
    　 "<p><b>ヒント:</b>宇宙人はときどき画面にあらわれる<br>左右の位置をかえてきます。左右がかわっても<br>好条件の取引をする確率は変わりません。</p>",
      "<p>各選択の場面において、その都度１０秒以内に矢印キーで決定してください。５回以上の時間切れで打ち切られ、最初からになります。</p>",
    ],
    add_aliens: [false, false],
    add_rockets: [false, false],
    add_diamonds: [false, false],
    add_rocks: [false, false],
    aliens: practice_info.aliens,
    data: {phase: 'instructions_1b'}
  }],
  conditional_function: function() {
    const n_trial = jsPsych.data.get().filter({phase: 'instructions_1b'}).count();
    if (n_trial > 0) {
      return false;
    } else {
      return true;
    }
  }
}

// Initialize practice variables.
const practice_1_outcomes = [[0,1], [1,0], [0,1], [0,1], [0,1], [0,1], [1,1], [0,0], [0,1], [0,1]];
var practice_1_counter = 0;

// Define section 1 practice
const practice_1_node = {
  timeline: [{
    type: jsPsychTwoStepAlienPractice,
    outcomes: [],
    aliens: practice_info.aliens.slice(0,2),
    planet_color: practice_info.planet_colors[0],
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    randomize: false,
    on_start: function(trial) {
      const n_trial = jsPsych.data.get().filter({trial_type: 'alien-practice'}).count() % 10;
      trial.outcomes = practice_1_outcomes[n_trial];
    },
    on_finish: function(data) {
      if (data.state_2_choice == 1) {
        practice_1_counter++;
      } else {
        practice_1_counter = 0;
      }
    }
  }],
  conditional_function: function() {

    // Query number of practice trials so far.
    const n_trial = jsPsych.data.get().filter({trial_type: 'alien-practice'}).count() % 10;

    // If last three trials correct & trial number >=5, end.
    if ( practice_1_counter >= 3 && n_trial >= 5 ) {
      return false;
    } else {
      return true;
    }

  }
}

const practice_1_help_node = {
  timeline: [{
    type: jsPsychTwoStepInstructions,
    pages: [
      "<p>お困りですか。</p><p>覚えておいてください。<b>たいていの場合</b>に好条件の取引をする宇宙人を<br><b>探してみるのです。</b></p>",
      "<p>もう一度やってみましょう。</p><p>次の画面で<b>左/右の矢印キーを使って</b>取引する宇宙人を選択します。どの宇宙人が好条件の取引をする可能性が高いか判断するチャンスが 10 回あります。</p>",
    ],
    show_clickable_nav: true,
    button_label_previous: "Prev",
    button_label_next: "Next",
  }],
  conditional_function: function() {
    if ( practice_1_counter >= 3 ) {
      return false;
    } else {
      return true;
    }
  }
}

// Practice block (section 1b)
const instructions_loop_1b = {
  timeline: [
    instructions_1b_node, practice_1_node, practice_1_node, practice_1_node,
    practice_1_node, practice_1_node, practice_1_node, practice_1_node,
    practice_1_node, practice_1_node, practice_1_node, practice_1_help_node
  ],
  loop_function: function(data) {
    if ( practice_1_counter >= 3 ) {
      return false;
    } else {
      return true;
    }
  }
}

//---------------------------------------//
// Define instructions (section 2a)
//---------------------------------------//
// The purpose of this section is to introduce the “rocket ships” mechanic.
// The key pieces of information to communicate are:
//   - The two rocket ships
//   - Each rocket has one planet it is most likely to go to
//   - Probabilistic nature of transitions
//   - Keyboard keys for making choices

const instructions_2a = {
  type: jsPsychTwoStepInstructions,
  pages: [
    "<p>次に、惑星への訪問を体験します。取引全体の前半と後半の２段階の選択のうち、さきほどの宇宙人との取引は後半部分でした。</p>",
    `<p>ここからは、前半部分の選択である、惑星を訪問するロケット選びも含めた、通しでの体験です。</p><p>以下に、選択できるロケットの例を2つ示します:<br>the <b><font color='${practice_info.font_colors[0]}'>${practice_info.rocket_names[0]}</font></b> and <b><font color='${practice_info.font_colors[1]}'>${practice_info.rocket_names[1]}</font></b> rocket ships.</p>`,
    `<p>各ロケットは「たいてい」は、到着する惑星がきまっています。</p><p>このロケットならば、あの宇宙人と出会える、と「たいてい」わかっているのです。</p>`,
    "<p>もし特定の惑星、特定の宇宙人と出会いたいなら, そこへ連れていって<br>くれる可能性が最も高い色のロケット船を選ぶ必要があります。</p>",
    "<p>訪問するロケットを選択するには、キーボードの</p><p><b>矢印の左←か右→の方向キーを</b>使用します。</p>",
  ],
  add_aliens: [false, false, false, false, false, false],
  add_rockets: [false, false, true, true, true, true],
  add_diamonds: [false, false, false, false, false, false],
  add_rocks: [false, false, false, false, false, false],
  rocket_colors: practice_info.rocket_colors,
  aliens: practice_info.aliens,
  on_start: function(trial) {

    // if first loop, include additional messages.
    if (jsPsych.data.get().filter({quiz: 2}).count() == 0) {
      trial.pages.unshift(
        "<p>いかがですか。どの宇宙人が好条件の取引をしてくれる可能性が高いか、わかったのではないでしょうか？</p>"
      )
    }

  }
}

// Define section 1 comprehension check.
const quiz_2 = {
  type: jsPsychTwoStepComprehension,
  prompts: [
    "惑星をめぐるロケットを選ぶには、どのキーを使いますか？",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;ロケットはいつでも、同じ惑星へ到着する。",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;それぞれのロケットは「たいてい」はきまった惑星に到着する。",
  ],
  options: [
    ["aとdのキー", "1と0のキー", "左←と右→ の矢印キー"],
    ["正しい", "違う"],
    ["正しい", "違う"],
  ],
  correct: [
    "左←と右→ の矢印キー",
    "違う",
    "正しい"
  ],
  data: {quiz: 2}
}

const instructions_2a_help_node = {
  timeline: [{
    type: jsPsychTwoStepInstructions,
    pages: [
      "<p>確認テストに全問正解できませんでした。</p><p>以下もう一度、よく確認してください。</p>"
    ],
    add_aliens: [false],
    add_rockets: [false],
    add_diamonds: [false],
    add_rocks: [false],
    aliens: practice_info.aliens,
  }],
  conditional_function: function() {
    if (jsPsych.data.get().filter({quiz: 2}).count() > 0) {
      return true;
    } else {
      return false;
    }
  }
}

var instructions_loop_2a = {
  timeline: [
    instructions_2a_help_node,
    instructions_2a,
    quiz_2,
  ],
  loop_function: function(data) {

    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // Check if instructions should repeat.
    n_loops++;
    if (num_errors > max_errors && n_loops >= max_loops) {
      return false;
    } else if (num_errors > max_errors) {
      return true;
    } else {
      return false;
    }

  }
}

//---------------------------------------//
// Define instructions (section 2b)
//---------------------------------------//

const instructions_2b = {
  type: jsPsychTwoStepInstructions,
  pages: [
    "<p>それでは、ゲーム全体を10ターン練習してみましょう。</p><p>次の画面で、キーボードの<b>左←/右→矢印キー</b>をつかってロケットを選択します。 次に、惑星に到着したら、もう一度左←/右→矢印キーを使用して宇宙人を選択します。</p>",
    "<p>覚えておいてください。ロケットは「たいてい」きまった星に到着しますが、</p><p>ときどき他の惑星に連れていきます。</p>",
    "<p><b>ご注意を:</b>ロケットの表示位置は、ときどき左側と右側に<br>いれかわります。ただ、同じロケットならば、左側にあっても<br>右側にあっても、目的地の惑星への確率は変わりません。</p>"
  ],
  add_aliens: [false, false, false],
  add_rockets: [true, true, true],
  add_diamonds: [false, false, false],
  add_rocks: [false, false, false],
  rocket_colors: practice_info.rocket_colors,
  aliens: practice_info.aliens
}

// Define section 2 practice
const practice_2 = {
  timeline: [{
    type: jsPsychTwoStepTrial,
    transition: 1,
    outcomes: [],
    rocket_colors: practice_info.rocket_colors,
    planet_colors: practice_info.planet_colors,
    aliens: practice_info.aliens,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    randomize_s1: randomize_s1,
    randomize_s2: randomize_s2,
    data: {trial: 0},
    on_start: function(trial) {

      // define transition
      trial.transition = (Math.random() < 0.8) ? 1 : 0;

      // define outcomes
      trial.outcomes = [
        (Math.random() < 0.85) ? 1 : 0,
        (Math.random() < 0.15) ? 1 : 0,
        (Math.random() < 0.15) ? 1 : 0,
        (Math.random() < 0.85) ? 1 : 0,
      ]

    },
    on_finish: function(data) {

      if ( data.state_1_choice == null || data.state_2_choice == null ) {
        data.missing = true;
      } else {
        data.missing = false;
      }

    }
  }],
  repetitions: 10,
  loop_function: function(data) {
    return data.values()[0].missing;
  }
}

// Practice block (section 2b)
const instructions_loop_2b = {
  timeline: [
    instructions_2b,
    practice_2
  ]
}

//---------------------------------------//
// Define instructions (section 3)
//---------------------------------------//
// The purpose of this section is to make clear important aspects of the task mechanics.
// The key pieces of information to communicate are:
//   - Independence of drifts: how likely an alien is to give treasure is independent
//     of all other aliens
//   - Autocorrelation of drifts: a rewarding alien likely to stay rewarding
//   - State transitions: reminder that each rocket ship has a planet it is most likely
//     to end up at, and that a participant should remember this information to get to
//     the desired planet

const instructions_3a = {
  type: jsPsychTwoStepInstructions,
  pages: [
    "<p>ゲーム終了時に「結果」は精算され、</p><p>実際の謝礼金に反映されます。</p>",
    "<p>あなたの目的はいつ（時間の経過とともに）、どの宇宙人が「好条件の取引」をするか注意してみつけ、選択することです。</p>",
    "できる限り<b>好条件の取引</b>をめざし<b>（プラス１０円）</b>選択してください。<b>以下が３つの攻略手がかりです。</b></p><p>注意してお読みください。</p>",
    "<p><b>Hint #1:</b>宇宙人が「好条件の取引」をしてくれる確率は時間の経過とともに変化しますが、この変化はゆっくりです。そのため、どの宇宙人が、好条件の取引をしているか覚えておく必要があります。今あなたに好条件の取引をする宇宙人は、しばらく続ける可能性が高いからです。</p>",
    "<p><b>Hint #2:</b>「好条件の取引」になるかどうかは、取引する宇宙人にのみ依存します。どのロケットがその宇宙人のところに連れてきたか、宇宙人を選ぶ順序、選択しなかった経験（記録）などは影響しません。</p>",
    "<p><b>Hint #3:</b>取引したい宇宙人がいる時は、その宇宙人がいる惑星に<br>連れて行ってくれる可能性が最も高い色のロケットを選んでください。"

  ],
  add_aliens: [false, false, false, false, false, false, false],
  add_rockets: [false, false, false, false, false, false, false],
  add_diamonds: [false, false, false, false, false, false, false],
  add_rocks: [false, false, false, false, false, false, false],
  aliens: practice_info.aliens,
  on_start: function(trial) {

    // if first loop, include additional messages.
    if (jsPsych.data.get().filter({quiz: 3}).count() == 0) {
      trial.pages.unshift(
        "<p>以上で説明と体験は終了です。</p>",
         "<p>本番でも、各選択をその都度１０秒以内に決定してください。時間切れ５回で打ち切られ、最初からになりますのでご留意ください。</p>",
        "<p>利得をえる「やさしい宇宙群」に移動した方は謝礼金の基本は１，１００円です。（増やせるからです）</p>",
        "<p>損失をする「きびしい宇宙群」に移動した方は謝礼金の基本は１，９００円です。（減ってしまうからです）</p>",
        "<p>あなたは今回、「やさしい宇宙群」に運ばれますが、「どちらも同じ程度の金額」が期待されますので、がんばって下さい。</p>",
      )
    }

  }
}

// Define section 1 comprehension check.
const quiz_3 = {
  type: jsPsychTwoStepComprehension,
  prompts: [
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;宇宙人が「好条件の取引」をしてくれる確率は、時間の経過とともに変化する。",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;宇宙人が「好条件の取引」をしてくれる確率は、選択したロケットによって異なる。",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;このゲーム内で変動した「お金」が、プラスの場合もマイナスの場合も、精算されて実際の謝礼金に影響する。",
  ],
  options: [
    ["正しい", "違う"],
    ["正しい", "違う"],
    ["正しい", "違う"],
  ],
  correct: [
    "正しい",
    "違う",
    "正しい"
  ],
  data: {quiz: 3}
}

const instructions_3a_help_node = {
  timeline: [{
    type: jsPsychTwoStepInstructions,
    pages: [
      "<p>テストを全問正解できませんでした。</p><p>以下をよく確認してください。</p>"
    ],
    add_aliens: [false],
    add_rockets: [false],
    add_diamonds: [false],
    add_rocks: [false],
    aliens: practice_info.aliens,
  }],
  conditional_function: function() {
    if (jsPsych.data.get().filter({quiz: 3}).count() > 0) {
      return true;
    } else {
      return false;
    }
  }
}

const instructions_loop_3a = {
  timeline: [
    instructions_3a_help_node,
    instructions_3a,
    quiz_3
  ],
  loop_function: function(data) {

    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // Check if instructions should repeat.
    n_loops++;
    if (num_errors > max_errors && n_loops >= max_loops) {
      return false;
    } else if (num_errors > max_errors) {
      return true;
    } else {
      return false;
    }

  }
}

//---------------------------------------//
// Define instructions timeline
//---------------------------------------//

var INSTRUCTIONS_SKIP = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>これから、「宇宙人との資源交換取引ゲーム」の <b>説明と体験が始まります。</b></p><p>始めるには、キーボードの「１」を押してください。</p>',
  choices: ["1"]
}

var INSTRUCTIONS = {
  timeline: [
    instructions_loop_1a,
    instructions_loop_1b,
    instructions_loop_2a,
    instructions_loop_2b,
    instructions_loop_3a
  ],
  conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(jsPsych.pluginAPI.compareKeys(data.response, '2')){
            return false;
        } else {
            return true;
        }
    }
}
