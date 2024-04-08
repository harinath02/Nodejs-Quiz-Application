const exitButton = document.getElementById("exit-btn");



function goToHomepage() {
    window.location.href ='http://localhost:5000';
}

exitButton.addEventListener("click", goToHomepage);