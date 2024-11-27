function findAndClickSkipButton() {
    const button = document.querySelector('div[data-qa="SubmitButton"][data-qa-button-text="Skip"].css-wcw8ka');
    
    if (button && button.innerHTML === "Skip") {
        console.log("Bouton trouvé. Attente de 5 minutes avant de cliquer...");
                setTimeout(() => {
            console.log("Clique sur le bouton...");
            button.click();

            console.log("Redémarrage de la recherche...");
            findAndClickSkipButton();
        }, 5 * 60 * 1000); 
    } else {
        console.log("Bouton introuvable. Nouvelle tentative dans 5 secondes...");
        
        setTimeout(findAndClickSkipButton, 5000);
    }
}
findAndClickSkipButton();
