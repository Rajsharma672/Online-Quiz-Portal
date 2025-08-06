const quizList = document.getElementById("quizList");

async function loadActiveQuizzes() {
  try {
    const response = await fetch("http://localhost:9090/student/quizzes");
    const quizzes = await response.json();

    if (quizzes.length === 0) {
      quizList.innerHTML = `<div class="alert alert-warning text-center">No active quizzes available right now.</div>`;
      return;
    }

    quizzes.forEach((quiz) => {
      const col = document.createElement("div");
      col.className = "col-md-6 mb-4";

      col.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${quiz.title}</h5>
            <p class="card-text">${quiz.description}</p>
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item"><strong>Questions:</strong> ${quiz.numberOfQuestions}</li>
              <li class="list-group-item"><strong>Total Marks:</strong> ${quiz.totalMarks}</li>
              <li class="list-group-item"><strong>Time Limit:</strong> ${quiz.timeLimit} min</li>
            </ul>
            <a href="start-quiz.html?quizId=${quiz.id}" class="btn btn-success w-100">Start Quiz</a>
          </div>
        </div>
      `;

      quizList.appendChild(col);
    });
  } catch (error) {
    quizList.innerHTML = `<div class="alert alert-danger text-center">Error loading quizzes.</div>`;
  }
}

loadActiveQuizzes();
