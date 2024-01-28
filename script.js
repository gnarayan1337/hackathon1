document
  .getElementById("learning-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("learning-method").style.display = "block";
    document.getElementById("learning-form").style.display = "none";
  });

document.getElementById("textbook").addEventListener("click", function () {
  showDifficultyOptions("textbook");
});
document.getElementById("videos").addEventListener("click", function () {
  showDifficultyOptions("videos");
});
document.getElementById("podcasts").addEventListener("click", function () {
  showDifficultyOptions("podcasts");
});

function showDifficultyOptions(method) {
  sessionStorage.setItem("selectedMethod", method);
  document.getElementById("difficulty-level").style.display = "block";
  document.getElementById("learning-method").style.display = "none";
}

document.getElementById("beginner").addEventListener("click", function () {
  showLanguageOptions("beginner");
});
document.getElementById("intermediate").addEventListener("click", function () {
  showLanguageOptions("intermediate");
});
document.getElementById("advanced").addEventListener("click", function () {
  showLanguageOptions("advanced");
});

function showLanguageOptions(difficulty) {
  sessionStorage.setItem("selectedDifficulty", difficulty);
  document.getElementById("language-selection").style.display = "block";
  document.getElementById("difficulty-level").style.display = "none";
}

document.getElementById("english").addEventListener("click", function () {
  requestResources("english");
});
document.getElementById("spanish").addEventListener("click", function () {
  requestResources("spanish");
});
// Add event listeners for other languages as needed

function requestResources(language) {
  const subject = document.getElementById("subject").value;
  const method = sessionStorage.getItem("selectedMethod");
  const difficulty = sessionStorage.getItem("selectedDifficulty");

  fetch("/getResources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: subject,
      method: method,
      difficulty: difficulty,
      language: language,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = data.html;
      resultsDiv.classList.add("gpt-output"); // This line adds the gpt-output class
      resultsDiv.style.display = "block";
      document.getElementById("language-selection").style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
