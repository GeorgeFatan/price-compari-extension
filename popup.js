
document.getElementById("searchBtn").addEventListener("click", () => {
    const code = document.getElementById("productSearch").value;
    chrome.runtime.sendMessage({ action: "searchProduct", code: code }, (response) => {
        const resultsList = document.getElementById("results");
        resultsList.innerHTML = ""; // Clear previous results
        response.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price} (${item.site})`;
            resultsList.appendChild(li);
        });
    });
});


 