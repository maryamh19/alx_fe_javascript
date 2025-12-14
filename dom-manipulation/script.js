// ==============================
// Load Quotes (Local Storage)
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
// Save Quotes
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ==============================
// Notification
function notifyUser(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.color = "green";
  setTimeout(() => { notification.textContent = ""; }, 5000);
}

// Populate Categories
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  const savedCategory = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = savedCategory;
}

// ==============================
// Show Random Quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const selectedCategory = document.getElementById("categoryFilter").value;
  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// ==============================
// Filter Quotes
function filterQuotes() {
  const category = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", category);
  showRandomQuote();
}

// ==============================
// Add Quote Form
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
// Add Quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (text === "" || category === "") {
    alert("Please fill in both fields");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();

  postQuoteToServer(newQuote); // POST to server
}

// ==============================
// POST New Quote to Server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });

    if (!response.ok) throw new Error("Failed to post quote");

    const data = await response.json();
    console.log("POST response:", data);
    notifyUser("Quotes synced with server!"); // <-- exact text required
  } catch (error) {
    console.error(error);
  }

}

// ==============================
// Fetch Quotes from Server (GET)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data.slice(0, 5).map(item => ({ text: item.title, category: "Server" }));
  } catch (error) {
    console.error("Error fetching server quotes:", error);
    return [];
  }
}

// ==============================
// Sync Quotes with Server (Conflict Resolution)
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const index = quotes.findIndex(local => local.text === serverQuote.text);
    if (index >= 0) {
      if (quotes[index].category !== serverQuote.category) {
        quotes[index].category = serverQuote.category; // server wins
        updated = true;
      }
    } else {
      quotes.push(serverQuote);
      updated = true;
    }
  });

  if (updated) {
  saveQuotes();
  populateCategories();
  showRandomQuote();
  notifyUser("Quotes synced with server!"); 
}

}

// Auto-sync every 60 seconds
setInterval(syncQuotes, 60000);

// ==============================
// JSON Import/Export
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      notifyUser("Quotes imported successfully!");
    } catch {
      alert("Invalid JSON file");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// ==============================
// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  createAddQuoteForm();
  populateCategories();
  showRandomQuote();
  syncQuotes(); // initial sync
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});
