const app = document.querySelector("#prayerApp");
const lotus = document.querySelector("#lotus");
const stepText = document.querySelector("#stepText");
const counterText = document.querySelector("#counterText");
const blessingCard = document.querySelector("#blessingCard");
const blessingTitle = document.querySelector("#blessingTitle");
const blessingText = document.querySelector("#blessingText");
const lamps = [...document.querySelectorAll(".lamp")];

const STORAGE_KEY = "qingqing-lotus-health-blessings-v1";
const stepWords = ["願病痛減輕", "願身心安穩", "願健康歸來"];

const blessings = [
  "願媽媽今日身體舒緩，疼痛慢慢減輕。",
  "願媽媽今晚睡得安穩，醒來時多一分力氣。",
  "願媽媽胃口漸開，吃下的每一口都化成元氣。",
  "願媽媽呼吸順暢，心裡也跟著安定。",
  "願媽媽治療順利，身體一步一步恢復。",
  "願媽媽精神漸好，眼神一天比一天明亮。",
  "願媽媽病痛遠離，平安常在身邊。",
  "願媽媽每一次檢查都有安心的結果。",
  "願媽媽身體的疲累慢慢散去。",
  "願媽媽被溫柔照顧，也被健康守護。",
  "願媽媽的免疫力穩穩提升。",
  "願媽媽的傷口與不適都順利復原。",
  "願媽媽每個夜晚都少些難受，多些安眠。",
  "願媽媽今天多喝一口水，多添一點力量。",
  "願媽媽的心跳平穩，心情也平穩。",
  "願媽媽的身體記得如何康復。",
  "願媽媽遠離疼痛，靠近舒適。",
  "願媽媽所有藥物與治療都發揮好的幫助。",
  "願媽媽的體力像晨光一樣慢慢回來。",
  "願媽媽每一天都比前一天更輕鬆。",
  "願媽媽睡眠深沉，身體好好修復。",
  "願媽媽頭腦清明，身心不再沉重。",
  "願媽媽的食慾回來，笑容也回來。",
  "願媽媽少受病苦，多得平安。",
  "願媽媽在家人的陪伴裡安心養病。",
  "願媽媽的身體細胞都朝健康前進。",
  "願媽媽的不舒服一點一點消退。",
  "願媽媽今天能感覺到明顯的好轉。",
  "願媽媽保持穩定，慢慢走向康復。",
  "願媽媽每一次休息都真正補回力氣。",
  "願媽媽的血氣順暢，身體溫暖。",
  "願媽媽的精神被祝福扶起來。",
  "願媽媽心中少些擔憂，多些安穩。",
  "願媽媽所有指數都朝好的方向變化。",
  "願媽媽的病灶逐漸縮小，健康逐漸擴大。",
  "願媽媽有好胃口、好睡眠、好精神。",
  "願媽媽在疼痛時有人陪，在害怕時有人抱。",
  "願媽媽今日平安，明日更好。",
  "願媽媽身體慢慢變輕，心也慢慢變亮。",
  "願媽媽的恢復路上常有好消息。",
  "願媽媽的每一次呼吸都帶來平靜。",
  "願媽媽身體裡的力量重新聚回來。",
  "願媽媽病中仍被愛包圍，被平安照顧。",
  "願媽媽的血液、骨骼、肌肉都得到滋養。",
  "願媽媽少一些藥後不適，多一些治療成效。",
  "願媽媽的白天有精神，夜晚能好眠。",
  "願媽媽的疼痛降下來，笑容升起來。",
  "願媽媽恢復順利，少走辛苦的路。",
  "願媽媽今日有胃口，身體有力量。",
  "願媽媽的身體被柔和的光守護。",
  "願媽媽每個細小好轉都被看見。",
  "願媽媽的心情穩住，身體跟著穩住。",
  "願媽媽不再那麼疲倦，能慢慢坐起、走動、微笑。",
  "願媽媽的治療安排都有好緣分。",
  "願媽媽的醫護照顧細心順利。",
  "願媽媽每一份不安都被平安取代。",
  "願媽媽病痛如雲散去，健康如花開來。",
  "願媽媽的身體多一分修復，少一分負擔。",
  "願媽媽體溫平穩，睡醒舒服。",
  "願媽媽今天能感到一點輕鬆。",
  "願媽媽的心裡有盼望，身體有力量。",
  "願媽媽的康復速度穩定而踏實。",
  "願媽媽身邊的人都能給她安心。",
  "願媽媽不舒服時很快得到緩解。",
  "願媽媽的身體把營養好好吸收。",
  "願媽媽的元氣像蓮花一樣慢慢舒展。",
  "願媽媽的每一次復診都更安心。",
  "願媽媽的身體少受折磨，多得修復。",
  "願媽媽今天能睡一場真正舒服的覺。",
  "願媽媽體力回升，步伐穩當。",
  "願媽媽的眼淚變少，安心變多。",
  "願媽媽在治療中保持勇氣與平靜。",
  "願媽媽的身體聽見祝福，慢慢好起來。",
  "願媽媽每一口飯都帶來恢復的力量。",
  "願媽媽每一杯水都滋潤身體。",
  "願媽媽的藥效順利，副作用減輕。",
  "願媽媽被好醫生、好方法、好時機守護。",
  "願媽媽身體不再緊繃，能慢慢放鬆。",
  "願媽媽今日少痛一點，多笑一點。",
  "願媽媽心安，身安，日日平安。",
  "願媽媽的內臟功能穩定運作。",
  "願媽媽的血壓、脈搏與呼吸都安穩。",
  "願媽媽的身體像春天一樣慢慢復甦。",
  "願媽媽在每個早晨醒來時都多些希望。",
  "願媽媽康復路上不孤單。",
  "願媽媽的疲憊被睡眠帶走。",
  "願媽媽身體中的發炎與不適逐漸平息。",
  "願媽媽有足夠的力氣面對今天。",
  "願媽媽的身體收到滿滿善意與祝福。",
  "願媽媽每一天都離健康更近。",
  "願媽媽的心神安定，病苦減輕。",
  "願媽媽吃得下、睡得著、笑得出來。",
  "願媽媽的康復有光，也有家人的手。",
  "願媽媽的身體順利排出疲累與病氣。",
  "願媽媽所有不舒服都有緩和的方法。",
  "願媽媽被平安圍繞，被健康牽引。",
  "願媽媽的身體恢復節奏，穩穩向好。",
  "願媽媽今天的狀態比昨天更穩。",
  "願媽媽少一些焦慮，多一些休息。",
  "願媽媽在蓮花祝福中慢慢康復。",
  "願媽媽的每一次治療都帶來希望。",
  "願媽媽的身體重新找回平衡。",
  "願媽媽的精神和氣色都逐漸變好。",
  "願媽媽疼痛退散，舒適停留。",
  "願媽媽被慈悲照看，被健康擁抱。",
  "願媽媽從今天開始，一日一日更加安穩。",
  "願媽媽長長久久平安，身體慢慢健康。",
  "願 108 份祝福化作光，陪媽媽走向康復。"
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
  lotus.dataset.step = String(step);
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

  blessingTitle.textContent = "蓮花已開，祝福已至";
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
  stepText.textContent = "心中默念一句祝福，然後輕點螢幕";
  setStep(0);
}

app.addEventListener("pointerup", handlePrayer);

setStep(0);
updateCounter();
