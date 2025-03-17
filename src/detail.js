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
    let node = document.createTextNode(monster.name);
    monsterName.appendChild(node);
    const monsterImg = document.createElement("img");
    if (monster.image === undefined) {
        monsterImg.src = "/assets/download.jpg";
    } else {
        monsterImg.src = BASE_URL + monster.image;
    }
    monsterImg.width = "200";
    const monsterType = document.createElement("span");
    node = document.createTextNode(monster.type);
    monsterType.appendChild(node);
    const monsterHP = document.createElement("span");
    node = document.createTextNode(monster.hit_points);
    monsterHP.appendChild(node);
    const monsterXp = document.createElement("span");
    node = document.createTextNode(monster.xp);
    monsterXp.appendChild(node);
    const monsterUrl = document.createElement("a");
    if (monster.url === undefined) {
        node = document.createTextNode("non disponibile");
    } else {
        node = document.createTextNode("link al json");
        monsterUrl.href=BASE_URL + monster.url;
    }
    monsterUrl.target = "_blank";
    monsterUrl.appendChild(node);
    monsterDetail.append(monsterImg, monsterName, monsterType, monsterHP, monsterXp, monsterUrl);
}