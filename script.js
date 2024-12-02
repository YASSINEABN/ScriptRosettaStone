function findAndClickSkipButton() {
    const skipButton = document.querySelector('div[data-qa="SubmitButton"][data-qa-button-text="Skip"].css-wcw8ka');
    const targetDiv = document.querySelector('.css-gcvp4');

    if (skipButton && skipButton.innerHTML === "Skip" && targetDiv) {
        console.log("Skip button and target div found. Starting random clicks for 1 minute...");

        const indicatorContainer = document.createElement('div');
        indicatorContainer.style.position = 'fixed';
        indicatorContainer.style.top = '0';
        indicatorContainer.style.left = '0';
        indicatorContainer.style.width = '100%';
        indicatorContainer.style.height = '100%';
        indicatorContainer.style.pointerEvents = 'none';
        indicatorContainer.style.zIndex = '9999';
        document.body.appendChild(indicatorContainer);

        const startTime = Date.now();
        const clickInterval = setInterval(() => {
            if (targetDiv) {
                const randomX = Math.random() * targetDiv.clientWidth;
                const randomY = Math.random() * targetDiv.clientHeight;
                
                const indicator = document.createElement('div');
                indicator.style.position = 'absolute';
                indicator.style.width = '20px';
                indicator.style.height = '20px';
                indicator.style.borderRadius = '50%';
                indicator.style.backgroundColor = 'red';
                indicator.style.opacity = '0.7';
                indicator.style.transform = 'translate(-50%, -50%)';
                
                const rect = targetDiv.getBoundingClientRect();
                indicator.style.left = `${rect.left + randomX}px`;
                indicator.style.top = `${rect.top + randomY}px`;
                indicatorContainer.appendChild(indicator);

                setTimeout(() => {
                    indicator.style.transition = 'opacity 0.5s';
                    indicator.style.opacity = '0';
                    setTimeout(() => indicatorContainer.removeChild(indicator), 500);
                }, 300);

                const clickX = rect.left + randomX + window.scrollX;
                const clickY = rect.top + randomY + window.scrollY;

                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: clickX,
                    clientY: clickY
                });

                targetDiv.dispatchEvent(clickEvent);
                console.log(`Clicked at position (${clickX.toFixed(2)}, ${clickY.toFixed(2)})`);
            }

            if (Date.now() - startTime >= 1 * 60 * 1000) {
                clearInterval(clickInterval);

                if (indicatorContainer.parentNode) {
                    document.body.removeChild(indicatorContainer);
                }

                console.log("1 minute of random clicks completed. Clicking Skip button...");
                skipButton.click();
                console.log("Restarting process...");

                setTimeout(findAndClickSkipButton, 2000);
            }
        }, 500);
    } else {
        console.log("Skip button or target div not found. Retrying in 5 seconds...");
        setTimeout(findAndClickSkipButton, 5000);
    }
}

findAndClickSkipButton();
