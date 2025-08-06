const params = new URLSearchParams(window.location.search);
const quizId = params.get("quizId");
document.getElementById("quizIdDisplay").textContent = quizId;

const questionBox = document.getElementById("questionBox");
const timerDisplay = document.getElementById("timer");

let questions = [];
let current = 0;
let answers = {};
let timerInterval;
let totalTime = 0;

async function loadQuiz() {
  try {
    const res = await fetch(`http://localhost:9090/quiz/${quizId}/get-questions`);
    questions = await res.json();

    if (questions.length === 0) {
      questionBox.innerHTML = "<p class='text-danger'>No questions available.</p>";
      return;
    }

    totalTime = questions[0].quiz?.timeLimit || 10;
    startTimer(totalTime);
    showQuestion(current);
  } catch (err) {
    alert("Failed to load questions.");
    console.error(err);
  }
}

function startTimer(minutes) {
  let totalSeconds = minutes * 60;

  timerInterval = setInterval(() => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    timerDisplay.textContent = `Time Left: ${min}:${sec < 10 ? "0" : ""}${sec}`;

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }

    totalSeconds--;
  }, 1000);
}

function showQuestion(index) {
  const q = questions[index];
  const selected = answers[q.qid];

  questionBox.innerHTML = `
    <h5>Q${index + 1}: ${q.question}</h5>
    <div class="form-check">
      <input type="radio" class="form-check-input" name="option" value="A" ${selected === "A" ? "checked" : ""}>
      <label class="form-check-label">${q.optionA}</label>
    </div>
    <div class="form-check">
      <input type="radio" class="form-check-input" name="option" value="B" ${selected === "B" ? "checked" : ""}>
      <label class="form-check-label">${q.optionB}</label>
    </div>
    <div class="form-check">
      <input type="radio" class="form-check-input" name="option" value="C" ${selected === "C" ? "checked" : ""}>
      <label class="form-check-label">${q.optionC}</label>
    </div>
    <div class="form-check">
      <input type="radio" class="form-check-input" name="option" value="D" ${selected === "D" ? "checked" : ""}>
      <label class="form-check-label">${q.optionD}</label>
    </div>
  `;
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    answers[questions[current].qid] = selected.value;
  }
}

// Navigation
document.getElementById("nextBtn").addEventListener("click", () => {
  saveAnswer();
  if (current < questions.length - 1) {
    current++;
    showQuestion(current);
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  saveAnswer();
  if (current > 0) {
    current--;
    showQuestion(current);
  }
});

document.getElementById("skipBtn").addEventListener("click", () => {
  // Don't save
  if (current < questions.length - 1) {
    current++;
    showQuestion(current);
  }
});

document.getElementById("markBtn").addEventListener("click", () => {
  alert("Question marked for review.");
  saveAnswer();
  if (current < questions.length - 1) {
    current++;
    showQuestion(current);
  }
});

// Submit logic
document.getElementById("submitBtn").addEventListener("click", () => {
  const confirmSubmit = confirm("Are you sure you want to submit?");
  if (confirmSubmit) {
    submitQuiz();
  }
});

async function submitQuiz() {
  clearInterval(timerInterval);
  saveAnswer();

  let correct = 0, wrong = 0, skipped = 0;

  questions.forEach((q) => {
    const selected = answers[q.qid];
    if (!selected) {
      skipped++;
    } else if (selected === q.correctOption) {
      correct++;
    } else {
      wrong++;
    }
  });

  const attempted = correct + wrong;

  // Backend result object
  const backendResult = {
    studentId: JSON.parse(localStorage.getItem("user")).id,
    quizId: parseInt(quizId),
    score: correct,
    totalMarks: questions.length
  };

  // Display-only result
  const displayResult = {
    ...backendResult,
    correctAnswers: correct,
    wrongAnswers: wrong,
    skippedQuestions: skipped,
    attempted
  };

  try {
    const res = await fetch("http://localhost:9090/student/quiz/submit-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(backendResult)
    });

    if (res.ok) {
      localStorage.setItem("quizResult", JSON.stringify(displayResult));
      window.location.href = "quiz-result.html";
    } else {
      alert("Failed to submit result.");
    }
  } catch (err) {
    alert("Error submitting result.");
    console.error(err);
  }
}

// Load quiz on start
loadQuiz();
