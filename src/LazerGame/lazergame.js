let score = 0;


let LazerGame = function(){
    let bodyCursor = document.getElementsByTagName("body")[0];
    bodyCursor.style.cursor = "url('Laser_Cursor.png'), default";

    let canvas = document.querySelector('#x');
    let icon_template = document.querySelector('#template');
    let icon_height = 40;
    let icon_width = 40;

    let tab_images = [
        "https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/fr/b/b0/Tchap01.png",
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logo_Primtux_vertical-Fond_clair.png"];
 
    let pickRandomImage = function(){
        let i = Math.floor(Math.random() * tab_images.length);
        return tab_images[i];
    };
    let total_number_of_images = 10;
    let max_height = canvas.offsetHeight - icon_height;
    let max_width = canvas.offsetWidth - icon_width;
    let randomCoord = function(){
        var r = []
        var x = Math.floor(Math.random() * max_width);
        var y = Math.floor(Math.random() * max_height);
        r = [x,y];
        return r;
    };

    let createImage = function(){
        let node = icon_template.cloneNode(true);
        let xy = randomCoord();
        node.removeAttribute('id');
        node.removeAttribute('hidden');
        node.style.top = xy[1] + 'px';
        node.style.left = xy[0] + 'px';
        node.setAttribute('src', pickRandomImage());
        //node.setAttribute('class', "cible");
        canvas.appendChild(node);

    };
    for (let i=0; i<total_number_of_images;i++){
        createImage();
    };

};
//Shit went WRONG doesn't work for some reason, need a break
//let goodShot = function(){
//    score += 100;
//    console.log("OpenSource");
//};
//let badShot = function(){
//    score -= 50;
//    console.log("GAFAM");
//};
//var checkShot = function(cible){
//    let source = cible.src;
//    if (source.includes("Facebook") || source.includes("Microsoft") || source.includes("Instagram") || source.includes("Amazon"))
//    {
//        badShot();
//    }
//    else
//    {
//        goodShot();
//    }
//}
//
//var cible = document.getElementsByTagName("img");
//cible.addEventListener('click', checkShot(cible));

