/*---------------*/
/*--- CHATBOT ---*/
/*---------------*/

const questionsReponses = {
    "pourquoi":
	    ["Parce que.", 
        "Et pourquoi pas ?", 
        "J'sais pas, mais t'as Google nan ?", 
        "Voici un endroit où tu pourrais avoir ta réponse : https://fr.yahoo.com/"],

    "Pourquoi":
	    ["Parce que.", 
        "Et pourquoi pas ?", 
        "J'sais pas, mais t'as Google nan ?", 
        "Voici un endroit où tu pourrais avoir ta réponse : https://fr.yahoo.com/"],

    "qui": 
        ["Le Z est parfait pour cette mission !",
        "Linus Torvald, ce mec sait tout faire.",
        "Et pourquoi pas toi ?",
        "ChatGPT (Bien plus compétent que moi).",
        "DeepSeek (Bien meilleur que ChatGPT !).",
        "Je ne sais pas, mais peut-être que ce lien t'aidera (j'insiste sur 'peut-être') : https://www.fakepersongenerator.com/ "],

    "Qui": 
        ["Le Z est parfait pour cette mission !",
        "Linus Torvald, ce mec sait tout faire.",
        "Et pourquoi pas toi ?",
        "ChatGPT (Bien plus compétent que moi).",
        "DeepSeek (Bien meilleur que ChatGPT !).",
        "Je ne sais pas, mais peut-être que ce lien t'aidera (j'insiste sur 'peut-être') : https://www.fakepersongenerator.com/ "],

    "où": 
        ["Dans ton... Chat ! (Excellente appli au demeurant)",
        "T'as essayé de chercher au moins ? Genre c'est vraiment évident.",
        "Tu sais, je pense que tu ne te pose pas la bonne question. Finalement, est-ce que tout ce que nous voulons et nous cherchons ne se trouve pas en chacun de nous ? Puisque bon, soyons honnête, de nos jours les gens les gens se concentrent plus sur l'extérieur que sur l'intérieur, sur la forme que sur le fond, sur le paraître que l'être. Et finalement c'est ce nombrilisme qui empêche de voir ce que l'on cherche, qui empêche donc d'accéder au bonheur !"],

    "Où": 
        ["Dans ton... Chat ! (Excellente appli au demeurant)",
        "T'as essayé de chercher au moins ? Genre c'est vraiment évident.",
        "Tu sais, je pense que tu ne te pose pas la bonne question. Finalement, est-ce que tout ce que nous voulons et nous cherchons ne se trouve pas en chacun de nous ? Puisque bon, soyons honnête, de nos jours les gens les gens se concentrent plus sur l'extérieur que sur l'intérieur, sur la forme que sur le fond, sur le paraître que l'être. Et finalement c'est ce nombrilisme qui empêche de voir ce que l'on cherche, qui empêche donc d'accéder au bonheur !"],

    "quand": 
        ["15 cent 15 Marignan !",
        "Hier nan ?", 
        "Cette idée de temporalité ne fais vraiment de sens pour moi, en tant que bot."], 

    "Quand": 
        ["15 cent 15 Marignan !",
        "Hier nan ?", 
        "Cette idée de temporalité ne fais vraiment de sens pour moi, en tant que bot."], 

    "situation": 
        ["Mais, vous savez, moi je ne crois pas qu'il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd'hui avec vous, je dirais que c'est d'abord des rencontres. Des gens qui m'ont tendu la main, peut-être à un moment où je ne pouvais pas, où j'étais seul chez moi. Et c'est assez curieux de se dire que les hasards, les rencontres forgent une destinée... Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l'interlocuteur en face, je dirais, le miroir qui vous aide à avancer. Alors ce n'est pas mon cas, comme je le disais là, puisque moi au contraire, j'ai pu. Et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... Je ne suis qu'amour! Et finalement, quand beaucoup de gens aujourd'hui me disent : 'Mais comment fais-tu pour avoir cette humanité ?' Eh bien je leur réponds très simplement, je leur dis que c'est ce goût de l'amour. Ce goût donc qui m'a poussé aujourd'hui à entreprendre une construction mécanique, mais demain, qui sait, peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi..."],

    "Situation": 
        ["Mais, vous savez, moi je ne crois pas qu'il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd'hui avec vous, je dirais que c'est d'abord des rencontres. Des gens qui m'ont tendu la main, peut-être à un moment où je ne pouvais pas, où j'étais seul chez moi. Et c'est assez curieux de se dire que les hasards, les rencontres forgent une destinée... Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l'interlocuteur en face, je dirais, le miroir qui vous aide à avancer. Alors ce n'est pas mon cas, comme je le disais là, puisque moi au contraire, j'ai pu. Et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... Je ne suis qu'amour! Et finalement, quand beaucoup de gens aujourd'hui me disent : 'Mais comment fais-tu pour avoir cette humanité ?' Eh bien je leur réponds très simplement, je leur dis que c'est ce goût de l'amour. Ce goût donc qui m'a poussé aujourd'hui à entreprendre une construction mécanique, mais demain, qui sait, peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi..."],

    "quoi":
        ["FEUR",
        "Quoi quoi ?",
        "TU VEUX MA PHOTO ?",
        "Romain m'a codé mais au final c'est Nathan qui rédige cette réponse, maintenant incline toi misérable paysan MOUAHAHAHHAAHAH",
        "Tu veux ma photo ?"],
    
    "Quoi":
        ["FEUR",
        "TU VEUX MA PHOTO ?",
        "Quoi quoi ?",
        "Romain m'a codé mais au final c'est Nathan qui rédige cette réponse, maintenant incline toi misérable paysan MOUAHAHAHHAAHAH",
        "Tu veux ma photo ?"],
    
    "comment":
        ["Savais-tu que les chiots sont les petits des chiens ? c'est fou !",
        "Diegoooo",
        "MAMAMIA",
        "KESK'IL'Y'A???",
        "De ?"],
    
    "Comment":
        ["Savais-tu que les chiots sont les petits des chiens ? c'est fou !",
        "Diegoooo",
        "MAMAMIA",
        "KESK'IL'Y'A???",
        "De ?"],

    "bonjour":
        ["Nombril.",
        "Bonsoir",
        "Bien le bonjour chère camarade, comment pourrais-je t'indiquer de ne plus m'utiliser à l'avenir ?",
        "Il fait beau"],

    "Bonjour":
        ["Nombril.",
        "Bonsoir",
        "Bien le bonjour chère camarade, comment pourrais-je t'indiquer de ne plus m'utiliser à l'avenir ?",
        "Il fait beau"],

    "NIRD":
        ["Effectivement je ne suis pas un nerd mais un nird, Nirdy, mais en vrai je suis que un chatbot complètement nul...un chat'bruti...",
        "Kei cu minung ka si lo",
        "אני לא בן אדם",
        "मैं इंसान नहीं हूँ",
        "Me na sim manuš",
        "es naasu cylvāks ."
        ],

    "nird":
        ["Effectivement je ne suis pas un nerd mais un nird, Nirdy, mais en vrai je suis que un chatbot complètement nul...un chat'bruti...",
        "Kei cu minung ka si lo",
        "אני לא בן אדם",
        "मैं इंसान नहीं हूँ",
        "Me na sim manuš",
        "es naasu cylvāks ."
        ],

    "Nird":
        ["Effectivement je ne suis pas un nerd mais un nird, Nirdy, mais en vrai je suis que un chatbot complètement nul...un chat'bruti...",
        "Kei cu minung ka si lo",
        "אני לא בן אדם",
        "मैं इंसान नहीं हूँ",
        "Me na sim manuš",
        "es naasu cylvāks ."
        ],

    "merci":
        ["s<dgfdJKLGFEFKeIOGFDOFHSFgdOFESHF",
        "difhiugfdsfdsbvdouvsgvousougf",
        "dihguopvduofaeOUFDGAEZTEIUFKIEZYEIUIGOQERULFHRU",
        "lghlrhjdsgrhgiohgrgiyeufhguldyefirgrugfehgfsuehgkjfghlghrgoiqfgfqjkgrskgfhshfhereroghrlghqfudghfskfdqsqfgqesrgfqsrlggqrgrfghrqkhfhgfbdqsfughfdkghfbqdsukgbvfulkghsfgfjgfdlgfslqhdsgfghlfkjv",
        "ldfkvjfhgfdkhjkjghgsfhdfdg_ÇZ'R-'TÈÈ_('(T'_È(T'(ÈAZ_EYRAÈ_''YTRAÈZRY",
        "Je vous déteste.",
        "Derien..."
        ],

    "Merci":
        ["s<dgfdJKLGFEFKeIOGFDOFHSFgdOFESHF",
        "difhiugfdsfdsbvdouvsgvousougf",
        "dihguopvduofaeOUFDGAEZTEIUFKIEZYEIUIGOQERULFHRU",
        "lghlrhjdsgrhgiohgrgiyeufhguldyefirgrugfehgfsuehgkjfghlghrgoiqfgfqjkgrskgfhshfhereroghrlghqfudghfskfdqsqfgqesrgfqsrlggqrgrfghrqkhfhgfbdqsfughfdkghfbqdsukgbvfulkghsfgfjgfdlgfslqhdsgfghlfkjv",
        "ldfkvjfhgfdkhjkjghgsfhdfdg_ÇZ'R-'TÈÈ_('(T'_È(T'(ÈAZ_EYRAÈ_''YTRAÈZRY",
        "Je vous déteste.",
        "Derien..."
        ],

    ""
    }

// Si dernier mot fini en "quoi" : 
// 	    - ...feur ! Haha je t'ai bien eu !
// 	    - ...coubeh ! Haha je t'ai bien eu !
// 	    - Si j'eu été de mauvais esprit, il y a bien des réponses que j'aurai pu formuler pour aboutir à une blague de mauvais goût.


document.addEventListener("DOMContentLoaded", function() {  /* event listener qui appelle la fonction anonyme quand la page est entièrement chargée */
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeBtn = document.getElementById("close-btn");  /* bouton pour fermer le chatbot */
    const sendBtn = document.getElementById("send-btn");    /* bouton pour envoyer le message */
    const chatBotInput = document.getElementById("chatbot-input"); /* input texte */
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatBotIcon = document.getElementById("chatbot-icon");

    chatBotIcon.addEventListener("click", () => {           /* fonction pour ouvrir le chatbot en cliquant sur l'icone */
        chatbotContainer.classList.remove("hidden");        /* enlève le tag hidden du css */
        chatBotIcon.style.display = "none";                 /* applique le style none à l'icone pour la masquer */
    })
    closeBtn.addEventListener("click", () => {              /* fonction qui enlève le chatbot et réaffiche l'icone */
        chatbotContainer.classList.add("hidden");
        chatBotIcon.style.display = "flex";
    })

    sendBtn.addEventListener("click", sendMessage);         /* event listener sur le sentbutton sur le click */

    chatBotInput.addEventListener("keypress", (e) => {      /* event listener sur le chatbotinput sur l'appui sur touche enter */
        if(e.key === "Enter") 
        {
            sendMessage();
        } 
    })
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sendMessage () {                                   /* fonction qui transforme l'input en message affiché dans le chatbot */
    const userMessage = document.getElementById("chatbot-input").value.trim();
    if(userMessage){
        appendMessage("user", userMessage);
        document.getElementById("chatbot-input").value.trim();
        document.getElementById("chatbot-input").value = ""; /* clear le chatbot input */
        getBotResponse(userMessage);
    }
}

function appendMessage(sender,message) {                    /* fonction qui ajoute le message à la suite des autres */
    const messageContainer = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message",sender);
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    /*messageContainer.scrollTop = messageContainer.scrollHeight;*/
    /*messageContainer.scrollTo({ top: messageContainer.scrollHeight, behavior: 'smooth' });*/
    setTimeout(() => {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 0);
}

function getBotResponse(userMessage)
{
    var trouve = false;
    let motCle;
    userMessage = userMessage.replace(',',' ');             /* enlever la ponctuation du message */
    userMessage = userMessage.replace('.',' ');
    userMessage = userMessage.replace('!',' ');
    userMessage = userMessage.replace('?',' ');
    userMessage = userMessage.replace('-',' ');
    userMessage = userMessage.replace(',',' ');
    console.log(userMessage);
    if(userMessage.includes(' ')) 
    {
        tabUserInput = userMessage.split(' ');          /* faire un split sur les espaces */
    }   
    else
    {
        userMessage = userMessage + ' ';
        console.log(userMessage);
        tabUserInput = userMessage.split(' ');          /* faire un split sur les espaces */

    }           
    console.log("longueur tabUserInput =" + tabUserInput.length );

    for(let x in questionsReponses)                         /* vérifier si correspondance entre les mots splités et les clés du dico questionsReponses */
    {
        for(let y = 0; y < tabUserInput.length -1; y++)
        {
            if(x == tabUserInput[y])
            {
                trouve = true;
                motCle = tabUserInput[y];                   /* sauvegarder le mot qui matche */
            }
        }
    }

    if(!trouve)
    {
        appendMessage("bot", "Je n'ai pas compris ta question."); /* si pas de correspondance */
    }
    else                                                    /* si correspondance */ 
    {
        let nbReponses = questionsReponses[motCle].length;
        console.log(nbReponses);
        appendMessage("bot", questionsReponses[motCle][getRandomInt(nbReponses -1)]);
    }
}