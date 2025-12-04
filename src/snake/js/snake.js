// vitesse du snake
let speedX = 0;
let speedY = 0;

// coordonnées de la nourriture à prendre
let foodX, foodY;

// retourne un tableau [foodX, foodY] générées au hasard
function genFoodCoordinates(nbRows, nbCols){
    let food = [];
    food[0] = Math.Random() * nbCols; // 0 <= food[0] <= nbCols
    food[1] = Math.Random() * nbRows; // 0 <= food[1] <= nbRows

    return food;
}
