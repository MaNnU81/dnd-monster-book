import DNDservice from "./services/dndservice.js";

const dService = new DNDservice();

dService.getDndData().then(data => render(data));

function render(data) {
    const monsterContainer = document.getElementById("monster-container");
    monsterContainer.innerHTML = "";
    const BASE_URL = "https://www.dnd5eapi.co";
    for (const monster of data) {
        // console.log(monster);
        
        const monsterDiv = document.createElement("a");
        monsterDiv.href = "/detail.html?index=" + monster.index;
        monsterDiv.target =  "_blank"
        const monsterImg = document.createElement("img");

        if (monster.image === undefined) {
            monsterImg.src = "/assets/download.jpg";
        } else {
            monsterImg.src = BASE_URL + monster.image;
        }
        monsterImg.width = "200";

        const monsterLink = document.createElement("span");
        
        const node = document.createTextNode(monster.name);

        monsterLink.appendChild(node);
        monsterDiv.append(monsterImg, monsterLink);
        monsterContainer.appendChild(monsterDiv)
    }




    // console.log(data);


}



