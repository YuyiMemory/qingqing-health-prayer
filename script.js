const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const flowersEl = document.querySelector("#flowers");
const timerEl = document.querySelector("#timer");
const messageCard = document.querySelector("#messageCard");
const messageText = document.querySelector("#messageText");
const startButton = document.querySelector("#startButton");
const leftButton = document.querySelector("#leftButton");
const rightButton = document.querySelector("#rightButton");
const blessButton = document.querySelector("#blessButton");

const W = canvas.width;
const H = canvas.height;
const keys = new Set();
const wishes = [
  "願媽媽今天比昨天舒服一點，身體慢慢恢復力氣。",
  "願每一次治療都順利，每一個夜晚都睡得安穩。",
  "願晴晴的愛像小燈一樣，陪媽媽走過這段時間。",
  "願疼痛少一些，胃口好一些，心裡也亮一些。",
  "願平安、健康、溫柔的好消息，一點一點靠近媽媽。"
];

let player;
let drops;
let clouds;
let flowers;
let particles;
let score;
let seconds;
let running;
let lastTime;
let spawnTimer;
let cloudTimer;
let rafId;

function resetGame() {
  player = {
    x: W / 2,
    y: H - 72,
    vx: 0,
    radius: 22,
    glow: 0
  };
  drops = [];
  clouds = [];
  flowers = [];
  particles = [];
  score = 0;
  seconds = 45;
  running = false;
  lastTime = 0;
  spawnTimer = 0;
  cloudTimer = 0;
  updateHud();
}

function updateHud() {
  scoreEl.textContent = score;
  flowersEl.textContent = flowers.length;
  timerEl.textContent = Math.max(0, Math.ceil(seconds));
}

function startGame() {
  resetGame();
  running = true;
  messageCard.classList.add("hidden");
  lastTime = performance.now();
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(loop);
}

function endGame() {
  running = false;
  const wish = wishes[Math.min(wishes.length - 1, Math.floor(score / 8))];
  messageText.textContent = score >= 28
    ? `祈願完成。${wish}`
    : `收集到 ${score} 顆祝福露珠。${wish}`;
  startButton.textContent = "再祈願一次";
  messageCard.classList.remove("hidden");
}

function spawnDrop() {
  drops.push({
    x: 30 + Math.random() * (W - 60),
    y: -20,
    r: 10 + Math.random() * 7,
    vy: 95 + Math.random() * 80,
    sway: Math.random() * Math.PI * 2,
    kind: Math.random() > 0.78 ? "gold" : "blue"
  });
}

function spawnCloud() {
  clouds.push({
    x: 40 + Math.random() * (W - 80),
    y: -34,
    w: 58 + Math.random() * 36,
    h: 26 + Math.random() * 14,
    vy: 70 + Math.random() * 54
  });
}

function plantFlower(x) {
  flowers.push({
    x,
    y: H - 34 - Math.random() * 18,
    size: 0,
    target: 18 + Math.random() * 14,
    hue: Math.random() > 0.5 ? "#ef7c8e" : "#f5bd4f"
  });
}

function burst(x, y, color) {
  for (let i = 0; i < 14; i += 1) {
    particles.push({
      x,
      y,
      vx: Math.cos((Math.PI * 2 * i) / 14) * (60 + Math.random() * 45),
      vy: Math.sin((Math.PI * 2 * i) / 14) * (60 + Math.random() * 45),
      life: 0.65,
      color
    });
  }
}

function sendBlessing() {
  if (!running) return;
  score += 1;
  player.glow = 1;
  plantFlower(player.x);
  burst(player.x, player.y - 12, "#f5bd4f");
  updateHud();
}

function update(dt) {
  seconds -= dt;
  if (seconds <= 0) {
    seconds = 0;
    updateHud();
    endGame();
    return;
  }

  const left = keys.has("ArrowLeft") || keys.has("a") || keys.has("A");
  const right = keys.has("ArrowRight") || keys.has("d") || keys.has("D");
  player.vx = (right ? 1 : 0) - (left ? 1 : 0);
  player.x += player.vx * 360 * dt;
  player.x = Math.max(28, Math.min(W - 28, player.x));
  player.glow = Math.max(0, player.glow - dt * 1.5);

  spawnTimer -= dt;
  cloudTimer -= dt;
  if (spawnTimer <= 0) {
    spawnDrop();
    spawnTimer = 0.34 + Math.random() * 0.28;
  }
  if (cloudTimer <= 0) {
    spawnCloud();
    cloudTimer = 1.2 + Math.random() * 1.15;
  }

  for (const drop of drops) {
    drop.y += drop.vy * dt;
    drop.sway += dt * 3;
    drop.x += Math.sin(drop.sway) * 22 * dt;
  }

  for (const cloud of clouds) {
    cloud.y += cloud.vy * dt;
  }

  drops = drops.filter((drop) => {
    const dx = drop.x - player.x;
    const dy = drop.y - player.y;
    if (Math.hypot(dx, dy) < player.radius + drop.r) {
      const value = drop.kind === "gold" ? 3 : 1;
      score += value;
      player.glow = 1;
      burst(drop.x, drop.y, drop.kind === "gold" ? "#f5bd4f" : "#72a9d9");
      if (score % 5 === 0 || drop.kind === "gold") plantFlower(drop.x);
      updateHud();
      return false;
    }
    return drop.y < H + 30;
  });

  clouds = clouds.filter((cloud) => {
    const hit = Math.abs(cloud.x - player.x) < cloud.w * 0.45 && Math.abs(cloud.y - player.y) < 34;
    if (hit) {
      score = Math.max(0, score - 2);
      player.glow = 0.2;
      burst(player.x, player.y, "#9aa6ad");
      updateHud();
      return false;
    }
    return cloud.y < H + 40;
  });

  for (const flower of flowers) {
    flower.size += (flower.target - flower.size) * Math.min(1, dt * 5);
  }

  particles = particles.filter((p) => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 80 * dt;
    return p.life > 0;
  });

  updateHud();
}

function drawSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, "#c9ecfb");
  gradient.addColorStop(0.62, "#f8f5df");
  gradient.addColorStop(1, "#a6d49c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  drawCloud(155, 88, 86, 28);
  drawCloud(738, 74, 112, 34);

  ctx.fillStyle = "#77b16f";
  ctx.beginPath();
  ctx.moveTo(0, H - 88);
  for (let x = 0; x <= W; x += 80) {
    ctx.quadraticCurveTo(x + 40, H - 120 - Math.sin(x) * 8, x + 80, H - 88);
  }
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();
}

function drawCloud(x, y, w, h) {
  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.3, h * 0.72, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.24, y + 2, w * 0.35, h * 0.65, 0, 0, Math.PI * 2);
  ctx.ellipse(x - w * 0.25, y + 4, w * 0.32, h * 0.58, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawFlower(flower) {
  ctx.strokeStyle = "#3f7d52";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(flower.x, H - 18);
  ctx.quadraticCurveTo(flower.x - 7, flower.y + 16, flower.x, flower.y);
  ctx.stroke();

  ctx.fillStyle = flower.hue;
  for (let i = 0; i < 6; i += 1) {
    const a = (Math.PI * 2 * i) / 6;
    ctx.beginPath();
    ctx.ellipse(
      flower.x + Math.cos(a) * flower.size * 0.42,
      flower.y + Math.sin(a) * flower.size * 0.42,
      flower.size * 0.28,
      flower.size * 0.48,
      a,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.fillStyle = "#ffe9a8";
  ctx.beginPath();
  ctx.arc(flower.x, flower.y, Math.max(2, flower.size * 0.22), 0, Math.PI * 2);
  ctx.fill();
}

function drawDrop(drop) {
  ctx.save();
  ctx.translate(drop.x, drop.y);
  ctx.fillStyle = drop.kind === "gold" ? "#f5bd4f" : "#72a9d9";
  ctx.shadowColor = drop.kind === "gold" ? "#ffe09a" : "#bde7ff";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.moveTo(0, -drop.r * 1.25);
  ctx.bezierCurveTo(drop.r, -drop.r * 0.2, drop.r * 0.75, drop.r, 0, drop.r);
  ctx.bezierCurveTo(-drop.r * 0.75, drop.r, -drop.r, -drop.r * 0.2, 0, -drop.r * 1.25);
  ctx.fill();
  ctx.restore();
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x, player.y);
  const glowRadius = 35 + player.glow * 24;
  const glow = ctx.createRadialGradient(0, 0, 8, 0, 0, glowRadius);
  glow.addColorStop(0, "rgba(255, 231, 139, 0.95)");
  glow.addColorStop(1, "rgba(255, 231, 139, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffe5a9";
  ctx.strokeStyle = "#6e5931";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, player.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#6e5931";
  ctx.beginPath();
  ctx.arc(-7, -4, 2.6, 0, Math.PI * 2);
  ctx.arc(7, -4, 2.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6e5931";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 4, 8, 0.18 * Math.PI, 0.82 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

function draw() {
  drawSky();
  for (const flower of flowers) drawFlower(flower);
  for (const drop of drops) drawDrop(drop);

  ctx.fillStyle = "rgba(108, 121, 128, 0.72)";
  for (const cloud of clouds) drawCloud(cloud.x, cloud.y, cloud.w, cloud.h);

  drawPlayer();

  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, p.life / 0.65);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  if (running) update(dt);
  draw();
  if (running) rafId = requestAnimationFrame(loop);
}

window.addEventListener("keydown", (event) => {
  keys.add(event.key);
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    sendBlessing();
  }
});

window.addEventListener("keyup", (event) => keys.delete(event.key));
startButton.addEventListener("click", startGame);
blessButton.addEventListener("click", sendBlessing);

leftButton.addEventListener("pointerdown", () => keys.add("ArrowLeft"));
leftButton.addEventListener("pointerup", () => keys.delete("ArrowLeft"));
leftButton.addEventListener("pointerleave", () => keys.delete("ArrowLeft"));
rightButton.addEventListener("pointerdown", () => keys.add("ArrowRight"));
rightButton.addEventListener("pointerup", () => keys.delete("ArrowRight"));
rightButton.addEventListener("pointerleave", () => keys.delete("ArrowRight"));

canvas.addEventListener("pointermove", (event) => {
  if (!running) return;
  const rect = canvas.getBoundingClientRect();
  player.x = ((event.clientX - rect.left) / rect.width) * W;
  player.x = Math.max(28, Math.min(W - 28, player.x));
});

resetGame();
draw();
