document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const input = document.getElementById("productSearch");
  const resultsList = document.getElementById("results");
 
  // buton cautare
  searchBtn.addEventListener("click", () => {
    const query = input.value.trim();
    resultsList.innerHTML = "";
 
    // validare input
    if (!query) {
      const li = document.createElement("li");
      li.textContent = "Introdu un nume de produs dorit!";
      resultsList.appendChild(li);
      return;
    }

    const url = `http://localhost:3000/search?name=${encodeURIComponent(query)}`;
 // apelare server local
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const products = Array.isArray(data) ? data : data.results;
        const cheapest = getCheapestProduct(products);

        if (cheapest && isValidLink(cheapest.link)) {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${cheapest.site}</strong><br>
            <a href="${cheapest.link}" target="_blank" style="text-decoration:none; color:#333;">
              ${cheapest.name}
            </a><br>
            <span style="color:green; font-weight:bold;">${cheapest.price}</span>
          `;
          resultsList.appendChild(li);
        } else {
          const li = document.createElement("li");
          li.textContent = "Nu s-au găsit produse sau link-ul este indisponibil.";
          resultsList.appendChild(li);
        }
      })
      .catch(err => {
        console.error("Eroare:", err);
        const li = document.createElement("li");
        li.textContent = "A apărut o eroare la preluarea datelor din JSON.";
        resultsList.appendChild(li);
      });
  });
});

// functii aux
function parsePrice(priceStr) {
  if (!priceStr) return Infinity;
  return parseFloat(priceStr.replace(/[^\d,]/g, "").replace(",", "."));
}

function getCheapestProduct(products) {
  if (!products || products.length === 0) return null;
  return products.reduce((min, p) => {
    return parsePrice(p.price) < parsePrice(min.price) ? p : min;
  });
}

function isValidLink(link) {
  return typeof link === "string" && link.startsWith("http");
}