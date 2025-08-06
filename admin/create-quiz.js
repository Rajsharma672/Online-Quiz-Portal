// Checking role
const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.role.toLowerCase() !== "admin") {
  window.location.href = "../loginpage/login.html";
}

const quizForm = document.getElementById("quizForm");

if (quizForm) {
  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const quizData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      totalQuestions: parseInt(document.getElementById("totalQuestions").value),
      totalMarks: parseInt(document.getElementById("totalMarks").value),
      timeLimit: parseInt(document.getElementById("timeLimit").value),
      active: document.getElementById("active").checked,
      numberOfQuestions: 0 // Start with 0
    };

    try {
      const response = await fetch("http://localhost:9090/admin/add-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData)
      });

      if (response.ok) {
        const createdQuiz = await response.json();
        alert("Quiz created successfully!");
        window.location.href = `add-questions.html?quizId=${createdQuiz.id}`;
      } else {
        const error = await response.json();
        alert("Failed to create quiz: " + (error.message || "Server error"));
      }
    } catch (error) {
      alert("Error connecting to server!");
    }
  });
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "../loginpage/login.html";
}
