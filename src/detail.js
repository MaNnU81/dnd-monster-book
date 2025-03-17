import DNDservice from "./services/dndservice.js";

const dService = new DNDservice();


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const index = getParameterByName("index");
const monsterPromise = dService.getMonsterFromIndex(index);
monsterPromise.then(monster => render(monster));

function render(monster) {
    const BASE_URL = "https://www.dnd5eapi.co";
    const monsterDetail = document.getElementById("monster-detail");
    monsterDetail.innerHTML = "";
    const monsterName = document.createElement("span");
    let node = document.createTextNode('Nome: ' + monster.name);
    monsterName.appendChild(node);
    const monsterImg = document.createElement("img");
    if (monster.image === undefined) {
        monsterImg.src = "/assets/download.jpg";
    } else {
        monsterImg.src = BASE_URL + monster.image;
    }
    
    monsterImg.classList.add('imported-img'); 

    const monsterType = document.createElement("span");
    node = document.createTextNode('Type: ' + monster.type);
    monsterType.appendChild(node);
    const monsterHP = document.createElement("span");
    node = document.createTextNode('Hit Point: ' + monster.hit_points);
    monsterHP.appendChild(node);
    const monsterXp = document.createElement("span");
    node = document.createTextNode('XP: ' + monster.xp);
    monsterXp.appendChild(node);
  
    
    monsterDetail.append(monsterImg, monsterName, monsterType, monsterHP, monsterXp);
}


'Autore: ' + author.name