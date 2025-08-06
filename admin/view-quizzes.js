// Check admin role
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role.toLowerCase() !== "admin") {
  window.location.href = "../loginpage/login.html";
}

// Logout
function logout() {
  localStorage.removeItem("user");
  window.location.href = "../loginpage/login.html";
}

const quizTableBody = document.getElementById("quizTableBody");

// Fetch all quizzes
async function fetchQuizzes() {
  try {
    const response = await fetch("http://localhost:9090/admin/quizzes");
    const quizzes = await response.json();

    if (quizzes.length === 0) {
      quizTableBody.innerHTML = `<tr><td colspan="7">No quizzes found.</td></tr>`;
      return;
    }

    quizzes.forEach((quiz) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${quiz.id}</td>
        <td>${quiz.title}</td>
        <td>${quiz.numberOfQuestions}</td>
        <td>${quiz.totalMarks}</td>
        <td>${quiz.timeLimit}</td>
        <td>
          <span class="badge ${quiz.active ? 'bg-success' : 'bg-secondary'}" id="status-${quiz.id}">
            ${quiz.active ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td>
          <a href="add-questions.html?quizId=${quiz.id}" class="btn btn-sm btn-primary">Add Questions</a>
          <a href="view-questions.html?quizId=${quiz.id}" class="btn btn-sm btn-info ms-2">View Questions</a>
          <button class="btn btn-sm btn-outline-warning ms-2" onclick="toggleStatus(${quiz.id})">
            ${quiz.active ? 'Deactivate' : 'Activate'}
          </button>
        </td>
      `;

      quizTableBody.appendChild(row);
    });
  } catch (error) {
    alert("Error fetching quizzes.");
  }
}

// Toggle active/inactive status
async function toggleStatus(quizId) {
  try {
    const response = await fetch(`http://localhost:9090/admin/quiz/${quizId}/toggle-status`, {
      method: "PUT"
    });

    if (response.ok) {
      alert("Quiz status updated!");
      quizTableBody.innerHTML = "";
      fetchQuizzes();
    } else {
      const err = await response.text();
      alert("Failed to update status: " + err);
    }
  } catch (error) {
    alert("Server error while toggling status.");
  }
}

// Load quizzes on page load
fetchQuizzes();

