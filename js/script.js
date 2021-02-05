let last_known_scroll_position = 0;
let ticking = false;

let showingBorder = false;
let isTannazSmall = false;
const BORDER_POS = 34;

const nav = document.getElementById('nav');
const tannaz = document.getElementById('tannaz');

function showBorder() {
  console.log("showing border");
  nav.style.borderBottom = 'solid 2px #edf2f9';

  if (nav.classList.contains('background-green')) {
    console.log("contains background-green");
    nav.style.backgroundColor = '#e6f3e2';
    nav.style.borderBottom = 'solid 2px #fefefe';
  }

  showingBorder = true;
}

function hideBorder() {
  console.log("hiding border");
  nav.style.borderBottom = '';
  if (nav.classList.contains('background-green')) {
    nav.style.backgroundColor = '';
  }
  showingBorder = false;
}

function smallTannaz() {
  if (!tannaz) {
    return;
  }
  console.log("smalling tannaz");
  tannaz.src = 'assets/tannaz-nav.png';
  tannaz.style.position = 'fixed';
  tannaz.style.top = '18px';
  tannaz.style.maxHeight = '32px';
  isTannazSmall = true;
}

function bigTannaz() {
  if (!tannaz) {
    return;
  }
  tannaz.src = 'assets/tannaz.gif';
  tannaz.style.position = 'inherit';
  tannaz.style.maxHeight = 'inherit';
  isTannazSmall = false;
}

function handleScroll(scroll_pos) {
  console.log("scroll_pos", scroll_pos);
  if (scroll_pos > BORDER_POS && !showingBorder) {
    showBorder();
  }
  if (scroll_pos > BORDER_POS + 80 && !isTannazSmall) {
    smallTannaz();
  }

  if (scroll_pos < BORDER_POS && showingBorder) {
    hideBorder();
    bigTannaz();
  }
}

document.addEventListener('scroll', function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      handleScroll(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});