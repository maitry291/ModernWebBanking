'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabOperations = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const tabContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*
console.log(document.documentElement); //<html/>
console.log(document.head); //<head/>
console.log(document.body); //<body/>
*/

const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //datatype - HTMLCollection which dynamically changes when any button element is added or removed

const allSections = document.querySelectorAll('.section');
console.log(allSections); //NodeList datatype - once defined then won't change if some changes made in element section

//create and insert html elements - .insertAdjecentHTML
const header = document.querySelector('.header');
//only creation of dom object-- doesn't exist in the html
const cookie = document.createElement('div');
cookie.classList.add('cookie-message');
cookie.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

//insert to the dom/html
// header.prepend(cookie);
header.append(cookie); //it can exist at only one place
// header.append(cookie.cloneNode(true)) //this will make clone

// header.before(cookie);   //before header
// header.after(cookie)   //after header

//deleting
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    cookie.remove();
  });
// console.log(typeof cookie);  //object

//inline css
cookie.style.backgroundColor = '#37383d';
cookie.style.width = '120%';

//to get all css properties of element
// console.log(getComputedStyle(cookie));
const newHeight = Number.parseFloat(getComputedStyle(cookie).height, 10) + 30;
cookie.style.height = newHeight + 'px';

//smooth scroll feature
btnScrollto.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
  console.log(section1);
});

//smooth navigation scroll to sections -Page navigation
const navSections = document.querySelectorAll('.nav__link');

//old method
/*
navSections.forEach(el => {
  el.addEventListener('click', function (e) {
    // el.sc
    e.preventDefault();
    const id = el.getAttribute('href'); //id of section
    const scrollToSection = document.querySelector(id);
    scrollToSection.scrollIntoView({ behavior: 'smooth' });
    // console.log(scrollToSection, id);
  });
});
*/

//through event delegation- we apply this to the parent element as we know that event bubbles up to the parent from target.
//here parent is ul--nav__links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //check if the clicked element/target element is what we want
  if (e.target.classList.contains('nav__link')) {
    //apply smooth scrolling to the target element
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

/*
bad practice as it can slow down the website when we have more num of tabs ex if we have 200 tabs then 200 event handler functions copies will be generated
tabOperations.forEach(tab => {
  tab.addEventListener('click', function (e) {
    e.preventDefault();
    //add active class on tab and change the content
    tab.classList.add('operations__tab--active');

  });
});*/

//instead we use event delegation for tabbed components
tabContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;
  tabOperations.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  const contentNum = clickedTab.getAttribute('data-tab');
  const currContent = '.operations__content--' + contentNum;
  //remove active from all
  document
    .querySelectorAll('.operations__content')
    .forEach(e => e.classList.remove('operations__content--active'));
  //show content
  document
    .querySelector(currContent)
    .classList.add('operations__content--active');
});

//navigation fade animation
const handleHover = function (e) {
  // console.log(this); //prints opacity
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const obsOptns = {
  root: null, //root is viewport
  threshold: 0, //callback func will be triggered when when whole header is not visible
  rootMargin: `-${navHeight}px`,
};
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};
const observer = new IntersectionObserver(obsCallback, obsOptns);
observer.observe(header);

//revealing elements on scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
