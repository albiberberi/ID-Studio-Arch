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
if (slider) {
    let isDown = false; 
    let startX; 
    let scrollLeft;
    let moved = false; // New flag to track movement
    
    // Prevent default drag behavior on images
    slider.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
    
    slider.addEventListener('mousedown', (e) => {
        // Only trigger on left mouse button (button 0)
        if (e.button !== 0) return;
        
        isDown = true;
        moved = false; // Reset on every new click
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        
        // Don't preventDefault here as it might break linking
    });
    
    // Listen on document to handle mouse release anywhere
    document.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            slider.classList.remove('active');
            
            // Add a temporary class to disable pointer events if needed, 
            // but the click listener below is cleaner.
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Multiplier for scroll speed
        
        // If we move more than 5px, consider it a drag/move
        if (Math.abs(x - startX) > 5) {
            moved = true;
        }

        if (moved) {
            e.preventDefault();
            slider.scrollLeft = scrollLeft - walk;
        }
    });

    // Capture and kill clicks if the mouse moved during the click duration
    slider.addEventListener('click', (e) => {
        if (moved) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, true); // Use capture phase
}



/* Language Switcher */

const langButtons = document.querySelectorAll('.lang');

langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const span = btn.querySelector('span');
        let lang = 'en';
        if (span.classList.contains('fr')) lang = 'fr';
        if (span.classList.contains('nl')) lang = 'nl';
        if (span.classList.contains('gb')) lang = 'en';
        
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

    // to save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load language preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    updateLanguage(savedLang);
});

// Modal Logic
const modal = document.getElementById("policyModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".modal__close");
const policyLinks = document.querySelectorAll('.policies__link');

if (modal && modalBody && closeBtn) {
    const policyContent = {
        privacy: `
            <h2>Privacy Notice and GDPR - Using your personal information</h2>
            <p>The General Data Protection Regulation (GDPR) applies from 25 May 2018.</p>
            <p>Within the framework of GDPR, we store Personal information (data) on a project-related basis, and only for the duration of a project, including the statutory 10-year cover period following Practical Completion.</p>
            <p>We do not share these data with others outside our office, or any other third party, except where explicitly agreed by you. If you sign a planning application or other administrative document, your signature is considered to be such an explicit agreement.</p>
    
            <h3>FOR CLIENTS :</h3>
            <p>Clients provide data and information only within the framework of a project, and these data remains within the project records for the period described above.</p>
            <p>By entrusting a mission to us, clients are explicitly providing the data necessary for us to carry out that mission, and that for the duration of the mission.</p>
            <p>In this context, data usually will mean -</p>
            <ul>
                <li>names</li>
                <li>postal address</li>
                <li>phone numbers</li>
                <li>email addresses</li>
                <li>identity card information
                    <ul>
                        <li>iD card number</li>
                        <li>Belgian national number</li>
                        <li>Date of birth</li>
                        <li>Marital status</li>
                    </ul>
                </li>
                <li>Financial information : such as
                    <ul>
                        <li>project costs</li>
                        <li>own capital</li>
                        <li>bank loans</li>
                    </ul>
                </li>
            </ul>
            <p>If you choose to withhold any of this information, it may limit the scope of what we can achieve in any mission for you.</p>
            <p>If you need any further information please write to us at<br>
            Vlaanderveldlaan 20, 1560 Hoeilaart</p>
    
            <h3>Purpose :</h3>
            <ul>
                <li>Making architectural agreement</li>
                <li>Entering a planning application</li>
                <li>Asking for quotes to contractors</li>
                <li>Following the site</li>
                <li>Handing over the building works</li>
                <li>Sending out office information :
                    <ul>
                        <li>NewYear cards</li>
                        <li>Special events of the office.</li>
                    </ul>
                </li>
            </ul>
    
            <h3>FOR CONTRACTORS :</h3>
            <p>We keep the following information and will not share it with others unless mutually agreed :</p>
            <ul>
                <li>names</li>
                <li>postal address</li>
                <li>phone numbers</li>
                <li>email addresses</li>
                <li>identity card information
                    <ul>
                        <li>iD card number</li>
                        <li>Belgian national number</li>
                        <li>Date of birth</li>
                        <li>Marital status</li>
                    </ul>
                </li>
                <li>Financial information : such as
                    <ul>
                        <li>Bank account details</li>
                        <li>Check ONSS/RSZ and TAXES</li>
                        <li>VAT number</li>
                    </ul>
                </li>
                <li>Company details.</li>
            </ul>
    
            <h3>FOR SUPPLIERS :</h3>
            <p>We keep the following information and will not share it with others unless mutually agreed :</p>
            <ul>
                <li>Company details :
                    <ul>
                        <li>names</li>
                        <li>postal address</li>
                        <li>phone numbers</li>
                        <li>email addresses</li>
                        <li>Bank account details</li>
                        <li>Invoicing details</li>
                        <li>VAT number</li>
                        <li>identity card information</li>
                    </ul>
                </li>
            </ul>
    
            <h3>Where, What, Who & How</h3>
            <h4>Where it is stored :</h4>
            <ul>
                <li>On the server which is backed up daily and is stored in the office and protected by a burglar alarm.
                    <ul>
                        <li>Backups are held by the partners together with their laptops.</li>
                    </ul>
                </li>
                <li>On the partner’s laptop.</li>
            </ul>
    
            <h4>In what format it is stored :</h4>
            <ul>
                <li>In excel file per projects</li>
                <li>In excel file all together.</li>
                <li>In excel file for projects with written agreements</li>
                <li>In Apple address software per partner which is stored in iCloud. (For iCloud Security see support.apple.com).</li>
            </ul>
    
            <h4>Who has access :</h4>
            <ul>
                <li>Only the partners have access to all the information.</li>
                <li>The team members for the projects they are working on, but always through the partner.</li>
            </ul>
    
            <h4>Who checks the security :</h4>
            <ul>
                <li>The partners.</li>
            </ul>
    
            <h4>Who informs about any breach of privacy :</h4>
            <ul>
                <li>The partners.</li>
            </ul>
    
            <h4>How long it is stored :</h4>
            <ul>
                <li>For client, per project at least up to the end of the 10-year liability period.</li>
                <li>All other information : indefinite.</li>
            </ul>
        `,
        csr: `
            <h2>Corporate Social Responsibility</h2>
            
            <h3>Diversity program</h3>
            <p>We have a proactive policy to maintain a diversity of experience, ethnic origin, mother tongue and gender. Currently 20% women, 4 different mother tongues, 3 different nationalities.</p>
            <p>We specifically encourage every team member to feel valorised and part of the team, and have opportunities tailored to their abilities and experience.</p>
    
            <h3>Environmental policy</h3>
            <ul>
                <li>Active in low-energy and passive construction design</li>
                <li>Respect of energy saving targets and legislation in construction</li>
                <li>Staff encouraged to save energy, sort waste, rethink mobility</li>
                <li>Folding bicycle available in office for the use of staff as alternative transport</li>
                <li>Regular participation in British Chamber of Commerce in Belgium - Sustainable Business Development Task Force Seminars, and also Seminars by Brussels Region Institute for the Environment and NAV (Flemish architects’ association)</li>
            </ul>
    
            <h3>Environmental objectives and targets</h3>
            <p>Partners targets to either :</p>
            <ul>
                <li>a. travel 50% by 0% carbon means (cycle)</li>
                <li>b. travel 70% by low-carbon combustible fuel means</li>
            </ul>
    
            <h3>Health and Safety</h3>
            <p>All staff are in regular contact with Health and Safety Coordinators on different building sites. Experiences and feedback on Health and Safety procedures are discussed regularly in forum within the office. All staff are also aware of Fire regulations, and we have intermittent updates from the Fire Officer. We are currently elaborating a written health and safety policy, linked with general office procedures and environmental policy.</p>
        `
    };
    
    policyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const i18nKey = link.getAttribute('data-i18n');
            if (i18nKey === 'policy_privacy' || i18nKey === 'policy_csr') {
                e.preventDefault();
                const contentKey = i18nKey === 'policy_privacy' ? 'privacy' : 'csr';
                modalBody.innerHTML = policyContent[contentKey];
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });
    });
    
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
}

// Gallery Modal Logic for residential projects
const galleryModal = document.getElementById("galleryModal");
const galleryClose = document.querySelector(".gallery-modal__close");
const galleryPrev = document.querySelector(".gallery-modal__prev");
const galleryNext = document.querySelector(".gallery-modal__next");
const galleryItems = document.querySelectorAll(".gallery__item");
const galleryImagesContainer = document.getElementById("galleryModalImages");
const galleryTitle = document.getElementById("galleryModalTitle");
const galleryDescription = document.getElementById("galleryModalDescription");

let currentProjectId = "";
let currentProjectImages = [];
let currentImageIndex = 0;

if (galleryModal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            currentProjectId = item.getAttribute("data-project-id");
            currentProjectImages = JSON.parse(item.getAttribute("data-images"));
            openGalleryModal();
        });
    });

    function openGalleryModal() {
        currentImageIndex = 0;
        galleryImagesContainer.innerHTML = "";
        
        currentProjectImages.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.className = "gallery-modal__img" + (index === 0 ? " active" : "");
            galleryImagesContainer.appendChild(img);
        });

        updateModalContent();
        galleryModal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    function updateModalContent() {
        if (!currentProjectId) return;
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        if (translations[currentLang]) {
            const titleKey = `project_${currentProjectId}`;
            const descKey = `project_${currentProjectId}_desc`;
            galleryTitle.innerText = translations[currentLang][titleKey] || "";
            galleryDescription.innerText = translations[currentLang][descKey] || "";
            galleryTitle.setAttribute('data-i18n', titleKey);
            galleryDescription.setAttribute('data-i18n', descKey);
        }
    }

    function showImage(index) {
        const modalImages = document.querySelectorAll(".gallery-modal__img");
        modalImages.forEach(img => img.classList.remove("active"));
        
        if (index >= modalImages.length) currentImageIndex = 0;
        if (index < 0) currentImageIndex = modalImages.length - 1;
        
        modalImages[currentImageIndex].classList.add("active");
    }

    galleryPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });

    galleryNext.addEventListener("click", (e) => {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });

    galleryClose.addEventListener("click", () => {
        galleryModal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (galleryModal.style.display === "block") {
            if (e.key === "ArrowLeft") showImage(currentImageIndex - 1);
            if (e.key === "ArrowRight") showImage(currentImageIndex + 1);
            if (e.key === "Escape") galleryClose.click();
        }
    });

    const langBtns = document.querySelectorAll('.lang');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => { setTimeout(updateModalContent, 100); });
    });
}


