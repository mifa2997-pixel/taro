(function () {
  'use strict';

  /* ===== BACKGROUND ===== */
  function initBackground() {
    var sl = document.getElementById('starsLayer');
    if (!sl) return;
    for (var i = 0; i < 90; i++) {
      var s = document.createElement('div');
      s.className = 't-star';
      var sz = Math.random() * 2 + 1;
      s.style.cssText =
        'width:' + sz + 'px;height:' + sz + 'px;' +
        'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;' +
        '--d:' + (2 + Math.random() * 5) + 's;' +
        '--del:' + (Math.random() * 4) + 's;' +
        '--min:' + (0.05 + Math.random() * 0.2) + ';' +
        '--max:' + (0.5 + Math.random() * 0.5);
      sl.appendChild(s);
    }
    var syms = ['☽','☾','✦','⊕','⋆','✧','△','▽','⊗','☿','♃','♄','☉','☊'];
    var bgs = document.getElementById('bgSyms');
    if (!bgs) return;
    for (var j = 0; j < 20; j++) {
      var d = document.createElement('div');
      d.className = 't-bgsym';
      d.textContent = syms[Math.floor(Math.random() * syms.length)];
      d.style.cssText =
        'left:' + (Math.random() * 95) + '%;' +
        'top:' + (Math.random() * 95) + '%;' +
        '--dur:' + (3 + Math.random() * 3) + 's;' +
        'animation-delay:' + (Math.random() * 3) + 's;' +
        'font-size:' + (30 + Math.random() * 50) + 'px';
      bgs.appendChild(d);
    }
  }

  /* ===== CARD DATA ===== */
  var CARDS = [
    { name:'바보', en:'THE FOOL', icon:'🌟', keywords:['자유','새출발','모험','순수'],
      up:'새로운 여정이 시작됩니다. 두려움 없이 발걸음을 내딛는 용기가 당신에게 있습니다. 예상치 못한 기회가 찾아올 것이니, 마음을 열고 받아들이세요.',
      dn:'무모한 행동이 위험을 초래할 수 있습니다. 충분한 준비 없이 앞으로 나아가지 마세요. 지금은 잠시 멈추어 상황을 냉철히 살필 때입니다.' },
    { name:'마법사', en:'THE MAGICIAN', icon:'🔮', keywords:['의지','창조','기술','집중'],
      up:'당신 안에 놀라운 능력이 잠들어 있습니다. 모든 도구가 손 안에 있으니, 이제 의지를 집중하여 원하는 것을 현실로 만드세요.',
      dn:'재능을 낭비하거나 교활하게 사용하고 있지는 않은지 돌아보세요. 잠재력이 있음에도 행동하지 않으면 기회는 스쳐 지나갑니다.' },
    { name:'여사제', en:'THE HIGH PRIESTESS', icon:'🌙', keywords:['직관','신비','지혜','내면'],
      up:'내면의 소리에 귀를 기울이세요. 이성보다 직관이 더 정확한 길을 가리키고 있습니다. 숨겨진 진실이 서서히 모습을 드러낼 것입니다.',
      dn:'중요한 정보를 놓치고 있거나 직관을 억누르고 있습니다. 비밀이 당신을 괴롭히고 있다면, 이제 마주할 용기를 내세요.' },
    { name:'여황제', en:'THE EMPRESS', icon:'🌹', keywords:['풍요','창조','모성','자연'],
      up:'풍성함과 창조의 에너지가 가득합니다. 사랑, 예술, 자연과의 조화로운 연결이 당신에게 깊은 기쁨을 가져다 줄 것입니다.',
      dn:'과도한 의존이나 소유욕이 문제가 될 수 있습니다. 자신을 돌보는 것을 소홀히 하지 마세요.' },
    { name:'황제', en:'THE EMPEROR', icon:'🏛️', keywords:['권위','질서','안정','리더십'],
      up:'강인한 의지와 체계가 당신에게 힘을 줍니다. 규율과 집중으로 목표를 향해 나아가면 단단한 결과를 얻을 것입니다.',
      dn:'지나친 통제욕이나 완고함이 주변을 멀어지게 합니다. 유연함도 리더십의 일부임을 기억하세요.' },
    { name:'교황', en:'THE HIEROPHANT', icon:'⛪', keywords:['전통','신념','교육','인도'],
      up:'믿을 수 있는 안내자나 전통적 가르침에서 지혜를 찾을 수 있습니다. 공동체와의 연결이 당신을 지탱해 줄 것입니다.',
      dn:'경직된 믿음이나 관습이 당신의 성장을 가로막고 있습니다. 스스로 생각하고 새로운 길을 탐색해 보세요.' },
    { name:'연인', en:'THE LOVERS', icon:'💫', keywords:['선택','사랑','조화','관계'],
      up:'중요한 선택의 기로에 서 있습니다. 마음이 진정으로 원하는 것에 귀 기울이세요. 진실한 연결과 사랑이 다가오고 있습니다.',
      dn:'관계에서의 불화나 가치관의 충돌이 생길 수 있습니다. 성급한 결정보다 깊이 생각하는 시간이 필요합니다.' },
    { name:'전차', en:'THE CHARIOT', icon:'⚡', keywords:['승리','의지','정복','추진력'],
      up:'강한 의지와 집중력으로 어떤 장애물도 돌파할 수 있습니다. 지금이 앞으로 달려나갈 최고의 타이밍입니다.',
      dn:'과도한 통제나 공격성이 역효과를 낼 수 있습니다. 방향을 잃지 않도록 내면의 나침반을 점검하세요.' },
    { name:'힘', en:'STRENGTH', icon:'🦁', keywords:['용기','인내','내면의 힘','극복'],
      up:'온화한 힘으로 어떤 어려움도 이겨낼 수 있습니다. 진정성과 인내로 상황을 변화시키는 당신의 능력은 탁월합니다.',
      dn:'자기 의심이나 두려움이 당신을 가로막고 있습니다. 내면에 잠들어 있는 용기를 깨울 때입니다.' },
    { name:'은둔자', en:'THE HERMIT', icon:'🕯️', keywords:['성찰','지혜','고독','내면탐구'],
      up:'혼자만의 시간이 필요합니다. 고요 속에서 깊은 지혜를 발견할 수 있을 것입니다. 내면의 등불을 따라가세요.',
      dn:'지나친 고립이 외로움과 단절을 낳고 있습니다. 세상과의 연결도 중요한 지혜임을 잊지 마세요.' },
    { name:'운명의 바퀴', en:'WHEEL OF FORTUNE', icon:'☸️', keywords:['변화','운명','전환','순환'],
      up:'운명의 바퀴가 당신에게 유리하게 돌아가고 있습니다. 새로운 국면이 열리고 긍정적인 변화가 찾아올 것입니다.',
      dn:'예상치 못한 변화나 역경이 찾아올 수 있습니다. 변화에 저항하기보다 유연하게 흐름에 몸을 맡기세요.' },
    { name:'정의', en:'JUSTICE', icon:'⚖️', keywords:['균형','진실','공정','책임'],
      up:'공정한 결과가 다가오고 있습니다. 진실과 균형의 힘을 믿으세요. 지나간 행동들이 정당하게 평가받을 것입니다.',
      dn:'불공정한 상황에 처할 수 있습니다. 자신의 행동을 돌아보고, 책임을 외면하지 마세요.' },
    { name:'매달린 사람', en:'THE HANGED MAN', icon:'🔱', keywords:['희생','관점전환','인내','깨달음'],
      up:'멈추고 기다리는 것이 오히려 더 큰 지혜입니다. 다른 시각으로 상황을 바라보면 예상치 못한 해답을 발견할 수 있습니다.',
      dn:'쓸모없는 희생을 하거나 변화를 거부하고 있지는 않은지 살펴보세요. 지금의 정체가 스스로 만든 것일 수 있습니다.' },
    { name:'죽음', en:'DEATH', icon:'🌑', keywords:['변환','끝과 시작','해방','전환'],
      up:'무언가가 끝나고 새로운 것이 시작됩니다. 이 변화를 두려워하지 마세요 — 끝은 동시에 가장 아름다운 시작입니다.',
      dn:'변화를 거부하며 과거에 집착하고 있습니다. 내려놓아야 할 것을 붙들고 있으면 새로운 것이 들어올 수 없습니다.' },
    { name:'절제', en:'TEMPERANCE', icon:'✨', keywords:['균형','조화','인내','치유'],
      up:'균형과 조화가 당신의 삶에 치유를 가져다줍니다. 서두르지 말고 차분하게 나아가면 아름다운 결과가 기다립니다.',
      dn:'과잉이나 불균형이 문제를 일으키고 있습니다. 극단을 피하고 중용의 길을 찾아보세요.' },
    { name:'악마', en:'THE DEVIL', icon:'🗝️', keywords:['속박','집착','물질','해방'],
      up:'지금의 어두운 상황도 당신이 선택했음을 깨달으세요. 그 사슬은 생각보다 느슨합니다 — 벗어날 힘이 당신 안에 있습니다.',
      dn:'물질적 욕망이나 집착이 당신을 얽매고 있습니다. 두려움을 마주하는 것만이 진정한 자유로 가는 길입니다.' },
    { name:'탑', en:'THE TOWER', icon:'⛈️', keywords:['격변','붕괴','각성','전환점'],
      up:'갑작스러운 변화가 충격적으로 느껴지겠지만, 이것은 더 나은 것을 위한 필요한 붕괴입니다. 굳건히 서세요.',
      dn:'재앙적 변화가 올 수 있습니다. 경고 신호를 무시하지 마세요. 지금이라도 대비할 수 있습니다.' },
    { name:'별', en:'THE STAR', icon:'⭐', keywords:['희망','영감','치유','축복'],
      up:'별처럼 빛나는 희망이 당신 앞에 있습니다. 어두웠던 시간은 지나고, 이제 치유와 풍요의 시간이 찾아옵니다.',
      dn:'희망을 잃거나 이상에 집착하고 있습니다. 현실을 직시하면서도 꿈을 포기하지 않는 균형이 필요합니다.' },
    { name:'달', en:'THE MOON', icon:'🌕', keywords:['환상','무의식','불안','신비'],
      up:'무의식의 세계가 메시지를 보내고 있습니다. 꿈과 직관에 주의를 기울이세요. 숨겨진 진실이 서서히 드러날 것입니다.',
      dn:'두려움이나 착각이 판단을 흐리게 합니다. 보이는 것이 전부가 아닙니다 — 더 깊이 들여다봐야 합니다.' },
    { name:'태양', en:'THE SUN', icon:'☀️', keywords:['기쁨','성공','활력','번영'],
      up:'환한 빛이 당신의 앞길을 밝히고 있습니다. 기쁨과 성공, 활력이 넘치는 시간이 찾아옵니다. 그저 존재하는 것만으로도 빛나는 때입니다.',
      dn:'과도한 자만심이나 지나친 낙관이 문제가 될 수 있습니다. 작은 어두움도 인정하며 균형을 찾으세요.' },
    { name:'심판', en:'JUDGEMENT', icon:'📯', keywords:['부활','각성','용서','새출발'],
      up:'내면의 목소리가 당신을 더 높은 곳으로 부르고 있습니다. 과거를 용서하고 놓아주면, 완전히 새로운 삶이 시작됩니다.',
      dn:'자기비판이 지나쳐 자신을 정죄하고 있습니다. 완벽한 사람은 없습니다 — 이제 스스로를 용서할 때입니다.' },
    { name:'세계', en:'THE WORLD', icon:'🌍', keywords:['완성','성취','통합','자유'],
      up:'모든 것이 완성되고 통합됩니다. 오랜 여정의 끝에서 마침내 원하는 것을 이루고 있습니다. 이 순간을 온전히 누리세요.',
      dn:'목표에 거의 다 왔지만 마지막 한 걸음을 두려워하고 있습니다. 완성을 가로막는 것은 외부가 아니라 내면입니다.' }
  ];

  var POSITIONS = [
    { label:'과거', desc:'첫 번째 카드를 고르세요 — 과거' },
    { label:'현재', desc:'두 번째 카드를 고르세요 — 현재' },
    { label:'미래', desc:'세 번째 카드를 고르세요 — 미래' }
  ];

  /* ===== STATE ===== */
  var shuffled = [];
  var pickedCards = [];

  /* ===== CARD BACK SVG ===== */
  function makeCardBackSVG() {
    return '<svg viewBox="0 0 80 128" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
      '<rect width="80" height="128" rx="6" fill="#1e0840" stroke="#b8860b" stroke-width="1.2"/>' +
      '<circle cx="40" cy="64" r="28" fill="none" stroke="#c9a84c" stroke-width="0.8"/>' +
      '<circle cx="40" cy="64" r="20" fill="none" stroke="#b8860b" stroke-width="0.6" stroke-dasharray="3 2"/>' +
      '<polygon points="40,36 52,58 40,56 28,58" fill="none" stroke="#c9a84c" stroke-width="0.8" opacity="0.7"/>' +
      '<polygon points="40,92 52,70 40,72 28,70" fill="none" stroke="#c9a84c" stroke-width="0.8" opacity="0.7"/>' +
      '<circle cx="40" cy="64" r="5" fill="#c9a84c" opacity="0.6"/>' +
      '<circle cx="40" cy="64" r="2.5" fill="#0a0612"/>' +
      '<text x="40" y="22" text-anchor="middle" fill="#c9a84c" font-size="8" opacity="0.5">✦</text>' +
      '<text x="40" y="112" text-anchor="middle" fill="#c9a84c" font-size="8" opacity="0.5">✦</text>' +
      '<text x="12" y="68" text-anchor="middle" fill="#c9a84c" font-size="7" opacity="0.5">☽</text>' +
      '<text x="68" y="68" text-anchor="middle" fill="#c9a84c" font-size="7" opacity="0.5">☾</text>' +
      '</svg>';
  }

  /* ===== PICK STATUS ===== */
  function updatePickStatus() {
    var n = pickedCards.length;
    var dot1 = document.getElementById('dot1');
    var dot2 = document.getElementById('dot2');
    var dot3 = document.getElementById('dot3');
    var label = document.getElementById('pickLabel');
    if (!dot1) return;
    dot1.className = 'pick-dot' + (n >= 1 ? ' filled' : '');
    dot2.className = 'pick-dot' + (n >= 2 ? ' filled' : '');
    dot3.className = 'pick-dot' + (n >= 3 ? ' filled' : '');
    label.textContent = n < 3 ? POSITIONS[n].desc : '카드 세 장이 모두 선택되었습니다 ✦';
  }

  /* ===== BUILD GRID ===== */
  function buildGrid() {
    shuffled = CARDS.slice().sort(function() { return Math.random() - 0.5; }).slice(0, 18);
    pickedCards = [];
    var grid = document.getElementById('cardsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    shuffled.forEach(function(card) {
      var reversed = Math.random() < 0.35;
      var wrap = document.createElement('div');
      wrap.className = 't-card-wrap';

      var frontTransform = reversed
        ? 'transform:rotateY(180deg) rotate(180deg)'
        : 'transform:rotateY(180deg)';

      wrap.innerHTML =
        '<div class="t-card-inner">' +
          '<div class="t-card-face t-card-back">' + makeCardBackSVG() + '</div>' +
          '<div class="t-card-face t-card-front" style="' + frontTransform + '">' +
            '<div class="t-card-icon">' + card.icon + '</div>' +
            '<div class="t-card-name">' + card.name + '</div>' +
            (reversed ? '<div class="t-card-rev">역방향</div>' : '') +
          '</div>' +
        '</div>';

      wrap.addEventListener('click', function() {
        onCardClick(wrap, card, reversed);
      });
      grid.appendChild(wrap);
    });

    updatePickStatus();
  }

  /* ===== CARD CLICK ===== */
  function onCardClick(wrap, card, reversed) {
    if (wrap.classList.contains('t-selected')) return;
    if (pickedCards.length >= 3) return;

    pickedCards.push({ card: card, reversed: reversed });
    var pickNum = pickedCards.length;

    wrap.classList.add('t-selected', 't-flipped');

    var badge = document.createElement('div');
    badge.className = 't-card-badge';
    badge.textContent = pickNum;
    wrap.appendChild(badge);

    updatePickStatus();

    if (pickedCards.length === 3) {
      setTimeout(showResult, 900);
    }
  }

  /* ===== SHOW RESULT ===== */
  function showResult() {
    var container = document.getElementById('threeResults');
    if (!container) return;
    container.innerHTML = '';

    pickedCards.forEach(function(item, i) {
      var card = item.card;
      var reversed = item.reversed;
      var dir = reversed ? '🔄 역방향 (Reversed)' : '✨ 정방향 (Upright)';
      var reading = reversed ? card.dn : card.up;
      var kws = card.keywords.map(function(k) {
        return '<span class="t-kw">' + k + '</span>';
      }).join('');

      var div = document.createElement('div');
      div.className = 't-result-card';
      div.innerHTML =
        '<div class="t-result-position">✦ ' + POSITIONS[i].label + ' ✦</div>' +
        '<span class="t-result-icon" style="' + (reversed ? 'transform:rotate(180deg);' : '') + '">' + card.icon + '</span>' +
        '<div class="t-result-title">' + card.name + '</div>' +
        '<div class="t-result-en">' + card.en + '</div>' +
        '<div class="t-result-dir">' + dir + '</div>' +
        '<hr class="tarot-divider" style="margin:0.6rem auto">' +
        '<div class="t-keywords">' + kws + '</div>' +
        '<hr class="tarot-divider" style="margin:0.6rem auto">' +
        '<div class="t-reading">' + reading + '</div>';
      container.appendChild(div);
    });

    goTo(3);
  }

  /* ===== NAVIGATION ===== */
  function goTo(n) {
    document.querySelectorAll('.tarot-screen').forEach(function(s) {
      s.classList.remove('tarot-active');
    });
    var target = document.getElementById('screen' + n);
    if (!target) return;
    target.classList.add('tarot-active');
    target.style.animation = 'none';
    void target.offsetHeight;
    target.style.animation = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startReading() {
    buildGrid();
    goTo(2);
  }

  /* ===== INIT ===== */
  function init() {
    initBackground();

    var btnStart = document.getElementById('btnStart');
    var btnBack2 = document.getElementById('btnBack2');
    var btnReshuffle = document.getElementById('btnReshuffle');
    var btnAgain = document.getElementById('btnAgain');
    var btnBack3 = document.getElementById('btnBack3');

    if (btnStart)    btnStart.addEventListener('click', startReading);
    if (btnBack2)    btnBack2.addEventListener('click', function() { goTo(1); });
    if (btnReshuffle) btnReshuffle.addEventListener('click', buildGrid);
    if (btnAgain)    btnAgain.addEventListener('click', startReading);
    if (btnBack3)    btnBack3.addEventListener('click', function() { goTo(1); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
