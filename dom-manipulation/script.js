<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dynamic Quote Generator</title>
</head>
<body>

  <h1>Dynamic Quote Generator</h1>

  <!-- Notification -->
  <div id="notification"></div>

  <!-- Filter Section -->
  <h3>Filter by Category</h3>
  <select id="categoryFilter" onchange="filterQuotes()">
    <option value="all">All Categories</option>
  </select>

  <!-- Quote Display -->
  <div id="quoteDisplay"></div>
  <button id="newQuote">Show New Quote</button>

  <hr />

  <!-- Add Quote Section -->
  <h3>Add a New Quote</h3>
  <div id="formContainer"></div>

  <hr />

  <!-- Import / Export Section -->
  <h3>Import / Export Quotes</h3>
  <button onclick="exportToJson()">Export Quotes (JSON)</button>
  <br /><br />
  <input
    type="file"
    id="importFile"
    accept=".json"
    onchange="importFromJsonFile(event)"
  />

  <!-- JavaScript -->
  <script src="script.js"></script>
</body>
</html>
