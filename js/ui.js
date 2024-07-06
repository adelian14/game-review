import { UI_Helper } from "./uiHelper.js";
import { SingleGame } from "./data.js";

const helper = new UI_Helper();
const createElement = helper.createElement;
const nestElements = helper.nestElements;
const clearDiv = helper.clearDiv
let url='.';

export class GamesDisplayer {
    constructor(games, featured) {
        this.games = games;
        this.featured = featured;
        this.container = document.querySelector('#gameDisplayer');
    }
    createGameElement(game) {
        const col = createElement('div', 'col-xl-3 col-lg-4 col-md-6');
        const gameCard = createElement('div', 'game-card p-2', game.id);
        //imgbox
        const imgBox = createElement('div', 'img-box mb-2');
        const img = createElement('img', 'w-100');
        const overlay = createElement('div', 'overlay');
        img.setAttribute('src', game.thumbnail);
        nestElements(imgBox, img);
        nestElements(imgBox, overlay);
        //title card
        const titleCard = createElement('div', 'd-flex justify-content-between align-items-center px-1 title-card');
        const title = createElement('h3', 'game-title text-truncate');
        const free = createElement('h5', 'free');
        title.innerHTML = game.title;
        free.innerHTML = 'free';
        nestElements(titleCard, title);
        nestElements(titleCard, free);
        //desc
        const desc = createElement('div', 'short-desc px-2');
        const desc_p = createElement('p');
        desc_p.innerHTML = game.short_description;
        nestElements(desc, desc_p);
        //bottom
        const bottom = createElement('div', 'd-flex justify-content-between align-items-center px-3 bottom-card');
        const cat = createElement('h6');
        const platform = createElement('h6');
        cat.innerHTML = game.genre;
        platform.innerHTML = game.platform;
        nestElements(bottom, cat);
        nestElements(bottom, platform);
        nestElements(col, gameCard, imgBox);
        nestElements(gameCard, titleCard);
        nestElements(gameCard, desc);
        nestElements(gameCard, bottom);
        this.addEventHandlersForGame(gameCard);
        return col;
    }
    createFeaturedGameElement(game) {
        const col = createElement('div');
        const gameCard = createElement('div', 'featured-game-card', game.id);
        //imgbox
        const imgBox = createElement('div', 'img-box mb-2');
        const img = createElement('img', 'w-100');
        const overlay = createElement('div', 'overlay');
        img.setAttribute('src', game.thumbnail);
        nestElements(imgBox, img);
        nestElements(imgBox, overlay);
        //title card
        const titleCard = createElement('div', 'd-flex justify-content-between align-items-center title-card');
        const title = createElement('h3', 'game-title');
        title.innerHTML = game.title;
        nestElements(titleCard, title);
        nestElements(col, gameCard, imgBox);
        nestElements(gameCard, titleCard);
        this.addEventHandlersForGame(gameCard);
        return col;
    }
    createGameContainer() {
        const box = createElement('div', 'container-md p-3');
        const row = createElement('div', 'row row-gap-3');
        this.games.forEach(game => row.append(this.createGameElement(game)));
        nestElements(box, row);
        return box;
    }
    createFeaturedGamesContainer() {
        const box = createElement('div', 'container-md px-3 mt-4 mb-4');
        const title = createElement('h1', 'display-4 fw-semibold mb-3');
        const row = createElement('div', 'owl-carousel');
        this.featured.forEach(game => row.append(this.createFeaturedGameElement(game)));
        title.innerHTML = 'Featured games';
        $(title).css('color', '#e5e5e5');
        $(title).css('color', '#e5e5e5');
        nestElements(box, title);
        nestElements(box, row);
        return box;
    }
    addEventHandlersForGame(game) {
        game.addEventListener('click', async function () {
            const gameObj = new SingleGame();
            helper.addLoader();
            await gameObj.init($(this).attr('id'));
            helper.removeLoader();
            const gameDisplayer = new SingleGameDisplayer(gameObj.game);
            if (gameObj.status) gameDisplayer.display();
            else gameDisplayer.displayError();
        });
    }
    display() {
        clearDiv(this.container);
        this.container.append(this.createFeaturedGamesContainer());
        this.container.append(this.createGameContainer());
        $('.owl-carousel').owlCarousel({
            loop: true,
            center: true,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                922: {
                    items: 3
                }
            }
        });
    }
    displayError() {
        clearDiv(this.container);
        const div = createElement('div', 'p-lg-5 p-3 d-flex justify-content-center align-items-center');
        const err = createElement('h1', 'display-4 text-white fw-semibold text-center');
        err.innerHTML = "Something went wrong</br>Please try again later";
        nestElements(div, err);
        nestElements(this.container, div);
    }
}

export class SingleGameDisplayer {
    constructor(game) {
        this.game = game;
    }
    display() {
        $('#game-img').attr('src', this.game.thumbnail);
        $('#title').html(this.game.title);
        $('#genre').html(this.game.genre?this.game.genre:'');
        $('#platform').html(this.game.platform?this.game.platform:'');
        $('#status').html(this.game.status?this.game.status:'');
        $('#desc').html(this.game.description?this.game.description:'');
        if (this.game.screenshots.length > 0) {
            $('.screenshot-box').show();
            $('#screenshot-text').html('Screenshots');
            $('#screenshot-1 img').attr('src', this.game.screenshots[0 % this.game.screenshots.length].image);
            $('#screenshot-2 img').attr('src', this.game.screenshots[1 % this.game.screenshots.length].image);
            $('#screenshot-3 img').attr('src', this.game.screenshots[2 % this.game.screenshots.length].image);
            $('.screenshot-box').click(function (e) {
                $('#modal-screenshot').attr('src', $(this.children[0]).attr('src'));
            });
        }
        else{
            $('#screenshot-text').html('');
            $('.screenshot-box').hide();
        }
        $('#min-req').html('');
        if (this.game.minimum_system_requirements) {
            $('#sys-req-text').html('System requirements');
            Object.entries(this.game.minimum_system_requirements).map(e => {
                const h = createElement('h6', 'text-white text-capitalize mb-2');
                h.innerHTML = `${e[0]}: ${e[1]}`;
                $('#min-req').append(h);
            });
        }
        else{
            $('#sys-req-text').html('');
        }
        if(this.game.game_url){
            url=this.game.game_url;
        }
        else{
            url='.';
        }
        $('#home').fadeOut(300, function () {
            $('#game-error').fadeOut(0);
            $('#game-data').fadeIn(0, function () {
                $('#single-game').fadeIn(300,function(){
                    $(window).scrollTop(0);
                });
            });
        });
    }
    displayError() {
        $('#home').fadeOut(300, function () {
            $('#game-data').fadeOut(0);
            $('#game-error').fadeIn(0, function () {
                $('#single-game').fadeIn(300);
            });
        });
    }
}

export function gameURl(){
    if(url!='.') open(url);
}
