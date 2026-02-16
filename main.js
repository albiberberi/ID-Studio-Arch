//Animations

const headerFrame = document.querySelector('.header__frame')
const headerTitle = document.querySelector('.header__title-big')
const headerLogo = document.querySelector('.nav__logo')
const headerTitleSmall = document.querySelector('.header__title-small')
const headerButton = document.querySelector('.header__button')
const headerImage = document.querySelector('.header__img')
const headerArrow = document.querySelector('.scroll')
const menuBtn = document.querySelectorAll('.menu__nav-btn') 
const headerSocial = document.querySelector('.header__social-li') 
const hamburger = document.querySelector('.menu__btn');
const menuBcg = document.querySelector('.menu__bcg');
const menuIcon = document.querySelector('.menu__btn i');

// Open/Close logic
if(hamburger) {
    hamburger.addEventListener('click', () => {
        menuBcg.classList.toggle('menu__bcg--open');
        if(headerLogo) headerLogo.classList.toggle('nav__logo--hidden');

        // Toggle icon between bars and times (X)
        if(menuBcg.classList.contains('menu__bcg--open')) {
             menuIcon.classList.remove('fa-bars');
             menuIcon.classList.add('fa-times');
        } else {
             menuIcon.classList.remove('fa-times');
             menuIcon.classList.add('fa-bars');
        }
    });
}

// Close menu when a link is clicked
menuBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        menuBcg.classList.remove('menu__bcg--open');
        if(headerLogo) headerLogo.classList.remove('nav__logo--hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
}); 

//header animations

const headerTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

const animSpd = 0.65;

//Top Button
const mybutton = document.getElementById("myBtn");
mybutton.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})


// When the user scrolls down 500px from the top of the document
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};






// ABOUT

const sections = document.querySelectorAll('section')
const features = document.querySelector('.features')

const aboutSection = document.getElementById('about')
const aboutTitleBefore = document.querySelector('.about__info-title:before')
const features2 = document.querySelector('.features__2')
const features3 = document.querySelector('.features__3')


const aboutTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

sections.forEach(section => {
    gsap.fromTo(section.children, { y: '+=100', opacity: 0 },
        {
            y: 0, opacity: 1, stagger: 0.2, duration: 0.8,
            scrollTrigger: {
                trigger: section,
                start: 'top 65%',
                ease: 'power3. out'
            }
        })
})

const featuresCollection = features ? features.children : [];
var mediaQuery = window.matchMedia('(min-width: 768px)');

if (mediaQuery && features) {
    for (let feature of featuresCollection) {
        gsap.fromTo(feature, { x: '+=100', opacity: 0 },
            {
                x: 0, opacity: 1, stagger: 0.2, duration: 0.8,
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 75%',
                    ease: 'power3. out'
                }
            })
    }
}



// PROJECTS
const slider = document.querySelector('.projects-scroll');
let isDown = false; 
let startX; 
let scrollLeft;

// Prevent default drag behavior on images
slider.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

slider.addEventListener('mousedown', (e) => {
    // Only trigger on left mouse button (button 0)
    if (e.button !== 0) return;
    
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    
    // Prevent text selection while dragging
    e.preventDefault();
});

// Listen on document to handle mouse release anywhere
document.addEventListener('mouseup', () => {
    if (isDown) {
        isDown = false;
        slider.classList.remove('active');
    }
});

document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier for scroll speed
    
    slider.scrollLeft = scrollLeft - walk;
});



/* Language Switcher */

const langButtons = document.querySelectorAll('.lang');

langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const span = btn.querySelector('span');
        let lang = 'en';
        if (span.classList.contains('fi-fr')) lang = 'fr';
        if (span.classList.contains('fi-nl')) lang = 'nl';
        if (span.classList.contains('fi-gb')) lang = 'en';
        
        updateLanguage(lang);
    });
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
             el.innerHTML = translations[lang][key];
        }
    });

    // to save language preference (optional)
    // localStorage.setItem('preferredLanguage', lang);
}
