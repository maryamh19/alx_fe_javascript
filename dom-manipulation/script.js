const quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" },
  { text: "Simplicity is the ultimate sophistication.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Creativity is intelligence having fun.", category: "Creativity" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Resilience" },

];


function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
}


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


function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text === "" || category === "") {
    alert("Please fill in both fields");
    return;
  }

  quotes.push({ text, category });

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  showRandomQuote();
}


document.getElementById("newQuote").addEventListener("click", showRandomQuote);

document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  showRandomQuote();
});
