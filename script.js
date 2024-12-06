// Feedback form submission
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Send feedback to your backend or log it for now
    console.log(`Feedback received from ${name} (${email}): ${message}`);
    alert("Thank you for your feedback!");

    // Reset the form
    this.reset();
  });

// Tool redirection
function showTool(toolPath) {
  window.open(toolPath, "_blank");
}
function toggleMenu() {
  const navBar = document.querySelector(".nav-bar");
  navBar.classList.toggle("active");
}
// Select elements
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navBar = document.getElementById("navBar");

// Toggle menu visibility
hamburgerMenu.addEventListener("click", () => {
  navBar.classList.toggle("active");
});
function copyCode() {
  const codeSnippet = document.getElementById("codeSnippet").innerText; // Get the code text
  navigator.clipboard
    .writeText(codeSnippet)
    .then(() => {
      alert("Code copied to clipboard!"); // Feedback to the user
    })
    .catch((err) => {
      console.error("Failed to copy: ", err); // Log errors if any
    });
}
