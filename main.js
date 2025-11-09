//Animations

const headerFrame = document.querySelector('.header__frame')
const headerTitle = document.querySelector('.header__title-big')
const headerLogo = document.querySelector('.header__logo')
const headerTitleSmall = document.querySelector('.header__title-small')
const headerButton = document.querySelector('.header__button')
const headerImage = document.querySelector('.header__img')
const headerArrow = document.querySelector('.scroll')
const menuBtn = document.querySelectorAll('.menu__nav-btn') 
const headerSocial = document.querySelector('.header__social-li') 

//header animations

const headerTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

const animSpd = 0.65;

headerTl.fromTo(headerFrame, animSpd, { opacity: 0 }, { opacity: 1, delay: 1.2 })
    .fromTo(headerTitle, animSpd, { opacity: 0, x: '+=100' }, { opacity: 1, x: 0 })
    .fromTo(headerImage, 0.3, { opacity: 0, }, { opacity: 0.8, ease: "power1.out" })
    .fromTo(headerTitleSmall, animSpd, { opacity: 0, x: '-=100', },
        { x: 0, opacity: 1, x: 0, ease: "slow(0.7, 0.7, false)" })
    .fromTo(headerLogo, animSpd, { opacity: 0, x: '+=50' }, { opacity: 1, x: 0 })
    .fromTo(headerButton, animSpd, { opacity: 0, }, { opacity: 1, ease: "bounce.out" })


gsap.from(headerArrow, 2, { delay: 2, opacity: 0, }) 
gsap.from(headerArrow, 1.5, { delay: 0, y: '-20px', repeat: -1, yoyo: true, ease: "slow(0.7, 0.7, false)", });

gsap.fromTo(menuBtn, 2, {
    opacity: 0,
    y: '-=100',
    ease: "power3.out",
}, {
    opacity: 1,
    y: 0,
    delay: 3,

});

gsap.fromTo(headerSocial, 2, { 
    opacity: 0,
    x: '-=100',
    ease: "power3.out",
}, {
    opacity: 1,
    x: 0,
    delay: 2.7,
    rotation: 360,
    transformOrigin: "center",
});



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

const featuresCollection = features.children;
var mediaQuery = window.matchMedia('(min-width: 768px)');

if (mediaQuery) {
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

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier for scroll speed
    
    slider.scrollLeft = scrollLeft - walk;
});





// project images animation
/*
const projectsImages = document.querySelector('.grid')

const images = projectsImages.children;

const imgTl = gsap.timeline({
    defaults: {
        delay: 0.3, opacity: 0, duration: 0.15, y: 80,
    },
    scrollTrigger: {
        trigger: projectsImages,
        start: 'top 55%',
        ease: "none",
    }
})
    .from(images[0], {
    }, "-=0.2")
    .from(images[3], {
    }, "-=0.3")
    .from(images[4], {
    }, "-=0.5")
    .from(images[2], {
    }, "-=0.2")
    .from(images[1], {
    }, "-=0.5")
    .from(images[5], {
    }, "-=0.3")
    .from(images[6], {
    }, "-=0.2")
    .from(images[7], {
    }, "-=0.4")
    */
