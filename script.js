const yes = document.getElementById("yes");
const no = document.getElementById("no");
const message = document.getElementById("message");
const celebrate = document.getElementById("celebrate");
const doompic = document.getElementById("doompic");
const sad = document.getElementById("sad");
const music = document.getElementById("music");
const msgHome = message.parentNode;
const msgNext = message.nextSibling;

let caught = 0;
let accepted = false;
let declined = false;

const noMessages = [
  "Agi Daw na sayop rakag tulpok!",
  "Taysa, sure najud ka vabs? 🤨",
  "Sige na baaa~... 👀",
  "Gi edit baya nako og flowers ang kinumo ni Doom.💐",
  "Kana nalang kuan ay kanaaaang, Ano g?! hihi",
  "What if i close nalang ni tibway kung sig valivad? agi daw",
  "Awa nagtika Dako na hinuon ang 'Ano g?!'. TULPOKA NALANG GAD! 😭",
  "VAYOOOOOOOOT :<",
  "Okay, Edi don't balakajan",
  "Bitaw.... :>",
  "Please :<",
  ":< :< :< :<",
  "JEBBAAAAALLL",
  "Sure?",
  "FR FR? :<",
  "Sure najud? :<",
  "Promise nana?",
  "Sige nalang oips",
];

yes.addEventListener("click", function () {
  accepted = true;
  no.style.left = "";
  no.style.top = "";
  yes.style.transform = "none";

  message.classList.remove("floating");
  message.style.left = "";
  message.style.top = "";
  msgHome.insertBefore(message, msgNext);
  message.textContent = "YIPPIIEE IMO NA GI TULPOK WANAY BAWIAY~!";

  sad.classList.add("hidden");
  doompic.classList.add("hidden");
  celebrate.classList.remove("hidden");

  launchConfetti();
});

no.addEventListener("click", function () {
  declined = true;

  no.style.left = "";
  no.style.top = "";
  yes.style.transform = "none";

  message.classList.remove("floating");
  message.style.left = "";
  message.style.top = "";
  msgHome.insertBefore(message, msgNext);
  message.textContent = "Okay.... sige.... Bye tootoot ka oips! :<";

  celebrate.classList.add("hidden");
  doompic.classList.add("hidden");
  sad.classList.remove("hidden");
});

let lastRun = 0;
function runAway(event) {
  if (accepted || declined) return;
  if (caught >= 40) return;

  const now = Date.now();
  if (now - lastRun < 120) return;
  lastRun = now;

  if (event && event.cancelable) event.preventDefault();
  caught++;

  const t = Math.min(caught / 40, 1);
  const yesRect = yes.getBoundingClientRect();
  const cx = yesRect.left + yesRect.width / 2;
  const cy = yesRect.top + yesRect.height / 2;
  const needed = Math.max(
    (2 * Math.max(cx, window.innerWidth - cx)) / yes.offsetWidth,
    (2 * Math.max(cy, window.innerHeight - cy)) / yes.offsetHeight
  ) * 0.95;
  const scale = 1 + (needed - 1) * t;
  yes.style.transform = "scale(" + scale + ")";

  celebrate.classList.add("hidden");
  sad.classList.add("hidden");
  doompic.classList.remove("hidden");

  const card = letter.getBoundingClientRect();
  const yesBox = yes.getBoundingClientRect();
  const noBox = no.getBoundingClientRect();
  const w = noBox.width;
  const h = noBox.height;

  const baseLeft = noBox.left - (parseFloat(no.style.left) || 0);
  const baseTop = noBox.top - (parseFloat(no.style.top) || 0);

  for (let i = 0; i < 30; i++) {
    const left = card.left + 20 + Math.random() * (card.width - w - 40);
    const top = baseTop + Math.random() * 80 - 30;

    const touchesYes =
      left < yesBox.right + 10 &&
      left + w > yesBox.left - 10 &&
      top < yesBox.bottom + 10 &&
      top + h > yesBox.top - 10;

      if (!touchesYes || caught >= 8) {
      no.style.left = left - baseLeft + "px";
      no.style.top = top - baseTop + "px";
      break;
    }
  }

    message.textContent =
    noMessages[Math.min(caught - 1, noMessages.length - 1)];

  document.body.appendChild(message);
  message.classList.remove("floating");
  void message.offsetWidth;
  message.classList.add("floating");
  message.style.left = "50vw";
  message.style.top = "50vh";
}

document.addEventListener("mousemove", function (e) {
  if (letter.classList.contains("hidden")) return;
  const b = no.getBoundingClientRect();
  const dx = Math.max(b.left - e.clientX, 0, e.clientX - b.right);
  const dy = Math.max(b.top - e.clientY, 0, e.clientY - b.bottom);
  if (Math.sqrt(dx * dx + dy * dy) < 80) runAway(e);
});
no.addEventListener("touchstart", runAway, { passive: false });
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

envelope.addEventListener("click", function () {
  envelope.classList.add("hidden");
  letter.classList.remove("hidden");

  music.volume = 0.5;
  music.play();
  musicBtn.classList.remove("hidden");
});
function launchConfetti() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const colors = ["#00643D", "#08BF7C", "#9FA9B2", "#ffffff"];
  const pieces = [];

  for (let i = 0; i < 180; i++) {
    const side = i % 3;
    let x, y, vx;

    if (side === 0) {
      x = 0;
      y = canvas.height * 0.7;
      vx = 4 + Math.random() * 8;
    } else if (side === 1) {
      x = canvas.width;
      y = canvas.height * 0.7;
      vx = -(4 + Math.random() * 8);
    } else {
      x = canvas.width / 2;
      y = canvas.height * 0.6;
      vx = Math.random() * 12 - 6;
    }

    pieces.push({
      x: x,
      y: y,
      vx: vx,
      vy: -(8 + Math.random() * 10),
      size: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
      spin: Math.random() * 10 - 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  let frame = 0;

  function animate() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(function (p) {
      p.vy += 0.3;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
      ctx.restore();
    });

    if (frame < 220) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  animate();
}
musicBtn.addEventListener("click", function () {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "🔊";
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

const lyricLines = [
  { start: 0,  end: 5,  text: "I've got two tickets to Doomsday, baby" },
  { start: 5,  end: 10, text: "Come with me Friday, don't say maybe" },
  { start: 10, end: 15, text: "I'm just a teenage dirtbag, baby, like you" },
  { start: 17, end: 19, text: "Oooohhhh~~~~" }
];
const smoke = document.getElementById("smoke");

const LYRIC_DELAY = 0.2;

const rows = lyricLines.map(function (line, i) {
  const row = document.createElement("div");
  row.className = "smoke-row " + (i % 2 === 0 ? "side-left" : "side-right");
  row.style.top = (20 + i * 15) + "vh";

  const words = line.text.split(" ");
  const lastLen = words[words.length - 1].length;
  const total = words.join("").length - lastLen || 1;
  let used = 0;

  const items = words.map(function (w) {
    const el = document.createElement("span");
    el.className = "smoke-word";
    el.textContent = w;
    row.appendChild(el);

    const item = {
      el: el,
      time: line.start + LYRIC_DELAY + (used / total) * (line.end - line.start)
    };
    used += w.length;
    return item;
  });

  smoke.appendChild(row);
  return { row: row, items: items, gone: line.end + 1.5 + LYRIC_DELAY };
});
document.addEventListener("keydown", function (e) {
  if (e.key === "t") console.log(music.currentTime.toFixed(1));
});

function tick() {
  const t = music.currentTime;

  rows.forEach(function (r) {
    r.items.forEach(function (it) {
      it.el.classList.toggle("on", t >= it.time);
    });
    r.row.classList.toggle("gone", t >= r.gone);
  });

  requestAnimationFrame(tick);
}

tick();

