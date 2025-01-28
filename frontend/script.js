const portfolio = [];
const apiBase = "http://127.0.0.1:5000"; // Backend endpoint

function addAsset() {
  const asset = prompt("Enter asset name (e.g., BTC, AAPL):");
  const quantity = prompt("Enter quantity:");

  if (asset && quantity) {
    fetch(`${apiBase}/price?symbol=${asset}`)
      .then(res => res.json())
      .then(data => {
        const price = data.price;
        portfolio.push({ asset, quantity, price });
        renderPortfolio();
      })
      .catch(err => alert("Asset not found!"));
  }
}

function renderPortfolio() {
  const tbody = document.getElementById("portfolio-body");
  tbody.innerHTML = "";

  portfolio.forEach(item => {
    const row = `
      <tr>
        <td>${item.asset}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function fetchMarketData() {
  const query = document.getElementById("search").value;
  fetch(`${apiBase}/price?symbol=${query}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("search-results").innerText = `Price of ${query}: $${data.price.toFixed(2)}`;
    })
    .catch(err => alert("Asset not found!"));
}
