import { DataFetcher } from "./fetchData.js";

export class GamesByCat {
    constructor() {
        this.games = undefined;
        this.featured = [];
        this.status = false;
    }
    async init(key) {
        const fetcher = new DataFetcher('games', 'category');
        const result = await fetcher.fetchData(fetcher.endPoints[key]);
        this.status = result[0];
        this.games = result[1];
        if (this.status) this.createFeaturedGames(3);
    }
    createFeaturedGames(count) {
        for (let i = 0; i < Math.min(count, this.games.length); i++)
            this.featured.push(this.games[i]);
    }
}

export class SingleGame {
    constructor() {
        this.game = undefined;
        this.status = false;
    }
    async init(key) {
        const fetcher = new DataFetcher('game', 'id');
        const result = await fetcher.fetchData(key);
        this.status = result[0];
        this.game = result[1];
    }
}