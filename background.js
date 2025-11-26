console.log("Background script pornit");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "searchProduct"){
        const code = request.code;

        // simulam cu date fictive
        const results = [
          { name: "Laptop Lenovo", price: "2999 RON", site: "eMAG" },
          { name: "Laptop Lenovo", price: "2899 RON", site: "Altex" },
          { name: "Laptop Lenovo", price: "2950 RON", site: "Flanco" }

        ];
        sendResponse(results);
    }
    return true; // Indică că vom răspunde asincron

});