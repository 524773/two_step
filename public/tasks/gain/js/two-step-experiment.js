//---------------------------------------//
// Define experiment parameters.
//---------------------------------------//

const trans_probs  = [0.7,0.3];         
const trans_bounds = [0.6,0.8];         

const choice_duration = 10000;
const feedback_duration = 1200;

const randomize_s1 = true;            
const randomize_s2 = true;            

var missed_threshold = 6;
var missed_responses = 0;
var hit_sum = 0; // ★ ヒット数をカウントする変数

//---------------------------------------//
// Define stimulus features.
//---------------------------------------//

const planet_colors = ['#5b7c65','#706081','#7f5d5d','#5f6f81'];
const rocket_colors = ['#48a782','#955db9','#a75248','#486ea7'];
const font_colors = ['#398667','#754198','#aa5349','#416598'];
const color_names = ['green','purple','red','blue'];

const mapping = jsPsych.randomization.shuffle([
    jsPsych.randomization.shuffle([0,1]),
    jsPsych.randomization.shuffle([2,3]),
]).flat();

const task_info = {
  planet_colors: mapping.slice(0,2).map(i => planet_colors[i]),
  font_colors: mapping.map(i => font_colors[i]),
  planet_names: mapping.slice(0,2).map(i => color_names[i]),
  rocket_colors: mapping.slice(2,4).map(i => rocket_colors[i]),
  rocket_names: mapping.slice(2,4).map(i => color_names[i]),
  aliens: jsPsych.randomization.shuffle([1,2,3,4]).map((j,i) => {
    return './img/aliens_svg/A'+j+'-'+color_names[mapping[i<2?0:1]]+'.svg'
  })
};

const practice_info = {
  planet_colors: mapping.slice(2,4).map(i => planet_colors[i]),
  font_colors: mapping.map(i => font_colors[i]),
  planet_names: mapping.slice(2,4).map(i => color_names[i]),
  rocket_colors: mapping.slice(0,2).map(i => rocket_colors[i]),
  rocket_names: mapping.slice(0,2).map(i => color_names[i]),
  aliens: jsPsych.randomization.shuffle([1,2,3,4]).map((j,i) => {
    return './img/aliens_svg/P'+j+'-'+color_names[mapping[i<2?2:3]]+'.svg'
  })
};

const preload_images = task_info['aliens'].concat(practice_info['aliens']);

//---------------------------------------//
// Define reward outcomes.
//---------------------------------------//

const drifts = [
  [1,0,1,0],[1,0,1,0],[1,0,1,0],
  [0,1,0,1],[0,1,0,1],[0,1,0,1],
  [0,0,1,1],[0,0,1,1],[0,0,1,1],
  [1,1,1,1]
];

const outcomes = [];
for (let i=0; i<drifts.length; i++) {
  outcomes.push( drifts[i].map(p => Math.random() < p ? 1 : 0) );
}

//---------------------------------------//
// Define transition probabilities.
//---------------------------------------//

while (true) {
  var transitions = jsPsych.randomization.sampleWithReplacement([1,0], drifts.length, trans_probs);
  const avg = transitions.reduce((a,b)=>a+b, 0) / transitions.length;
  if (avg > trans_bounds[0] && avg < trans_bounds[1]) break;
}

//---------------------------------------//
// Define experiment timeline.
//---------------------------------------//

var TWO_STEP_TASK = [];

for (let i=0; i < outcomes.length; i++){

  const trial = {
    type: jsPsychTwoStepTrial,
    transition: transitions[i],
    outcomes:  outcomes[i],
    rocket_colors: task_info.rocket_colors,
    planet_colors: task_info.planet_colors,
    aliens: task_info.aliens,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    randomize_s1: randomize_s1,
    randomize_s2: randomize_s2,
    data: {
      trial: i+1,
      drifts: drifts[i],
      outcomes: outcomes[i] // ★ outcomes を data に追加
    },
    on_finish: function(data) {
      data.browser_interactions = jsPsych.data.getInteractionData().filter({trial: data.trial_index}).count();

      if ( data.state_1_choice == null || data.state_2_choice == null ) {
        data.missing = true;
        missed_responses++;
        if (missed_responses >= missed_threshold) {
          jsPsych.endExperiment();
        }
      } else {
        data.missing = false;

        // outcomesが1のとき、ヒット回数を加算
        if (!data.missing && Array.isArray(data.outcomes) && data.outcomes.length === 4) {
          const s2_index = data.state_2_choice;
          const s2_outcome = data.outcomes[2 + s2_index];
          if (s2_outcome === 1) {
            hit_sum += 1;
          }
        }
        console.log("Trial:", data.trial);
        console.log("S2 choice index:", data.state_2_choice);
        console.log("Outcomes:", data.outcomes);
        console.log("Evaluated outcome:", data.outcomes[2 + data.state_2_choice]);
        console.log("Current hit_sum:", hit_sum);

      }
    }
  }

  const trial_node = {
    timeline: [trial],
    loop_function: function(data) {
      return data.values()[0].missing;
    }
  }

  TWO_STEP_TASK.push(trial_node);
}

//---------------------------------------//
// Define transition screens.
//---------------------------------------//

var READY_0 = {
  type: jsPsychTwoStepInstructions,
  pages: [
    "<p>すばらしい。あなたは練習を終了しました。</p><p>ここから、いよいよ本番です</p>",
    "<p>これから、あなたは新しい惑星に向かい、そこで新しい宇宙人、ロケットに遭遇します。</p><p>しかし、これまでの練習したルール<b>は変わりません。</b>.</p>",
    "では準備はよろしいですか？ これから前半と後半で２回のタスク<b>Block 1/2</b>が始まります。前半８分、後半８分で合計１６分かかります。<br>はじめる準備ができたましたらnextで進んでください。",
  ]
}

var READY_01 = {
  type: jsPsychTwoStepInstructions,
  pages: [
    "<p>ここまでお疲れ様です。こちらは２つの星の１つ。</p>報酬の星です。石はダイヤの原石です。</p><p>発掘すると報酬で１回１０円加算されますので、できるだけ増やしてください。</p>",
    "<p>泥だんごは何ももらえませんが、減りもしません。</p><p>この８０回のパートにおいて、そのルールは変わりません。</b>.</p>",
    "このパートはおよそ８分かかります。 <b>準備ができたら。</b>. nextを押してください。",
  ]
}

var READY_02 = {
  type: jsPsychTwoStepInstructions,
  pages: [
    "ここまでお疲れ様です。こちらは２つの星の１つ。</p>罰則の星です。石はただの石です。</p>",
    "発掘すると、処分費用で１回１０円減額されますので、できるだけ回避してください。",
    "泥だんごは何ももらえまえんが、減りもしません。<b>この８０回のパートにおいて、そのルールは変わりません。</b>このパートはおよそ8分かかります。<br>準備ができたらnextを押してください。",
  ]
}

//---------------------------------------//
// Define end of experiment screens.
//---------------------------------------//

const instructions_04 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return `<p>お疲れ様です！ この星での探索は終了です。</p>
            <p>あなたの報酬の星での結果はプラス <strong>${hit_sum*10}</strong> 円でした。</p>
            <p><b>→キー</b>を押してください。</p>`;
  }
};

var FINISHED = [ instructions_04 ];
