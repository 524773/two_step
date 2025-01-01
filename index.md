layout: default
---

<hr>

## あなたの生年月日を入力してください

<form id="dob-form">
  <label for="dob-year">年</label>
  <input type="number" id="dob-year" name="dob-year" placeholder="YYYY" required min="1900" max="2099">
  
  <label for="dob-month">月</label>
  <input type="number" id="dob-month" name="dob-month" placeholder="MM" required min="1" max="12">
  
  <label for="dob-day">日</label>
  <input type="number" id="dob-day" name="dob-day" placeholder="DD" required min="1" max="31">
  
  <p id="dob-error" style="color: red; display: none;">生年月日を正しく入力してください。</p>
  
  <button type="submit">実験を開始</button>
</form>

<!-- 実験ページへのリンク -->
<div id="experiment-link-container" style="display: none;">
  <a href="./tasks/two-step/experiment.html" id="experiment-link">Two-step taskを開始する</a>
</div>

<hr>

<script>
  // 生年月日フォームの送信イベント
  document.getElementById('dob-form').addEventListener('submit', function(event) {
    event.preventDefault(); // フォーム送信を一時的に防止

    // 生年月日の入力値を取得
    const year = parseInt(document.getElementById('dob-year').value);
    const month = parseInt(document.getElementById('dob-month').value);
    const day = parseInt(document.getElementById('dob-day').value);

    // バリデーション
    const isValidDate = validateDate(year, month, day);
    const errorMessage = document.getElementById('dob-error');
    const experimentLinkContainer = document.getElementById('experiment-link-container');

    if (isValidDate) {
      errorMessage.style.display = 'none'; // エラーメッセージを非表示
      // 有効な日付の場合、実験ページへのリンクを表示
      experimentLinkContainer.style.display = 'block';
      // 実験リンクに生年月日をURLパラメータとして追加
      document.getElementById('experiment-link').href = './tasks/two-step/experiment.html?dob=' + year + '-' + month + '-' + day;
    } else {
      errorMessage.style.display = 'block'; // エラーメッセージを表示
      experimentLinkContainer.style.display = 'none'; // 実験リンクを非表示
    }
  });

  // 日付が正しいかどうかをチェックする関数
  function validateDate(year, month, day) {
    if (month < 1 || month > 12) return false;
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
  }
</script>
