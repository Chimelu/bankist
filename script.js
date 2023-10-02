'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
// cnst navLink = document.querySelector('.nav__link')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')
const navHeight = nav.getBoundingClientRect().height





const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
 
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
  

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const header = document.querySelector('.header')

const bug = setTimeout(function(){
  

  const message = document.createElement('div')
  message.style.backgroundColor = 'blue'
 message.style.width = '50%'

 message.style.height = Number.parseFloat(getComputedStyle(message).height,10)+ 30 +'px'
//  console.log(getComputedStyle(message).height)
  message.classList.add('cookie-message')
  message.innerHTML ='We use cookies for improved functionalities and analytics <button class="btn btn--close-cookie">Got it </button>'
    header.append(message)
    document.querySelector('.btn--close-cookie').addEventListener('click',function(){
      message.remove()
    })
},8000)

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault()
//     const id  = this.getAttribute('href')
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})

//   })

// })

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault


  if (e.target.classList.contains('nav__link')){
    const id  = e.target.getAttribute('href')
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'})


  }
})

// const h1 = document.querySelector('h1')
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.color = 'orangered'

// menu fade animation

const handleHover = function(e, opacity) {

  if (e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')
  
    siblings.forEach(el =>{
      if (el !==link)el.style.opacity = opacity
    })
 
   } logo.style.opacity= opacity
}



nav.addEventListener('mouseover',function(e){
  handleHover(e, 0.5)

})

    
  


nav.addEventListener('mouseout',function(e){
  handleHover(e, 1)

  
})


// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCoords.top)nav.classList.add('sticky')
//    else nav.classList.remove('sticky')
  
// })





// document.documentElement.style.setProperty('--color-primary', 'orangered')

const logo = document.querySelector('.nav__logo')
console.log(logo.className);


btnScrollTo.addEventListener('click', function(e){
  const s1cords = section1.getBoundingClientRect()
  console.log(s1cords);

  console.log(e.target.getBoundingClientRect());

  console.log('current scroll (x/y)', window.pageXOffset, pageYOffset);
  console.log('height/width viewport', document.documentElement.clientHeight,document.documentElement.clientWidth);

  section1.scrollIntoView({behavior:'smooth'})

})


tabsContainer.addEventListener('mouseover', function(e){
  const clicked = e.target.closest('.operations__tab')
  if(!clicked) return
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  
  
  clicked.classList.add('operations__tab--active')




  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})
const header = document.querySelector('.header')

const stickyNav = function (entries){
  const [entry]= entries
  console.log(entry);

  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')

}
const headerObserver =new IntersectionObserver(stickyNav, {
  root:null,
  threshold:0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

// reveal section
const allSection = document.querySelectorAll('.section')

const revealSection = function (entries , observer) {

  const[entry] = entries

  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver (revealSection,{
  roots: null,
  threshold:0.15
})

allSection.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function(entries , observer){
  const [entry] = entries
  // if(!entry.isIntersecting) return
  if (!entry.isIntersecting ) return
  entry.target.src = entry.target.dataset.src
  
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
   })
  
  // replace src with data-src
  // entry.target.src = entry.target.dataset.src
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,

})

imgTargets.forEach(img =>imgObserver.observe(img) )

// const h1 = document.querySelector('h1')
// const alertH1 = function (e){
//   alert('Great you are reading this heading')

// }
// h1.addEventListener('mouseenter', alertH1 )
  


