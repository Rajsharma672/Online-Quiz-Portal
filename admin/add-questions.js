// Get quizId from URL
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quizId");
document.getElementById("quizIdHeading").textContent = "#" + quizId;

const questionForm = document.getElementById("questionForm");
const questionCountElement = document.getElementById("questionCount");

let totalQuestionsAllowed = 0;
let currentQuestionCount = 0;

// Get totalQuestions and numberOfQuestions from backend
async function fetchQuizDetails() {
  try {
    const response = await fetch(`http://localhost:9090/quiz/${quizId}`);
    if (response.ok) {
      const quiz = await response.json();
      totalQuestionsAllowed = quiz.totalQuestions;
      currentQuestionCount = quiz.numberOfQuestions || 0;
      questionCountElement.textContent = `Questions Added: ${currentQuestionCount}`;
    } else {
      alert("Failed to fetch quiz details");
    }
  } catch (error) {
    alert("Error fetching quiz data");
  }
}

// Submit question
if (questionForm) {
  questionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (currentQuestionCount >= totalQuestionsAllowed) {
      alert("Maximum number of questions already added!");
      return;
    }

    const questionData = {
      question: document.getElementById("questionText").value,
      optionA: document.getElementById("optionA").value,
      optionB: document.getElementById("optionB").value,
      optionC: document.getElementById("optionC").value,
      optionD: document.getElementById("optionD").value,
      correctOption: document.getElementById("correctOption").value
    };

    try {
      const response = await fetch(`http://localhost:9090/quiz/${quizId}/add-question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData)
      });

      if (response.ok) {
        alert("Question added successfully!");
        questionForm.reset();
        currentQuestionCount++;
        questionCountElement.textContent = `Questions Added: ${currentQuestionCount}`;
      } else {
        const error = await response.text();
        alert("Failed to add question: " + error);
      }
    } catch (error) {
      alert("Error submitting question");
    }
  });
}

// logout function (used by navbar)
function logout() {
  localStorage.removeItem("user");
  window.location.href = "../loginpage/login.html";
}

// Initial load
fetchQuizDetails();
