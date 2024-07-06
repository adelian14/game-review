import { GamesByCat } from "./data.js";
import { GamesDisplayer, gameURl } from "./ui.js";
import { UI_Helper } from "./uiHelper.js";
const uiHelper = new UI_Helper();


function setFixedNav() {
    if ($(window).scrollTop() >= $('#gameDisplayer').offset().top - $('.mynav').outerHeight(false)) {
        $('.mynav').addClass('fixed-top');
    }
    else {
        $('.mynav').removeClass('fixed-top');
    }
}
$(window).scroll(setFixedNav);
$('.burger-menu').click(function () {
    $('.outer-nav-items').slideToggle(400);
});
$(window).resize(function () {
    if ($('.burger-menu').css('display') == 'none') {
        $('.outer-nav-items').fadeIn(200);
    }
    else {
        $('.outer-nav-items').fadeOut(200);
    }
});
$('.close-button').click(function (e) {
    $('#single-game').fadeOut(300, function () {
        $('#home').fadeIn(300,setFixedNav);
    });
});


async function init(idx = 0) {
    const games = new GamesByCat();
    await games.init(idx);
    uiHelper.removeLoader();
    const displayGames = new GamesDisplayer(games.games, games.featured);
    if (games.status) displayGames.display();
    else displayGames.displayError();
}

$('.game-button').click(gameURl);

await init();

$('.nav-btn').click(function (e) {
    $('.nav-btn').removeClass('active');
    $(this).addClass('active');
    uiHelper.addLoader();
    init(+$(this).attr('idx'));
});