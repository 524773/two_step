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
    "<p>このゲームでは、宝物を探して、さまざまな惑星を訪問します。</p>",
    `<p>各惑星には2人の宇宙人がいます。例えば:</p><p><b><font color='${practice_info.font_colors[2]}'>${practice_info.planet_names[0]}</font></b>宇宙人がいるのは<b><font color='${practice_info.font_colors[2]}'>${practice_info.planet_names[0]}</font></b></p><p><b><font color='${practice_info.font_colors[3]}'>${practice_info.planet_names[1]}</font></b>宇宙人がいるのは<b><font color='${practice_info.font_colors[3]}'>${practice_info.planet_names[1]}</font></b></p>`,
    "<p>惑星を訪れると、取引する宇宙人を選べます。</p><p>宇宙人と取引すると、<b>「あたり」の「石」か</b> or <b>それ以外の「泥だんご」がもらえます。</b>.</p>",
    "<p>「石」は報酬の星では「あたり」が「プラス」になり、</p><p>罰則の星では「あたり」が「マイナス」になります。</p><p>「石」はこちらです。</p>",
    "<p>「泥だんご」は特に「プラス」にも「マイナス」にもなりません。</p><p>「泥だんご」はこちらです。</p>",
    "<p>取引する宇宙人を選ぶには、キーボードの</p><p><b>左←か右→の矢印</b>キーを使います。</p>",
    "<p>宇宙人たちは<b>「毎回かならず」</b>同じように「石」をわたす<b>わけではありません。</b></p><p>同じようにみえて、ときおり「泥だんご」をわたします。</p>",
    "<p>宇宙人たちは<b>ある時期、ほかの宇宙人よりも頻繁に「あたり」をわたす期間があります。</b></p><p>つまり、その時期を把握すれば、<b>多く「あたり」を「得ること」と、逆に「避ける」こともできます</b></p>",
    "<p><b>あなたの目標は、ある時期に最も「あたり」をわたす可能性のある宇宙人を見つけること。つまり、「あたり」がプラスの状況では、彼らとの取引をふやす選択をし、反対に、「あたり」がマイナスの状況では、彼らとの取引を避けることです。</b></p>",
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
        "<p>これから「宇宙探索」ゲームの<b>インストラクションを開始します。</b></p><p>下のボタンを使うか、キーボードの矢印キー<br>を使い、インストラクションを進めてください。</p>",
        "<p>手順は 3 つの短いパートに分かれています。</p><p>各パートの最後には<b>確認テストがありますので、</b>よくお読みになられてください。</p>",
      )
    }

  }
}

// Define section 1 comprehension check.
const quiz_1 = {
  type: jsPsychTwoStepComprehension,
  prompts: [
    "取引する宇宙人を選択するには、どのキーを使用しますか?",
    "<i>True</i> or <i>False</i>:&nbsp;あなたの目標は、どの宇宙人が「宝」をわたす可能性が高いかを判断することです。",
    "<i>True</i> or <i>False</i>:&nbsp;ある宇宙人は、ほかの宇宙人よりも「宝」を頻繁にわたします。",
  ],
  options: [
    ["a/d キー", "1/0 キー", "左/右 矢印キー"],
    ["True", "False"],
    ["True", "False"],
  ],
  correct: [
    "left/right 矢印キー",
    "True",
    "True"
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
      "<p>お見事です。次は宇宙人で練習しましょう。</p><p>次の画面で<b>左/右の矢印キーを使って</b>取引する宇宙人を選択します。どの宇宙人が「あたり」の「石」を渡す可能性が高いか判断するチャンスが 10 回あります。</p>",
      // "<p><b>ヒント:</b>宇宙人はときどき画面にあらわれる<br>位置をかえてきます。位置がかわっても<br>「石」を渡す確率は変わりません。</p>"
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
      "<p>お困りですか。</p><p>覚えておいてください。「たいていの場合」に「あたり」を渡す宇宙人を<br><b>探してみるのです。</b>.</p>",
      "<p>もう一度やってみましょう。</p><p>次の画面で<b>左/右の矢印キーを使って</b>取引する宇宙人を選択します。どの宇宙人が「あたり」の「石」を渡す可能性が高いか判断するチャンスが 10 回あります。</p>",
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
    "<p>次に、宇宙人の惑星へのめぐり方を学びます。</p>",
    `<p>惑星を訪問するには、旅するロケット船を選びます。</p><p>以下に、選択できるロケット船の例を 2 つ示します:<br>the <b><font color='${practice_info.font_colors[0]}'>${practice_info.rocket_names[0]}</font></b> and <b><font color='${practice_info.font_colors[1]}'>${practice_info.rocket_names[1]}</font></b> rocket ships.</p>`,
    `<p>各ロケット船には、「たいていの場合」、到着する惑星がきまっています。</p><p><b><font color='${practice_info.font_colors[0]}'>${practice_info.rocket_names[0]}</font></b>このロケット船ならば、あの宇宙人と出会える、と「たいていは」わかっているのです。</p><p>この <b><font color='${practice_info.font_colors[1]}'>${practice_info.rocket_names[1]}</font></b>もしくは、あるロケット船は「たいていの場合」、別の惑星の宇宙人のところへ行くのです。</p>`,
    "<p>もし特定の惑星、特定の宇宙人と出会いたいなら, そこへ連れていって<br>くれる可能性が最も高いロケット船を選ぶ必要があります。</p>",
    "<p>旅行するロケット船を選択するには、キーボードの</p><p><b>矢印の左←か右→の方向キーを</b>使用します。</p>",
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
        "<p>お疲れ様です！どの宇宙人が「あたり」をくれる可能性が高いか、わかったのではないでしょうか（毎回くれるとは限らないかもしれませんが）</p>"
      )
    }

  }
}

// Define section 1 comprehension check.
const quiz_2 = {
  type: jsPsychTwoStepComprehension,
  prompts: [
    "惑星をめぐるロケット船を選ぶために、どのキーを使って選択しますか？",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;ロケット船はいつでも、同じ惑星へ到着する。",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;それぞれのロケット船は「たいてい」はきまった惑星に到着する。",
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
    "<p>それでは、ゲーム全体を10ターン練習してみましょう。</p><p>次の画面で、キーボードの<b>左←/右→矢印キー</b>をつかってロケット船を選択します。 次に、惑星に到着したら、もう一度左←/右→矢印キーを使用して宇宙人を選択します。</p>",
    "<p><b>覚えておいてください:</b> ロケット船は「たいていは」きまった星に到着しますが、</p><p>ときどき他の惑星に連れていきます。</p>",
    "<p><b>ご注意を:</b> ロケット船の表示位置は、ときどき左側と右側に<br>いれかわります。ただ、同じロケット船ならば、左側にあっても<br>右側にあっても、目的地の惑星への確率は変わりません。</p>"
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
    "<p>ゲーム終了時に、「結果」の合計が、</p><p>実際の謝礼金に反映されます。 <b>（基本の謝礼金の下限は下回りません）</b></p>",
    "<p>あなたの目的はいつ（時間の経過とともに）、どの宇宙人が「あたり」を渡してくるか注意して見つけることです。</p>",
    "「報酬の宇宙群」ではできる限り多くの「あたり」（プラス１０円）をあつめ、「罰則の宇宙群」では「あたり」（マイナス１０円）を回避するために、<b>以下に３つの手がかりがあります。</b></p><p>どうか、注意してお読みになってください。</p>",
    "<p><b>Hint #1:</b>宇宙人が「あたり」をわたす可能性は時間の経過とともに変化しますが、この変化はゆっくりです。そのため、どの宇宙人があなたに「あたり」を渡しているかを覚えておく必要があります。今あなたに「あたり」を渡している宇宙人は、しばらくあなたに「あたり」を渡し続ける可能性が高いからです。</p>",
    "<p><b>Hint #2:</b>「あたり」になるかどうかは、取引する宇宙人にのみ依存します。どのロケット船がその宇宙人のところに連れてきたか、宇宙人を選ぶ順序、または取引しないことを選択した宇宙人などは影響しません。</p>",
    "<p><b>Hint #3:</b>取引したい宇宙人がいる場合は、その宇宙人がいる惑星に<br>連れて行ってくれる可能性が最も高いロケット船を選ぶことを忘れないでください。"

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
        "<p>やりました! 我々は、もうほとんどのインストラクションを終えました。</p><p>本番のゲームが始まる前に、 ここで最後の要点です。</p>",
      )
    }

  }
}

// Define section 1 comprehension check.
const quiz_3 = {
  type: jsPsychTwoStepComprehension,
  prompts: [
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;宇宙人が「あたり」を渡す可能性は、時間の経過とともにゆっくりと変化します。",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;宇宙人が「あたり」を渡す確率は、選択したロケット船によって異なってくる。",
    "<i>True</i> or <i>False</i>:&nbsp;&nbsp;このゲーム内で獲得した「あたり」が、プラスの場合もマイナスの場合も、精算されて実際の謝礼金に影響する。",
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
  stimulus: '<p>これから、「２段階タスク」ゲームの <b>説明とインストラクションが始まります。</b></p><p>インストラクションを始めるには, キーボードの「１」を押してください。</p>',
  choices: ["1","2"]
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
