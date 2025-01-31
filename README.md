# AI Trader Button

## Description
AI Trader Button est une application web qui permet aux utilisateurs de créer une stratégie de trading pour les cryptomonnaies en utilisant des données de marché en temps réel et le modèle GPT-4 d'OpenAI. Les utilisateurs peuvent entrer le nom d'une cryptomonnaie, leur allocation disponible en dollars et leur clé API ChatGPT pour générer une stratégie de trading.

## Fonctionnalités
- Récupération des données de cryptomonnaie en temps réel depuis l'API CoinGecko
- Entrée utilisateur pour le nom de la cryptomonnaie, l'allocation disponible et la clé API
- Sélection du niveau d'aversion au risque à l'aide d'un curseur
- Intégration avec le modèle GPT-4 d'OpenAI pour générer des stratégies de trading
- Affichage de la stratégie de trading générée dans une réponse HTML formatée

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/yourusername/AITrader.git
    ```
2. Accédez au répertoire du projet :
    ```bash
    cd AITrader
    ```

## Utilisation
1. Ouvrez le fichier `index.html` dans votre navigateur web.
2. Entrez le nom de la cryptomonnaie, votre allocation disponible en dollars et votre clé API ChatGPT.
3. Ajustez le niveau d'aversion au risque à l'aide du curseur.
4. Cliquez sur le bouton "Créer une stratégie" pour générer une stratégie de trading.
5. La stratégie générée sera affichée sous le bouton.

## Configuration
- Le fichier `config.js` contient la configuration de la clé API. Assurez-vous de le mettre à jour avec votre propre clé API si nécessaire.

## .gitignore
Le fichier `.gitignore` est configuré pour exclure les éléments suivants :
- `config.js`

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contribuer
Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request pour toute amélioration ou correction de bug.

## Contact
Pour toute question ou demande, veuillez contacter [votre adresse email].
