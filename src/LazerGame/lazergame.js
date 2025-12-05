score = 0;
let gameDuration = 5; // secondes
let gameActive = true;
let gamePaused = false;


let LazerGame = function(){

    // Curseur laser
    document.body.style.cursor = "url('Laser_Cursor.png'), default";

    let canvas = document.querySelector('#x');
    let icon_template = document.querySelector('#template');
    let icon_height = 40;
    let icon_width = 40;
    

    let descriptions = {
    "Facebook": "Super pour discuter, mais clairement, il ne faut pas espérer garder tes données privées !",
    "Microsoft": "L'une des plus grandes entreprises informatiques. Egalement connue pour récolter tes données. Ils participent également à l'obsolescence des ordinateurs !",
    "Instagram": "Application populaire de partage de photos. Faisant partie du groupe de Facebook.",
    "Amazon": "Le géant mondial du e-commerce, ils participent à l'obsolescence du matériel. Alors qu'on pourrait réparer et garder notre matériel bien plus longtemps !",
    "Tchap": "La messagerie sécurisée utilisé par les ministères et les cabinets !",
    "Primtux": "Distribution Linux éducative destinée aux écoles. Idéale pour faire fonctionner des vieux ordinateurs et leur donner une seconde vie !"
};
let alreadyShown = {
    "Facebook": false,
    "Microsoft": false,
    "Instagram": false,
    "Amazon": false,
    "Tchap": false,
    "Primtux": false
};

function showPopup(text, x, y) {
    // Mettre le jeu en pause
    gamePaused = true;

    let popup = document.createElement("div");
    popup.className = "infoPopup";
    popup.textContent = text;

    popup.style.left = (x + 45) + "px";  // légèrement à droite
    popup.style.top = (y - 10) + "px";   // légèrement au-dessus

    document.body.appendChild(popup);

    // Disparaît après 1,5 s et reprend le jeu
    setTimeout(() => {
        popup.remove();
        gamePaused = false;
    }, 5000);
}



    // Images disponibles
    let tab_images = [
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/fr/b/b0/Tchap01.png",
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logo_Primtux_vertical-Fond_clair.png"
    ];

    // Points selon l'image
    let pointsTable = {
        "Facebook": 10,
        "Microsoft": 15,
        "Instagram": 20,
        "Amazon": 5,
        "Tchap": -25,
        "Primtux": -30
    };

    // Choisir une image aléatoire
    let pickRandomImage = () => tab_images[Math.floor(Math.random() * tab_images.length)];

    // Coordonnées aléatoires
    let randomCoord = function() {
        let max_height = canvas.offsetHeight - icon_height;
        let max_width = canvas.offsetWidth - icon_width;
        return [
            Math.floor(Math.random() * max_width),
            Math.floor(Math.random() * max_height)
        ];
    };

    // Création d'une image clicable
    let createImage = function(){
    if (!gameActive) return;

    let node = icon_template.cloneNode(true);
    let xy = randomCoord();
    node.removeAttribute('id');
    node.removeAttribute('hidden');

    let src = pickRandomImage();
    node.style.top = xy[1] + 'px';
    node.style.left = xy[0] + 'px';
    node.setAttribute('src', src);

    node.addEventListener("click", function(){
    if (!gameActive || gamePaused) return; // <-- ici on bloque pendant la pop-up

    let key = "";

    if (src.includes("Facebook")) key = "Facebook";
    else if (src.includes("Microsoft")) key = "Microsoft";
    else if (src.includes("Instagram")) key = "Instagram";
    else if (src.includes("Amazon")) key = "Amazon";
    else if (src.includes("Tchap")) key = "Tchap";
    else if (src.includes("Primtux")) key = "Primtux";

    score += pointsTable[key] || 1;
    document.querySelector("#scoreDisplay").textContent = "Score : " + score;

    // POP-UP la première fois
    if (!alreadyShown[key]) {
        alreadyShown[key] = true;
        showPopup(descriptions[key], xy[0], xy[1]);
    }

    node.remove();
    createImage(); // nouvelle image immédiate
});


    canvas.appendChild(node);
};


    // Lancer 10 images au départ
    for (let i = 0; i < 10; i++){
        createImage();
    }

    // Timer de la partie
    let timeLeft = gameDuration;
    let timerDiv = document.querySelector("#timer");

    let countdown = setInterval(function(){

    if (!gameActive || gamePaused) return; // <-- pause également le timer
    timeLeft--;

    if (timerDiv) timerDiv.textContent = "Temps : " + timeLeft + " sec";

    if (timeLeft <= 0){
        gameActive = false;
        clearInterval(countdown);

        // Stopper le jeu
        canvas.innerHTML = `
            <h1>FIN DU JEU</h1>
            <h2>Score : ${score}</h2>
            <button id="menuBtn">Retour au menu</button>
        `;

        document.querySelector("#menuBtn").addEventListener("click", function(){
            window.location.href = "../index.html";
        });
    }
sessionStorage.setItem('Gaf', score);
}, 1000);
};
