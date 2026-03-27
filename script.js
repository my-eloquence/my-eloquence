const transcriptDiv = document.getElementById("transcript");
const feedbackDiv = document.getElementById("feedback");
 
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
 
let finalText = "";
let timerInterval = null;
let seconds = 0;
 
const BACKEND_URL = "https://speech-ai-website-1.onrender.com";
 
// Stop speech on exit
window.addEventListener("beforeunload", () => window.speechSynthesis.cancel());
document.addEventListener("visibilitychange", () => {
  if (document.hidden) window.speechSynthesis.cancel();
});
 
// 🎤 Capture speech
recognition.onresult = function(event) {
  finalText = "";
  for (let i = 0; i < event.results.length; i++) {
    finalText += event.results[i][0].transcript;
  }
  transcriptDiv.innerText = finalText;
};
 
// ▶ Start recording
document.getElementById("startBtn").onclick = () => {
  finalText = "";
  transcriptDiv.innerText = "";
  feedbackDiv.innerText = "";
  document.getElementById("fillerResult").style.display = "none";
  seconds = 0;
  updateTimer();
  timerInterval = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
  recognition.start();
};
 
// ⏹ Stop recording
document.getElementById("stopBtn").onclick = () => {
  recognition.stop();
  clearInterval(timerInterval);
  showFillerCount(finalText);
  getAIFeedback(finalText);
};
 
// ⏱ Timer display
function updateTimer() {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  document.getElementById("timerDisplay").innerText = `⏱ ${m}:${s}`;
}
 
// 🔢 Filler word counter
function showFillerCount(text) {
  const fillers = ["um", "uh", "like", "you know", "basically", "literally", "actually", "so", "right"];
  const lower = text.toLowerCase();
  let total = 0;
  let breakdown = [];
 
  fillers.forEach(f => {
    const regex = new RegExp(`\\b${f}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      total += matches.length;
      breakdown.push(`"${f}" × ${matches.length}`);
    }
  });
 
  const box = document.getElementById("fillerResult");
  box.style.display = "block";
  if (total === 0) {
    box.innerHTML = `✅ <strong>No filler words detected!</strong> Great job!`;
    box.style.background = "rgba(34,197,94,0.1)";
    box.style.borderColor = "#22c55e";
  } else {
    box.innerHTML = `⚠️ <strong>${total} filler word(s) detected:</strong> ${breakdown.join(", ")}`;
    box.style.background = "rgba(239,68,68,0.08)";
    box.style.borderColor = "#ef4444";
  }
}
 
// 🔊 Speak feedback — warm, friendly voice
function speakFeedback(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.pitch = 1.25;   // slightly higher = warmer, friendlier feel
  speech.rate = 0.88;    // a touch slower = relaxed, not rushed
  speech.volume = 1;
 
  // Pick the friendliest available voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang.startsWith("en") && (v.name.includes("Female") || v.name.includes("Google") || v.name.includes("Samantha"))
  );
  if (preferred) speech.voice = preferred;
 
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}
 
// 🧠 Send to AI
async function getAIFeedback(text) {
  if (!text || text.trim() === "") {
    feedbackDiv.innerText = "Hmm, I didn't catch anything! Try speaking a bit louder. 😊";
    return;
  }
 
  // Friendly loading messages — cycles every 2s
  const loadingMessages = [
    "Listening back to what you said... 🎧",
    "Thinking about your speech... 🤔",
    "Almost there, putting together some thoughts! ✨",
  ];
  let msgIndex = 0;
  feedbackDiv.innerText = loadingMessages[0];
  const loadingInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % loadingMessages.length;
    feedbackDiv.innerText = loadingMessages[msgIndex];
  }, 2000);
 
  try {
    const response = await fetch(`${BACKEND_URL}/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    clearInterval(loadingInterval);
    feedbackDiv.innerText = data.reply;
    speakFeedback(data.reply);
  } catch (error) {
    clearInterval(loadingInterval);
    feedbackDiv.innerText = "Oops! Couldn't reach the server right now. Check if it's running! 🙈";
    console.error(error);
  }
}
 