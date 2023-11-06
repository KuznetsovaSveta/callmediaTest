let popup1 = document.querySelector('#popupQuantity');
let popup2 = document.querySelector('#popupRequest');
let popup3 = document.querySelector('#popupBought');
let popups = [popup1, popup2, popup3];

let btnsClosePopup = document.querySelectorAll('.popup__close');
let popupBig = document.querySelector('#bigPopup');
let popupBackground = document.querySelector('.popup__bg');
let body = document.querySelector('body');

let hrsNum = document.querySelector('.hrs__num');
let hrs = document.querySelector('.hrs');
let minutesNum = document.querySelector('.minutes__num');
let minutes = document.querySelector('.minutes');
let secondsNum = document.querySelector('.seconds__num');
let seconds = document.querySelector('.seconds');

let popupInterval = setInterval(showRandomPopup, 10000);
showRandomPopup();

getTime()
setInterval(getTime, 1000);

function getTime() {
    let dt = new Date
    let tz = dt.getTimezoneOffset()
    let now = Math.floor(dt / 1000 - tz * 60)
    let next = Math.ceil((dt / 1000 / 60 - tz) / 60 / 24) * 60 * 60 * 24
    let left = next - now
    let hrsLeft = ~~(left / 60 / 60);
    let minutesLeft = ~~(left / 60 % 60);
    let secondsLeft = ~~(left % 60);

    hrsNum.textContent = hrsLeft;
    hrs.textContent = declination(hrsLeft, ['час', 'часа', 'часов']);
    minutesNum.textContent = minutesLeft;
    minutes.textContent = declination(minutesLeft, ['минута', 'минуты', 'минут']);
    secondsNum.textContent = secondsLeft;
    seconds.textContent = declination(secondsLeft, ['секунда', 'секунды', 'секунд']);
}

function declination(val, words) {
    val = Math.abs(val) % 100;
    let num = val % 10;
    if (val > 10 && val < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
}

function getRandomInt() {
    return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
}

function showBigPopup(popup) {
    popup.classList.add('popup-active');
    body.classList.add('noScroll');
}

function closeBigPopup(popup) {
    popup.classList.remove('popup-active');
    body.classList.remove('noScroll');
}

function showPopup(popup) {
    popup.classList.add('popup-active');
}

function closePopup(popup, popupTimeout) {
    popup.classList.remove('popup-active');
    clearTimeout(popupTimeout);
    popupInterval = setInterval(showRandomPopup, 10000);
}

function showRandomPopup() {
    clearInterval(popupInterval);
    let random = getRandomInt();
    console.log(random)
    let currPopup = popups[random - 1];
    for (let pop of popups) {
        pop.classList.remove('popup-active')
    }
    showPopup(currPopup);
    let popupTimeout = setTimeout(function () {
        closePopup(currPopup, popupTimeout);
    }, 10000);
}

for (let btnClosePopup of btnsClosePopup) {
    btnClosePopup.addEventListener('click', function () {
        closePopup(btnClosePopup.closest('.popup'));
    });
}

popupBackground.addEventListener('click', function () {
    closeBigPopup(popupBig);
});

document.onmouseleave = function (event) {
    showBigPopup(popupBig);
};

var fastSwiper = new Swiper(".fast__swiper", {
    navigation: {
        nextEl: ".fast__swiper-next",
        prevEl: ".fast__swiper-prev",
    },
    slidesPerView: 1,
    spaceBetween: 32,
    allowTouchMove: true,
    breakpoints: {
        960: {
            slidesPerView: 3,
            spaceBetween: 0,
            allowTouchMove: false,
        },
        660: {
            slidesPerView: 2,
        },
    }
});