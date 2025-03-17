export default class DNDservice {
    static BASE_URL = "https://www.dnd5eapi.co";
    static MONSTER_URL = "/api/2014/monsters/";


    constructor() {
        
    }


    getDndData(){
        const url = DNDservice.BASE_URL + DNDservice.MONSTER_URL;
        return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const requests = [];
            const id = 0;
            for (const monster of data.results) {
                const monsterUrl = DNDservice.BASE_URL + monster.url;
                const request = fetch(monsterUrl)
                .then(result => result.json())
                .catch(err => console.log(err));
                
                requests.push(request);
            }           
            // console.log(requests);
            
            return Promise.all(requests);
        })
        .catch(err => console.log(err));
        
        
    }
    getMonsterFromIndex(index){
        return this.getDndData()
        .then(monsters => monsters.find(monster => monster.index.toLowerCase() === index.toLowerCase()))
        .catch(err => console.log(err));
    }

}