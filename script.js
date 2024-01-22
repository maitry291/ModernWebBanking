'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

console.log(document.documentElement); //<html/>
console.log(document.head); //<head/>
console.log(document.body); //<body/>

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
const newHeight=Number.parseFloat(getComputedStyle(cookie).height,10)+30;
cookie.style.height = newHeight + 'px';






