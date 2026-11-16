/* script.js — কুইজের লজিক। প্রশ্ন বদলাতে চাইলে questions.js ফাইল বদলাও, এই ফাইল নয়। */
const $ = id => document.getElementById(id);
const bn = v => String(v).replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[Number(d)]);
const letter = i => String.fromCharCode(65 + i);
const pad2 = n => String(n).padStart(2, '0');
const formatTime = s => `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;

const TOTAL = questions.length;
const TIME_LIMIT = QUIZ.minutes * 60;
const STORAGE_KEY = `hm_quiz_attempts_${QUIZ.id}`;

let current = [], submitted = false, timerInterval = null, startedAt = 0, deadline = 0, attempt = 1;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function getAttempts() { try { return Number(localStorage.getItem(STORAGE_KEY) || 0); } catch (e) { return 0; } }
function saveAttempts(v) { try { localStorage.setItem(STORAGE_KEY, String(v)); } catch (e) {} }

function setup() {
  document.querySelectorAll('.js-min').forEach(el => el.textContent = bn(QUIZ.minutes));
  $('info').innerHTML = [
    `Quiz: ${QUIZ.no}`, `Topic: ${QUIZ.topic}`, `Level: ${QUIZ.level}`,
    `Total Marks: ${TOTAL}`, `Time: ${QUIZ.minutes} min`
  ].map(t => `<div>${t}</div>`).join('');
}

function buildQuestions() {
  current = shuffle(questions).map(item => {
    const order = shuffle(item.options.map((_, i) => i));
    return { question: item.question, options: order.map(i => item.options[i]), answer: order.indexOf(item.answer), explanation: item.explanation || '' };
  });
}

function renderQuestions() {
  const box = $('questions');
  box.innerHTML = '';
  current.forEach((item, index) => {
    const sec = document.createElement('section');
    sec.className = 'question';
    sec.id = `question-${index}`;
    const h = document.createElement('h3');
    h.textContent = `${bn(index + 1)}. ${item.question}`;
    sec.appendChild(h);
    item.options.forEach((opt, oi) => {
      const label = document.createElement('label');
      label.className = 'option';
      const input = document.createElement('input');
      input.type = 'radio'; input.name = `q${index}`; input.value = oi;
      input.addEventListener('change', () => {
        sec.querySelectorAll('.option').forEach(l => l.classList.toggle('sel', l.contains(input) && input.checked));
        updateProgress();
      });
      const c = document.createElement('span'); c.className = 'c'; c.textContent = letter(oi);
      const t = document.createElement('span'); t.textContent = opt;
      label.append(input, c, t);
      sec.appendChild(label);
    });
    box.appendChild(sec);
  });
}

function updateProgress() {
  if (submitted) return;
  const answered = current.filter((_, i) => document.querySelector(`input[name="q${i}"]:checked`)).length;
  $('progressText').textContent = `${bn(answered)} / ${bn(TOTAL)}`;
  $('progressBar').style.width = `${answered / TOTAL * 100}%`;
}

function startTimer() {
  clearInterval(timerInterval);
  startedAt = Date.now();
  deadline = startedAt + TIME_LIMIT * 1000;
  $('countdown').textContent = formatTime(TIME_LIMIT);
  $('countdown').classList.remove('time-warning');
  timerInterval = setInterval(() => {
    const rem = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    $('countdown').textContent = formatTime(rem);
    $('countdown').classList.toggle('time-warning', rem <= 60);
    if (rem <= 0) submitQuiz(true);
  }, 250);
}

function beginAttempt() {
  submitted = false;
  $('result').classList.add('hidden');
  $('result').innerHTML = '';
  $('submitBtn').disabled = false;
  attempt = getAttempts() + 1;
  saveAttempts(attempt);
  $('attemptNumber').textContent = pad2(attempt);
  buildQuestions();
  renderQuestions();
  updateProgress();
  startTimer();
}

function submitQuiz(auto = false) {
  if (submitted) return;
  submitted = true;
  clearInterval(timerInterval);
  const elapsed = Math.min(TIME_LIMIT, Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
  let score = 0, answered = 0;

  current.forEach((item, index) => {
    const picked = document.querySelector(`input[name="q${index}"]:checked`);
    const sel = picked ? Number(picked.value) : -1;
    if (picked) answered++;
    const sec = $(`question-${index}`);
    sec.querySelectorAll('input').forEach(i => i.disabled = true);
    const labels = sec.querySelectorAll('.option');
    labels[item.answer].classList.add('correct');
    const fb = document.createElement('p');
    const right = `${letter(item.answer)}. ${item.options[item.answer]}`;
    if (sel === item.answer) {
      score++; fb.className = 'question-feedback right-text'; fb.textContent = '✓ সঠিক উত্তর';
    } else {
      if (sel >= 0) labels[sel].classList.add('wrong');
      fb.className = 'question-feedback wrong-text';
      fb.textContent = sel < 0 ? `উত্তর দেওয়া হয়নি। সঠিক উত্তর: ${right}` : `✗ ভুল উত্তর। সঠিক উত্তর: ${right}`;
    }
    sec.appendChild(fb);
    if (sel !== item.answer && item.explanation) {
      const ex = document.createElement('p');
      ex.className = 'explain';
      ex.innerHTML = '<b>ব্যাখ্যা:</b> ';
      ex.appendChild(document.createTextNode(item.explanation));
      sec.appendChild(ex);
    }
  });

  $('progressText').textContent = `${bn(TOTAL)} / ${bn(TOTAL)}`;
  $('progressBar').style.width = '100%';
  $('submitBtn').disabled = true;

  const pct = Math.round(score / TOTAL * 100);
  const msg = pct === 100 ? 'অসাধারণ! তুমি Champion!' : pct >= 90 ? 'অসাধারণ! খুব ভালো হয়েছে।' : pct >= 70 ? 'ভালো হয়েছে! আরও অনুশীলন করো।' : pct >= 50 ? 'মোটামুটি। নিয়মগুলো আবার পড়ো।' : 'আরও অনুশীলন প্রয়োজন।';
  const full = score === TOTAL;
  const d = new Date();
  const dateText = `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
  const champ = `Champion: ${TOTAL}/${TOTAL}`;
  const certText = `${QUIZ.title} (${QUIZ.level}) তে ${bn(TOTAL)}/${bn(TOTAL)} নম্বর পেয়ে Champion হওয়ায়`;

  $('result').classList.remove('hidden');
  $('result').innerHTML = `
    <div class="score">
      <div class="big">${bn(score)} / ${bn(TOTAL)}</div>
      <div>তোমার প্রাপ্ত নম্বর</div>
      <div style="margin-top:6px">${bn(pct)}% — ${msg}</div>
      ${full ? '<div class="badge">🏆 Champion!</div>' : ''}
    </div>
    <div class="stats">
      <p><strong>সময় লেগেছে:</strong> ${bn(Math.floor(elapsed / 60))} মিনিট ${bn(elapsed % 60)} সেকেন্ড</p>
      <p><strong>Attempt Number:</strong> ${bn(attempt)}তম বার</p>
      <p><strong>উত্তর দিয়েছ:</strong> ${bn(answered)}টি</p>
      <p><strong>সঠিক উত্তর:</strong> ${bn(score)}টি</p>
      <p><strong>ভুল/অনুত্তরিত:</strong> ${bn(TOTAL - score)}টি</p>
      ${auto ? '<p class="auto-note">সময় শেষ হওয়ায় Quiz স্বয়ংক্রিয়ভাবে Submit হয়েছে।</p>' : ''}
    </div>
    ${full ? `
    <div class="nin"><div style="margin-bottom:6px">সার্টিফিকেটের জন্য নাম লেখো</div>
      <input id="nameInput" placeholder="তোমার নাম"></div>
    <div class="cert"><div class="o"><div class="m"><div class="i">
      <div class="t"><b>Mosarraf Hossain Sir</b><span>Online Quiz World</span></div><div class="g"></div>
      <div class="b">
        <div style="font-size:12px;letter-spacing:2px;color:#8a5f00">CERTIFICATE OF ACHIEVEMENT</div>
        <div class="ch">${champ}</div>
        <div>${certText}</div>
        <div><span class="nm" id="certName">তোমার নাম</span></div>
        <div>কে এই সনদ প্রদান করা হলো।</div>
      </div>
      <div class="f"><div><b>${dateText}</b><u>Date</u></div><div><b>M Hossain Sir</b><u>Signature</u></div></div>
    </div></div></div></div>
    <button type="button" class="btn dl" id="dlBtn">ডাউনলোড সার্টিফিকেট</button>
    <div class="dl-msg" id="dlMsg"></div>` : `<p class="result-message">আবার চেষ্টা করো এবং ${bn(TOTAL)}/${bn(TOTAL)} অর্জন করো!</p>`}`;

  if (full) {
    $('nameInput').addEventListener('input', e => { $('certName').textContent = e.target.value.trim() || 'তোমার নাম'; $('dlMsg').textContent = ''; });
    $('dlBtn').addEventListener('click', () => downloadCertificate($('nameInput').value.trim(), champ, certText, dateText));
    confetti();
  }
  $('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function downloadCertificate(name, champ, certText, dateText) {
  if (!name) { $('dlMsg').textContent = 'আগে তোমার নাম লেখো'; return; }
  const draw = () => {
    const c = document.createElement('canvas'); c.width = 1000; c.height = 700;
    const x = c.getContext('2d'), F = "'Noto Sans Bengali',sans-serif";
    x.textAlign = 'center';
    const pill = (a, b, w, h, fill, stroke) => {
      x.beginPath();
      if (x.roundRect) x.roundRect(a, b, w, h, h / 2); else x.rect(a, b, w, h);
      x.fillStyle = fill; x.fill();
      if (stroke) { x.strokeStyle = stroke; x.lineWidth = 4; x.stroke(); }
    };
    x.fillStyle = '#0a1f7a'; x.fillRect(0, 0, 1000, 700);
    x.fillStyle = '#fffaf0'; x.fillRect(20, 20, 960, 660);
    x.strokeStyle = '#c99a1a'; x.lineWidth = 6; x.strokeRect(30, 30, 940, 640);
    x.fillStyle = '#0a1f7a'; x.fillRect(36, 36, 928, 170);
    x.fillStyle = '#c99a1a'; x.fillRect(36, 206, 928, 8);
    x.fillStyle = '#fff'; x.font = '700 54px ' + F; x.fillText('Mosarraf Hossain Sir', 500, 110);
    pill(350, 128, 300, 56, '#ffd54a');
    x.fillStyle = '#2a0b3a'; x.font = '600 30px ' + F; x.fillText('Online Quiz World', 500, 168);
    x.fillStyle = '#8a5f00'; x.font = '500 26px ' + F; x.fillText('CERTIFICATE OF ACHIEVEMENT', 500, 262);
    pill(320, 284, 360, 66, '#0a1f7a', '#ffd54a');
    x.fillStyle = '#ffe83d'; x.font = '700 36px ' + F; x.fillText(champ, 500, 330);
    x.fillStyle = '#4a3300'; x.font = '400 26px ' + F; x.fillText(certText, 500, 405);
    x.fillStyle = '#0a1f7a'; x.font = '700 48px ' + F; x.fillText(name, 500, 478);
    const w = x.measureText(name).width;
    x.fillStyle = '#c99a1a'; x.fillRect(500 - w / 2 - 12, 492, w + 24, 3);
    x.fillStyle = '#4a3300'; x.font = '400 28px ' + F; x.fillText('কে এই সনদ প্রদান করা হলো।', 500, 545);
    x.fillStyle = '#0a1f7a'; x.font = '600 30px ' + F;
    x.fillText(dateText, 230, 610); x.fillText('M Hossain Sir', 770, 610);
    x.fillStyle = '#c99a1a'; x.fillRect(120, 620, 220, 2); x.fillRect(660, 620, 220, 2);
    x.fillStyle = '#4a3300'; x.font = '400 24px ' + F; x.fillText('Date', 230, 652); x.fillText('Signature', 770, 652);
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `certificate-${QUIZ.id}.png`;
    document.body.appendChild(a); a.click(); a.remove();
  };
  if (document.fonts && document.fonts.load) document.fonts.load("700 40px 'Noto Sans Bengali'").then(draw, draw); else draw();
}

function confetti() {
  const c = $('fx'), x = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const cols = ['#ffd54a', '#ff4f8b', '#12c2a5', '#1e90ff', '#7b2ff7', '#ff9f43'];
  const P = Array.from({ length: 140 }, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height * .6,
    s: 5 + Math.random() * 7, v: 2 + Math.random() * 4, d: Math.random() * 2 - 1, c: cols[Math.random() * 6 | 0]
  }));
  let f = 0;
  (function frame() {
    x.clearRect(0, 0, c.width, c.height);
    P.forEach(p => { p.y += p.v; p.x += p.d; x.fillStyle = p.c; x.fillRect(p.x, p.y, p.s, p.s * .6); });
    if (++f < 260) requestAnimationFrame(frame); else x.clearRect(0, 0, c.width, c.height);
  })();
}

$('quizForm').addEventListener('submit', e => { e.preventDefault(); submitQuiz(false); });
$('resetBtn').addEventListener('click', () => { beginAttempt(); $('info').scrollIntoView({ behavior: 'smooth' }); });
$('startBtn').addEventListener('click', () => {
  $('startBtn').classList.add('hidden');
  $('after').classList.remove('hidden');
  beginAttempt();
  $('info').scrollIntoView({ behavior: 'smooth' });
});

setup();
