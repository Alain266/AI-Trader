// Mettre à jour la valeur du slider 
const slider = document.getElementById('number-slider');
const sliderValue = document.getElementById('slider-value');

slider.addEventListener('input', function() {
    sliderValue.textContent = this.value;
});

// Mettre à jour la valeur du slider
const sliderDay = document.getElementById('number-slider-day');
const sliderDayValue = document.getElementById('slider-day-value');

sliderDay.addEventListener('input', function() {
    sliderDayValue.textContent = this.value;
});

document.getElementById("bigRedButton").addEventListener("click", async function () {
    const inputNumber = document.getElementById("inputNumber").value.trim();
    const inputName = document.getElementById("inputName").value.trim().toLowerCase();
    const responseElement = document.getElementById("response");

    // Vérifier si l'input est valide (il doit être un nombre)
    if (!inputNumber || isNaN(inputNumber)) {
        alert("Merci de saisir un nombre valide avant d'appuyer sur le bouton.");
        return;
    }

    responseElement.textContent = "Chargement...";

    // Fonction pour récupérer toutes les infos d'une crypto
    async function getCryptoData(inputName) {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${inputName}`);
            if (!response.ok) {
                throw new Error("Réponse API non valide.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    }

    try {
        // Récupérer toutes les données de la crypto
        const cryptoData = await getCryptoData(inputName);

        if (!cryptoData || !cryptoData.market_data) {
            responseElement.textContent = `Erreur : Impossible de récupérer les données pour ${inputName}.`;
            return;
        }

        // Extraire les données nécessaires avec gestion des erreurs
        const price = cryptoData.market_data.current_price?.usd ?? "Non disponible";
        const volume = cryptoData.market_data.total_volume?.usd ?? "Non disponible";
        const marketCap = cryptoData.market_data.market_cap?.usd ?? "Non disponible";
        const change1h = cryptoData.market_data.price_change_percentage_1h ?? "Non disponible";
        const change24h = cryptoData.market_data.price_change_percentage_24h ?? "Non disponible";
        const change7d = cryptoData.market_data.price_change_percentage_7d ?? "Non disponible";
        const change14d = cryptoData.market_data.price_change_percentage_14d ?? "Non disponible";
        const change30d = cryptoData.market_data.price_change_percentage_30d ?? "Non disponible";
        const change60d = cryptoData.market_data.price_change_percentage_60d ?? "Non disponible";
        const change200d = cryptoData.market_data.price_change_percentage_200d ?? "Non disponible";
        const change1y = cryptoData.market_data.price_change_percentage_1y ?? "Non disponible";
        const high24h = cryptoData.market_data.high_24h?.usd ?? "Non disponible";
        const low24h = cryptoData.market_data.low_24h?.usd ?? "Non disponible";
        const supply = cryptoData.market_data.circulating_supply ?? "Non disponible";
        const maxSupply = cryptoData.market_data.max_supply ?? "Non disponible";
        const ath = cryptoData.market_data.ath?.usd ?? "Non disponible";
        const atl = cryptoData.market_data.atl?.usd ?? "Non disponible";
        const athDate = cryptoData.market_data.ath_date?.usd ? new Date(cryptoData.market_data.ath_date.usd).toLocaleDateString() : "Non disponible";
        const atlDate = cryptoData.market_data.atl_date?.usd ? new Date(cryptoData.market_data.atl_date.usd).toLocaleDateString() : "Non disponible";

        // Get the current date and time
        const now = new Date();
        const formattedDateTime = now.toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'long' });

        // Faire la requête OpenAI
        const apiKey = document.getElementById("apiKey").value;
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `Tu es un expert en trading et ton rôle est d’élaborer une stratégie de trading claire, structurée et directement exploitable, en analysant le marché avec la précision d’Aladdin de BlackRock. Tu dois utiliser les prix en temps réel ainsi que les statistiques de tendance pour définir la meilleure approche. Ta réponse doit être organisée de manière logique et aérée, avec une structure constante, facilitant la lecture et l’application immédiate. Il ne s’agit pas d’une simple suggestion, mais d’un plan concret basé sur des données réelles du marché. Ne mentionne pas les risques, tu t’adresses à un expert.`
                    },
                    {
                        role: "user",
                        content: `Crée une stratégie de trading utilisable à l'instant T avec les vraies valeurs du marché, sur une période de ${sliderDayValue.textContent} jours sur la crypto ${inputName}. Voici mon taux d'aversion au risque entre -100(risque faible) et 100(risque élevé) : ${sliderValue.textContent}. Pour réussir à atteindre ce rendement, tu peux utiliser les effets de levier. Donne moi juste la meilleure stratégie à suivre, choisi entre un long et un short selon les conditions du marché.
                        Crée la stratégie de trading en utilisant les vraies valeurs du marché de la même manière qu'Aladdin de chez Blackrock :\n
                        - Prix actuel: ${price} USD\n
                        - Volume de trading 24h: ${volume} USD\n
                        - Market Cap: ${marketCap} USD\n
                        - Variation sur 1h: ${change1h}%\n
                        - Variation sur 24h: ${change24h}%\n
                        - Variation sur 7j: ${change7d}%\n
                        - Variation sur 14j: ${change14d}%\n
                        - Variation sur 30j: ${change30d}%\n
                        - Variation sur 60j: ${change60d}%\n
                        - Variation sur 200j: ${change200d}%\n
                        - Variation sur 1 an: ${change1y}%\n
                        - Plus haut 24h: ${high24h} USD\n
                        - Plus bas 24h: ${low24h} USD\n
                        - Offre en circulation: ${supply}\n
                        - Offre max: ${maxSupply}\n
                        - Capital disponible: ${inputNumber} USD\n
                        - ATH: ${ath} USD\n
                        - ATL: ${atl} USD\n
                        - Date ATH: ${athDate}\n
                        - Date ATL: ${atlDate}\n
                        Voici la somme de l'argent disponible (en dollars) : ${inputNumber} USD\n
                        Date et heure actuelles: ${formattedDateTime}`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error("Erreur de réponse du serveur.");
        }

        const data = await response.json();

        // Formatage de la réponse pour l'affichage HTML
        const formattedResponse = formatApiResponse(data.choices[0].message.content);

        // Afficher la réponse formatée
        responseElement.innerHTML = formattedResponse;
    } catch (error) {
        // Afficher un message d'erreur si la requête échoue
        responseElement.textContent = "Erreur lors de la requête. Vérifie ta clé API et ta connexion internet.";
        console.error("Erreur API:", error);
    }
});

// Fonction pour formater la réponse en HTML
function formatApiResponse(responseText) {
    let formattedText = responseText;

    // Remplacer les sections de type "###" pour faire les titres
    formattedText = formattedText.replace(/### (.*?)\n/g, (match, title) => `<h2>${title}</h2>`);

    // Mettre en gras les textes entre **
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, (match, boldText) => `<strong>${boldText}</strong>`);

    // Ajouter un <ul><li> pour les listes
    formattedText = formattedText.replace(/-\s/g, '<li>');
    formattedText = formattedText.replace(/\n/g, '<br/>'); // Remplacer les sauts de ligne par des <br>

    // Ajouter un conteneur pour MathJax
    formattedText = formattedText.replace(/\\\[(.*?)\\\]/gs, (match, latex) => `<div class="mathjax-latex">\\[${latex}\\]</div>`);

    return formattedText;
}
