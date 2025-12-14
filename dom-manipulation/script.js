// ==============================
// Load Quotes (Local Storage)
// ==============================
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" },
  { text: "Simplicity is the ultimate sophistication.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Creativity is intelligence having fun.", category: "Creativity" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Resilience" }
];

// ==============================
// Save Quotes to Local Storage
// ==============================
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ==============================
// Show Random Quote
// ==============================
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;

  // Save last viewed quote (Session Storage)
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ==============================
// Create Add Quote Form
// ==============================
function createAddQuoteForm() {
  const container = document.getElementById("formContainer");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const button = document.createElement("button");
  button.textContent = "Add Quote";
  button.onclick = addQuote;

  container.appendChild(textInput);
  container.appendChild(categoryInput);
  container.appendChild(button);
}

// ==============================
// Add Quote Dynamically
// ==============================
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text === "" || category === "") {
    alert("Please fill in both fields");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  showRandomQuote();
}

// ==============================
// Export Quotes to JSON
// ==============================
function exportToJson() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ==============================
// Import Quotes from JSON
// ==============================
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Invalid JSON file");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// ==============================
// Event Listeners
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  showRandomQuote();

  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
});
