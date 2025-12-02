const send = require("send");

console.log("Background script pornit");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "searchProduct"){
        const code = request.code;

        fetch(`https://localhost:3000/search?name=${encodeURIComponent(code)}`)
        .then(response => response.json())
        .then(data => {
          sendResponse(data);
        })

        .catch(error => {
           console.error("Eroare la comunicarea cu serverul:", error);
           sendResponse([]);
        });
        
        return true; // Indică faptul că răspunsul va fi asincron
    }
   

});