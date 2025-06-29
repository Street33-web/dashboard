let allData = [];

fetch("https://script.google.com/macros/s/AKfycbxg4v5rhtDbAkJCrM0YoYY6iQw-ANYkJ4PjvQyvyRMub_zxLJT7gimzmW-wKHBUajWg/exec")
  .then(response => response.json())
  .then(data => {
    allData = data;
    populateTable(data);
    populateFilter(data);
  });

function getStockClass(stock) {
  if (parseInt(stock) === 0) return 'stock-zero';
  if (parseInt(stock) <= 5) return 'stock-low';
  return 'stock-ok';
}

function populateTable(data) {
  const tbody = document.querySelector("#prixTable tbody");
  tbody.innerHTML = "";
  data.forEach(item => {
    const stockClass = getStockClass(item.stock);
    const stockDisplay = item.stock === 0 ? '0' : item.stock;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nom}</td>
      <td>${item.categorie}</td>
      <td>${item.prix}</td>
      <td class="${stockClass}">${stockDisplay}</td>
    `;
    tbody.appendChild(row);
  });
}

function populateFilter(data) {
  const categories = [...new Set(data.map(item => item.categorie))];
  const select = document.getElementById("categoryFilter");
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function filterTable() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const categoryValue = document.getElementById("categoryFilter").value;
  const filteredData = allData.filter(item =>
    item.nom.toLowerCase().includes(searchValue) &&
    (categoryValue === "" || item.categorie === categoryValue)
  );
  populateTable(filteredData);
}
