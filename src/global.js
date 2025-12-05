let ptsSnake = sessionStorage.getItem('snake');
let ptsGaf = sessionStorage.getItem('gaf');

document.getElementById('ptsGAFAM').innerHTML = ptsGaf;
document.getElementById('ptsSnake').innerHTML = ptsSnake;
document.getElementById('ptsTotal').innerHTML = ((parseInt(ptsGaf) + parseInt(ptsSnake)));