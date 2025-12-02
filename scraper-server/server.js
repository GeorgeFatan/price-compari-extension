const express = require("express");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;

app.get("/search", async (req, res) => {
    const name = req.query.name;
    console.log("Cerere primita pentru produs:", name);

    const results = [];

    // eMAG
    try {
        console.log("Caut pe eMAG.ro.");
        const emagURL = `https://www.emag.ro/search/${encodeURIComponent(name)}`;
        const emagHtml = await fetch(emagURL).then(response => response.text());
        const $emag = cheerio.load(emagHtml);

        $emag(".card-v2").each((i, el) => {
            const title = $emag(el).find(".card-v2-title").text().trim();
            const price = $emag(el).find(".product-new-price").text().trim();
            if (title && price) {
                results.push({ site: "eMAG", name: title, price });
            }
        });
    } catch (error) {
        console.error("Eroare la scraping eMAG:", error);
    }

    if (results.length === 0) {
        results.push({ site: "N/A", name: "Produsul nu a fost gasit", price: "-" });
    }

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Serverul ruleaza la http://localhost:${PORT}`);
});