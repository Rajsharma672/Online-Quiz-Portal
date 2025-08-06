const params = new URLSearchParams(window.location.search);
const quizId = params.get("quizId");

// Set Quiz ID text
document.getElementById("quizIdDisplay").innerText = quizId;

// Set Add Questions button link
document.getElementById("addQuestionsBtn").href = `add-questions.html?quizId=${quizId}`;

// Fetch and display questions
const questionList = document.getElementById("questionList");

async function loadQuestions() {
  try {
    const response = await fetch(`http://localhost:9090/quiz/${quizId}/get-questions`);
    const questions = await response.json();
// console.log(questions)
    if (questions.length === 0) {
      questionList.innerHTML = `<div class="alert alert-warning">No questions found for this quiz.</div>`;
      return;
    }

    questions.forEach((q, i) => {
      const item = document.createElement("div");
      item.className = "list-group-item";

      item.innerHTML = `
        <h5>Q${i + 1}: ${q.question}</h5>
        <ul>
          <li>A. ${q.optionA}</li>
          <li>B. ${q.optionB}</li>
          <li>C. ${q.optionC}</li>
          <li>D. ${q.optionD}</li>
        </ul>
        <p><strong>✔ Correct Answer:</strong> ${q.correctOption}</p>
      `;

      questionList.appendChild(item);
    });
  } catch (error) {
    questionList.innerHTML = `<div class="alert alert-danger">Error loading questions.</div>`;
  }
}

loadQuestions();
