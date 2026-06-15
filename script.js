const app = document.querySelector("#prayerApp");
const prayerFigure = document.querySelector("#lotus");
const stepText = document.querySelector("#stepText");
const counterText = document.querySelector("#counterText");
const blessingCard = document.querySelector("#blessingCard");
const blessingTitle = document.querySelector("#blessingTitle");
const blessingText = document.querySelector("#blessingText");
const lamps = [...document.querySelectorAll(".lamp")];

const STORAGE_KEY = "qingqing-lotus-health-blessings-v1";
const stepWords = ["愿病痛减轻", "愿身心安稳", "愿健康归来"];

const blessings = [
  "愿妈妈今日身体舒缓，疼痛慢慢减轻。",
  "愿妈妈今晚睡得安稳，醒来时多一分力气。",
  "愿妈妈胃口渐开，吃下的每一口都化成元气。",
  "愿妈妈呼吸顺畅，心里也跟着安定。",
  "愿妈妈治疗顺利，身体一步一步恢复。",
  "愿妈妈精神渐好，眼神一天比一天明亮。",
  "愿妈妈病痛远离，平安常在身边。",
  "愿妈妈每一次检查都有安心的结果。",
  "愿妈妈身体的疲累慢慢散去。",
  "愿妈妈被温柔照顾，也被健康守护。",
  "愿妈妈的免疫力稳稳提升。",
  "愿妈妈的伤口与不适都顺利复原。",
  "愿妈妈每个夜晚都少些难受，多些安眠。",
  "愿妈妈今天多喝一口水，多添一点力量。",
  "愿妈妈的心跳平稳，心情也平稳。",
  "愿妈妈的身体记得如何康复。",
  "愿妈妈远离疼痛，靠近舒适。",
  "愿妈妈所有药物与治疗都发挥好的帮助。",
  "愿妈妈的体力像晨光一样慢慢回来。",
  "愿妈妈每一天都比前一天更轻松。",
  "愿妈妈睡眠深沉，身体好好修复。",
  "愿妈妈头脑清明，身心不再沉重。",
  "愿妈妈的食欲回来，笑容也回来。",
  "愿妈妈少受病苦，多得平安。",
  "愿妈妈在家人的陪伴里安心养病。",
  "愿妈妈的身体细胞都朝健康前进。",
  "愿妈妈的不舒服一点一点消退。",
  "愿妈妈今天能感觉到明显的好转。",
  "愿妈妈保持稳定，慢慢走向康复。",
  "愿妈妈每一次休息都真正补回力气。",
  "愿妈妈的血气顺畅，身体温暖。",
  "愿妈妈的精神被祝福扶起来。",
  "愿妈妈心中少些担忧，多些安稳。",
  "愿妈妈所有指数都朝好的方向变化。",
  "愿妈妈的病灶逐渐缩小，健康逐渐扩大。",
  "愿妈妈有好胃口、好睡眠、好精神。",
  "愿妈妈在疼痛时有人陪，在害怕时有人抱。",
  "愿妈妈今日平安，明日更好。",
  "愿妈妈身体慢慢变轻，心也慢慢变亮。",
  "愿妈妈的恢复路上常有好消息。",
  "愿妈妈的每一次呼吸都带来平静。",
  "愿妈妈身体里的力量重新聚回来。",
  "愿妈妈病中仍被爱包围，被平安照顾。",
  "愿妈妈的血液、骨骼、肌肉都得到滋养。",
  "愿妈妈少一些药后不适，多一些治疗成效。",
  "愿妈妈的白天有精神，夜晚能好眠。",
  "愿妈妈的疼痛降下来，笑容升起来。",
  "愿妈妈恢复顺利，少走辛苦的路。",
  "愿妈妈今日有胃口，身体有力量。",
  "愿妈妈的身体被柔和的光守护。",
  "愿妈妈每个细小好转都被看见。",
  "愿妈妈的心情稳住，身体跟着稳住。",
  "愿妈妈不再那么疲倦，能慢慢坐起、走动、微笑。",
  "愿妈妈的治疗安排都有好缘分。",
  "愿妈妈的医护照顾细心顺利。",
  "愿妈妈每一份不安都被平安取代。",
  "愿妈妈病痛如云散去，健康如花开来。",
  "愿妈妈的身体多一分修复，少一分负担。",
  "愿妈妈体温平稳，睡醒舒服。",
  "愿妈妈今天能感到一点轻松。",
  "愿妈妈的心里有盼望，身体有力量。",
  "愿妈妈的康复速度稳定而踏实。",
  "愿妈妈身边的人都能给她安心。",
  "愿妈妈不舒服时很快得到缓解。",
  "愿妈妈的身体把营养好好吸收。",
  "愿妈妈的元气在祝福中慢慢舒展。",
  "愿妈妈的每一次复诊都更安心。",
  "愿妈妈的身体少受折磨，多得修复。",
  "愿妈妈今天能睡一场真正舒服的觉。",
  "愿妈妈体力回升，步伐稳当。",
  "愿妈妈的眼泪变少，安心变多。",
  "愿妈妈在治疗中保持勇气与平静。",
  "愿妈妈的身体听见祝福，慢慢好起来。",
  "愿妈妈每一口饭都带来恢复的力量。",
  "愿妈妈每一杯水都滋润身体。",
  "愿妈妈的药效顺利，副作用减轻。",
  "愿妈妈被好医生、好方法、好时机守护。",
  "愿妈妈身体不再紧绷，能慢慢放松。",
  "愿妈妈今日少痛一点，多笑一点。",
  "愿妈妈心安，身安，日日平安。",
  "愿妈妈的内脏功能稳定运作。",
  "愿妈妈的血压、脉搏与呼吸都安稳。",
  "愿妈妈的身体像春天一样慢慢复苏。",
  "愿妈妈在每个早晨醒来时都多些希望。",
  "愿妈妈康复路上不孤单。",
  "愿妈妈的疲惫被睡眠带走。",
  "愿妈妈身体中的发炎与不适逐渐平息。",
  "愿妈妈有足够的力气面对今天。",
  "愿妈妈的身体收到满满善意与祝福。",
  "愿妈妈每一天都离健康更近。",
  "愿妈妈的心神安定，病苦减轻。",
  "愿妈妈吃得下、睡得着、笑得出来。",
  "愿妈妈的康复有光，也有家人的手。",
  "愿妈妈的身体顺利排出疲累与病气。",
  "愿妈妈所有不舒服都有缓和的方法。",
  "愿妈妈被平安围绕，被健康牵引。",
  "愿妈妈的身体恢复节奏，稳稳向好。",
  "愿妈妈今天的状态比昨天更稳。",
  "愿妈妈少一些焦虑，多一些休息。",
  "愿妈妈在小和尚的祝福中慢慢康复。",
  "愿妈妈的每一次治疗都带来希望。",
  "愿妈妈的身体重新找回平衡。",
  "愿妈妈的精神和气色都逐渐变好。",
  "愿妈妈疼痛退散，舒适停留。",
  "愿妈妈被慈悲照看，被健康拥抱。",
  "愿妈妈从今天开始，一日一日更加安稳。",
  "愿妈妈长长久久平安，身体慢慢健康。",
  "愿 108 份祝福化作光，陪妈妈走向康复。"
];

let step = 0;
let usedIndexes = loadUsedIndexes();
let isComplete = false;

function loadUsedIndexes() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter((item) => Number.isInteger(item)) : [];
  } catch {
    return [];
  }
}

function saveUsedIndexes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usedIndexes));
}

function setStep(nextStep) {
  step = nextStep;
  prayerFigure.dataset.step = String(step);
  app.classList.remove("step-0", "step-1", "step-2", "step-3");
  app.classList.add(`step-${step}`);
  lamps.forEach((lamp, index) => lamp.classList.toggle("is-lit", index < step));
}

function updateCounter() {
  counterText.textContent = `已收到 ${usedIndexes.length} / ${blessings.length} 份祝福`;
}

function getNextBlessing() {
  if (usedIndexes.length >= blessings.length) {
    usedIndexes = [];
  }
  const remaining = blessings
    .map((_, index) => index)
    .filter((index) => !usedIndexes.includes(index));
  const index = remaining[Math.floor(Math.random() * remaining.length)];
  usedIndexes.push(index);
  saveUsedIndexes();
  return blessings[index];
}

function showFloatingWord(text, x, y) {
  const word = document.createElement("span");
  word.className = "float-word";
  word.textContent = text;
  word.style.left = `${x}px`;
  word.style.top = `${y}px`;
  document.body.append(word);
  word.addEventListener("animationend", () => word.remove(), { once: true });
}

function showSparks(x, y) {
  for (let i = 0; i < 14; i += 1) {
    const spark = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 14;
    const distance = 46 + Math.random() * 46;
    spark.className = "spark";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
    document.body.append(spark);
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
  }
}

function completePrayer() {
  const blessing = getNextBlessing();
  isComplete = true;
  setStep(3);
  updateCounter();

  blessingTitle.textContent = "小和尚送来祝福";
  blessingText.textContent = blessing;

  blessingCard.hidden = false;
}

function handlePrayer(event) {
  const x = event.clientX || window.innerWidth / 2;
  const y = event.clientY || window.innerHeight / 2;

  if (isComplete) {
    startAnotherPrayer();
  }

  const nextStep = Math.min(3, step + 1);
  setStep(nextStep);
  stepText.textContent = stepWords[nextStep - 1];
  showFloatingWord(stepWords[nextStep - 1], x, y);
  showSparks(x, y);

  if (nextStep === 3) {
    completePrayer();
  }
}

function startAnotherPrayer() {
  isComplete = false;
  blessingCard.hidden = true;
  stepText.textContent = "心中默念一句祝福，然后轻点屏幕";
  setStep(0);
}

app.addEventListener("pointerup", handlePrayer);

setStep(0);
updateCounter();
