export class DataFetcher {
    constructor(remainingURL, key) {
        this.baseURL = 'https://free-to-play-games-database.p.rapidapi.com/api/' + remainingURL;
        this.endPoints = ['mmorpg', 'shooter', 'sailing', 'permadeath', 'superhero', 'pixel'];
        this.key = key;
        this.options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b2552e4d34mshfdaee21e3d32aacp1c7936jsnfa2b4c4107c1',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
    }
    async fetchData(val) {
        try {
            const url = this.baseURL + `?${this.key}=${val}`;
            const api = await fetch(url, this.options);
            if(api.status==200){
                const data = await api.json();
                return [true,data];
            }
            else{
                const data = await api.json();
                return [false,data];
            }
        }
        catch (error) {
            return [false,error];
        }
    }
}