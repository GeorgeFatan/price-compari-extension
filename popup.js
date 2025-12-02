document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const input = document.getElementById("productSearch");
  const resultsList = document.getElementById("results");

  searchBtn.addEventListener("click", () => {
    const query = input.value.trim();
    resultsList.innerHTML = ""; 

    if (!query) {
      const li = document.createElement("li");
      li.textContent = "⚠️ Introdu un nume de produs!";
      resultsList.appendChild(li);
      return;
    }

    
    const url = `http://localhost:3000/search?name=${encodeURIComponent(query)}`;
    window.open(url, "_blank"); // deschidem rezultatele intr-o fila noua.
    // urmeaza sa afisam rezultatele din localhost in interfata extensiei 
    // in loc sa deschidem o fila noua. 
    // o sa facem sa afisam pe extensie doar cel mai mic pret al unui produs in functie de 
    // numele acestuia pe care il cautam
  });
});