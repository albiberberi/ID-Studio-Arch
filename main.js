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

const sections = document.querySelectorAll('body > section')
const features = document.querySelector('.features')

const aboutSection = document.getElementById('about')
const aboutTitleBefore = document.querySelector('.about__info-title:before')
const features2 = document.querySelector('.features__2')
const features3 = document.querySelector('.features__3')


const aboutTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

window.addEventListener('load', () => {
  sections.forEach(section => {
    const els = Array.from(section.children).map(child => {
      if (child.classList.contains('about__text-container')) {
        return child.querySelector('.section__wrap') || child;
      }
      return child;
    });

    gsap.fromTo(
      els,
      { y: isMobile ? 30 : 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: isMobile ? 0.1 : 0.2,
        duration: isMobile ? 0.6 : 0.8,
        force3D: true,
        clearProps: "transform",
        scrollTrigger: {
          trigger: section,
          start: isMobile ? 'top 85%' : 'top 65%',
          preventOverlaps: true,
          fastScrollEnd: true
        }
      }
    );
  });
});

const featuresCollection = features ? features.children : [];
var mediaQuery = window.matchMedia('(min-width: 768px)');

window.addEventListener('load', () => {
  if (mediaQuery && features) {
    for (let feature of featuresCollection) {
      gsap.fromTo(
        feature,
        { x: isMobile ? 30 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          force3D: true,
          clearProps: "transform",
          scrollTrigger: {
            trigger: feature,
            start: 'top 75%',
            preventOverlaps: true,
            fastScrollEnd: true
          }
        }
      );
    }
  }
});



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
    
    const modalBodyElem = document.getElementById("modalBody");
    if (modalBodyElem && modalBodyElem.hasAttribute("data-policy-key")) {
        const contentKey = modalBodyElem.getAttribute("data-policy-key");
        if (window.translatedPolicyContent && window.translatedPolicyContent[lang]) {
            modalBodyElem.innerHTML = window.translatedPolicyContent[lang][contentKey];
        } else if (window.policyContent && window.policyContent[contentKey]) {
            modalBodyElem.innerHTML = window.policyContent[contentKey];
        }
    }

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
    window.translatedPolicyContent = {
        fr: {
            privacy: `<h2>Avis de Confidentialité et RGPD - Utilisation de vos informations personnelles</h2>
            <p>Le Règlement Général sur la Protection des Données (RGPD) s'applique depuis le 25 mai 2018.</p>
            <p>Dans le cadre du RGPD, nous conservons les informations personnelles (données) par projet, et uniquement pour la durée d'un projet, y compris la période légale de couverture de 10 ans suivant la Réception Provisoire.</p>
            <p>Nous ne partageons pas ces données avec d'autres personnes extérieures à notre bureau, ni avec d'autres tiers, sauf accord explicite de votre part. Si vous signez une demande de permis d'urbanisme ou tout autre document administratif, votre signature est considérée comme un tel accord explicite.</p>
    
            <h3>POUR LES CLIENTS :</h3>
            <p>Les clients fournissent des données et des informations uniquement dans le cadre d'un projet, et ces données restent dans les dossiers d'archives pour la période décrite ci-dessus.</p>
            <p>En nous confiant une mission, les clients fournissent explicitement les données nécessaires pour mener à bien cette mission, et ce pour la durée de la mission.</p>
            <p>Dans ce contexte, les données signifient généralement -</p>
            <ul>
                <li>noms</li>
                <li>adresse postale</li>
                <li>numéros de téléphone</li>
                <li>adresses e-mail</li>
                <li>informations de la carte d'identité
                    <ul>
                        <li>numéro de carte d'identité</li>
                        <li>numéro national belge</li>
                        <li>Date de naissance</li>
                        <li>État civil</li>
                    </ul>
                </li>
                <li>Informations financières : telles que
                    <ul>
                        <li>coûts du projet</li>
                        <li>fonds propres</li>
                        <li>prêts bancaires</li>
                    </ul>
                </li>
            </ul>
            <p>Si vous choisissez de retenir certaines de ces informations, cela peut limiter la portée de ce que nous pouvons accomplir lors d'une mission pour vous.</p>
            <p>Si vous avez besoin d'informations complémentaires, veuillez nous écrire à<br>
            Vlaanderveldlaan 20, 1560 Hoeilaart</p>
    
            <h3>But :</h3>
            <ul>
                <li>Conclusion d'une convention d'architecture</li>
                <li>Introduction d'une demande de permis d'urbanisme</li>
                <li>Demande de devis aux entrepreneurs</li>
                <li>Suivi de chantier</li>
                <li>Remise des travaux de construction</li>
                <li>Envoi d'informations du bureau :
                    <ul>
                        <li>Cartes de Nouvel An</li>
                        <li>Événements spéciaux du bureau.</li>
                    </ul>
                </li>
            </ul>
    
            <h3>POUR LES ENTREPRENEURS :</h3>
            <p>Nous conservons les informations suivantes et ne les partagerons pas avec d'autres sauf accord mutuel :</p>
            <ul>
                <li>noms</li>
                <li>adresse postale</li>
                <li>numéros de téléphone</li>
                <li>adresses e-mail</li>
                <li>informations de la carte d'identité
                    <ul>
                        <li>numéro de carte d'identité</li>
                        <li>numéro national belge</li>
                        <li>Date de naissance</li>
                        <li>État civil</li>
                    </ul>
                </li>
                <li>Informations financières : telles que
                    <ul>
                        <li>Coordonnées bancaires</li>
                        <li>Vérification ONSS/RSZ et TAXES</li>
                        <li>numéro de TVA</li>
                    </ul>
                </li>
                <li>Données de l'entreprise.</li>
            </ul>
    
            <h3>POUR LES FOURNISSEURS :</h3>
            <p>Nous conservons les informations suivantes et ne les partagerons pas avec d'autres sauf accord mutuel :</p>
            <ul>
                <li>Données de l'entreprise :
                    <ul>
                        <li>noms</li>
                        <li>adresse postale</li>
                        <li>numéros de téléphone</li>
                        <li>adresses e-mail</li>
                        <li>Coordonnées bancaires</li>
                        <li>Détails de facturation</li>
                        <li>numéro de TVA</li>
                        <li>informations de carte d'identité</li>
                    </ul>
                </li>
            </ul>
    
            <h3>Où, Quoi, Qui & Comment</h3>
            <h4>Où sont-elles stockées :</h4>
            <ul>
                <li>Sur le serveur qui est sauvegardé quotidiennement et stocké au bureau, protégé par une alarme anti-intrusion.
                    <ul>
                        <li>Les sauvegardes sont conservées par les partenaires avec leurs ordinateurs portables.</li>
                    </ul>
                </li>
                <li>Sur l'ordinateur portable du partenaire.</li>
            </ul>
    
            <h4>Sous quel format sont-elles stockées :</h4>
            <ul>
                <li>Dans un fichier Excel par projet</li>
                <li>Dans un fichier Excel regroupant tout.</li>
                <li>Dans un fichier Excel pour les projets avec accords écrits</li>
                <li>Dans le logiciel du carnet d'adresses Apple par partenaire qui est stocké sur iCloud. (Pour la sécurité iCloud, voir support.apple.com).</li>
            </ul>
    
            <h4>Qui a accès :</h4>
            <ul>
                <li>Seuls les partenaires ont accès à l'ensemble des informations.</li>
                <li>Les membres de l'équipe pour les projets sur lesquels ils travaillent, mais toujours à travers le partenaire.</li>
            </ul>
    
            <h4>Qui vérifie la sécurité :</h4>
            <ul>
                <li>Les partenaires.</li>
            </ul>
    
            <h4>Qui informe de toute violation de vie privée :</h4>
            <ul>
                <li>Les partenaires.</li>
            </ul>
    
            <h4>Combien de temps sont-elles stockées :</h4>
            <ul>
                <li>Pour le client, par projet au moins jusqu'à la fin de la période de responsabilité de 10 ans.</li>
                <li>Toutes les autres informations : durée indéterminée.</li>
            </ul>`,
            csr: `<h2>Responsabilité Sociale des Entreprises</h2>
            
            <h3>Programme de diversité</h3>
            <p>Nous avons une politique proactive pour maintenir une diversité d'expérience, d'origine ethnique, de langue maternelle et de genre. Actuellement 20% de femmes, 4 langues maternelles différentes, 3 nationalités différentes.</p>
            <p>Nous encourageons spécifiquement chaque membre de l'équipe à se sentir valorisé et à faire partie intégrante de l'équipe, et à disposer d'opportunités adaptées à ses capacités et son expérience.</p>
    
            <h3>Politique environnementale</h3>
            <ul>
                <li>Actifs dans la conception de constructions basse énergie et passives</li>
                <li>Respect des objectifs d'économie d'énergie et de la législation dans la construction</li>
                <li>Personnel encouragé à économiser l'énergie, trier les déchets, repenser la mobilité</li>
                <li>Vélo pliant disponible au bureau à l'usage du personnel comme moyen de transport alternatif</li>
                <li>Participation régulière aux séminaires du Sustainable Business Development Task Force de la Chambre de Commerce Britannique de Belgique, ainsi qu'aux séminaires de l'Institut Bruxellois pour l'Environnement et du NAV (Association des architectes flamands)</li>
            </ul>
    
            <h3>Objectifs et cibles environnementaux</h3>
            <p>Pari des partenaires pour des déplacements en :</p>
            <ul>
                <li>a. 50% via un moyen 0% carbone (vélo)</li>
                <li>b. 70% via un moyen à carburant faible en carbone</li>
            </ul>
    
            <h3>Santé et Sécurité</h3>
            <p>Tout le personnel est en contact régulier avec les coordinateurs Santé et Sécurité sur les différents chantiers. Les expériences et retours sur les procédures de santé et sécurité sont régulièrement discutés en forum au sein du bureau. Le personnel est également au courant de la réglementation incendie, et nous recevons des mises à jour régulières de l'Officier des Pompiers. Nous élaborons actuellement une politique écrite en matière de santé et de sécurité, liée aux procédures internes générales et à la politique environnementale.</p>`
        },
        nl: {
            privacy: `<h2>Privacyverklaring en AVG - Gebruik van uw persoonlijke informatie</h2>
            <p>De Algemene Verordening Gegevensbescherming (AVG) is van toepassing vanaf 25 mei 2018.</p>
            <p>In het kader van de AVG slaan wij persoonlijke informatie (gegevens) op per project, en uitsluitend voor de duur van een project, inclusief de wettelijke dekkingsperiode van 10 jaar volgend op de Voorlopige Oplevering.</p>
            <p>We delen deze gegevens niet met anderen buiten ons kantoor, of met enige andere derde partij, tenzij u hier uitdrukkelijk mee akkoord bent gegaan. Indien u een bouwaanvraag of een ander administratief document ondertekent, wordt uw handtekening beschouwd als een dergelijke expliciete overeenkomst.</p>
    
            <h3>VOOR KLANTEN :</h3>
            <p>Klanten verstrekken gegevens en informatie enkel binnen het kader van een project, en deze gegevens blijven bewaard in de projectdossiers voor de hierboven beschreven periode.</p>
            <p>Door het toevertrouwen van een missie aan ons, verstrekken cliënten expliciet de nodige gegevens om die missie uit te voeren, en dat voor de duur van de missie.</p>
            <p>In deze context zullen gegevens meestal betekenen -</p>
            <ul>
                <li>namen</li>
                <li>postadres</li>
                <li>telefoonnummers</li>
                <li>e-mailadressen</li>
                <li>identiteitskaartgegevens
                    <ul>
                        <li>ID-kaartnummer</li>
                        <li>Belgisch rijksregisternummer</li>
                        <li>Geboortedatum</li>
                        <li>Burgerlijke staat</li>
                    </ul>
                </li>
                <li>Financiële informatie : zoals
                    <ul>
                        <li>projectkosten</li>
                        <li>eigen vermogen</li>
                        <li>bankleningen</li>
                    </ul>
                </li>
            </ul>
            <p>Als u ervoor kiest om bepaalde van deze informatie achter te houden, kan dit de draagwijdte beperken van wat we in een missie voor u kunnen bereiken.</p>
            <p>Indien u meer informatie wenst, gelieve ons te schrijven op<br>
            Vlaanderveldlaan 20, 1560 Hoeilaart</p>
    
            <h3>Doel :</h3>
            <ul>
                <li>Opmaken architectuurovereenkomst</li>
                <li>Indienen van een bouwaanvraag</li>
                <li>Aanvragen van offertes bij aannemers</li>
                <li>Opvolgen van de werf</li>
                <li>Oplevering van de bouwwerken</li>
                <li>Zenden van kantoorinformatie :
                    <ul>
                        <li>Nieuwjaarskaarten</li>
                        <li>Speciale evenementen van het kantoor.</li>
                    </ul>
                </li>
            </ul>
    
            <h3>VOOR AANNEMERS :</h3>
            <p>We bewaren de volgende informatie en zullen deze niet met anderen delen tenzij onderling overeengekomen :</p>
            <ul>
                <li>namen</li>
                <li>postadres</li>
                <li>telefoonnummers</li>
                <li>e-mailadressen</li>
                <li>identiteitskaartgegevens
                    <ul>
                        <li>ID-kaartnummer</li>
                        <li>Belgisch rijksregisternummer</li>
                        <li>Geboortedatum</li>
                        <li>Burgerlijke staat</li>
                    </ul>
                </li>
                <li>Financiële informatie : zoals
                    <ul>
                        <li>Bankrekeninggegevens</li>
                        <li>Controle RSZ en BELASTINGEN</li>
                        <li>Btw-nummer</li>
                    </ul>
                </li>
                <li>Bedrijfsgegevens.</li>
            </ul>
    
            <h3>VOOR LEVERANCIERS :</h3>
            <p>We bewaren de volgende informatie en zullen deze niet met anderen delen tenzij onderling overeengekomen :</p>
            <ul>
                <li>Bedrijfsgegevens :
                    <ul>
                        <li>namen</li>
                        <li>postadres</li>
                        <li>telefoonnummers</li>
                        <li>e-mailadressen</li>
                        <li>Bankrekeninggegevens</li>
                        <li>Facturatiegegevens</li>
                        <li>Btw-nummer</li>
                        <li>identiteitskaartgegevens</li>
                    </ul>
                </li>
            </ul>
    
            <h3>Waar, Wat, Wie & Hoe</h3>
            <h4>Waar het opgeslagen wordt :</h4>
            <ul>
                <li>Op de server die dagelijks wordt geback-upt en bewaard wordt op kantoor, beveiligd door een alarmsysteem.
                    <ul>
                        <li>Back-ups worden door de partners bewaard samen met hun laptops.</li>
                    </ul>
                </li>
                <li>Op de laptop van de partner.</li>
            </ul>
    
            <h4>In welk formaat het opgeslagen wordt :</h4>
            <ul>
                <li>In Excel-bestand per project</li>
                <li>In Excel-bestand allemaal samen.</li>
                <li>In Excel-bestand voor projecten met schriftelijke overeenkomsten</li>
                <li>In Apple adresboek software per partner, dewelke is opgeslagen in iCloud. (Voor iCloud Veiligheid zie support.apple.com).</li>
            </ul>
    
            <h4>Wie toegang heeft :</h4>
            <ul>
                <li>Enkel de partners hebben toegang tot alle informatie.</li>
                <li>De teamleden voor de projecten waaraan ze werken, maar altijd via de partner.</li>
            </ul>
    
            <h4>Wie de veiligheid controleert :</h4>
            <ul>
                <li>De partners.</li>
            </ul>
    
            <h4>Wie informeert over een privacyschending :</h4>
            <ul>
                <li>De partners.</li>
            </ul>
    
            <h4>Hoe lang het opgeslagen wordt :</h4>
            <ul>
                <li>Voor de klant, per project minstens tot het einde van de 10-jarige aansprakelijkheidsperiode.</li>
                <li>Alle andere informatie : voor onbepaalde tijd.</li>
            </ul>`,
            csr: `<h2>Maatschappelijk Verantwoord Ondernemen</h2>
            
            <h3>Diversiteitsprogramma</h3>
            <p>We hebben een proactief beleid om een diversiteit aan ervaring, etnische achtergrond, moedertaal en geslacht te behouden. Momenteel 20% vrouwen, 4 verschillende moedertalen, 3 nationaliteiten.</p>
            <p>Daarnaast moedigen we elk teamlid aan om zich gewaardeerd teamlid te voelen en de mogelijkheden te krijgen die aansluiten op hun vaardigheden en ervaring.</p>
    
            <h3>Milieubeleid</h3>
            <ul>
                <li>Actief in lage-energie- en passiefbouwontwerp</li>
                <li>Respect voor de doelstellingen rond energie-efficiëntie en regelgeving in de bouwsector</li>
                <li>Personeel aangemoedigd om energie te besparen, afval te sorteren en over mobiliteit na te denken</li>
                <li>Plooifiets is beschikbaar op kantoor voor personeel als alternatief transport</li>
                <li>Regelmatige deelname aan seminaries van Leefmilieu Brussel en NAV (vlaamse architectenorganisatie). Deelname tevens aan the British Chamber of Commerce in Belgium - Sustainable Business Development Task Force Seminars.</li>
            </ul>
    
            <h3>Milieudoelstellingen</h3>
            <p>Doelstellingen voor transport van partners:</p>
            <ul>
                <li>a. reizen: 50% via vervoersmiddelen met 0% koolstofuitstoot (fiets)</li>
                <li>b. reizen: 70% per vervoersmiddel op basis van een brandstofarme koolstof.</li>
            </ul>
    
            <h3>Gezondheid en Veiligheid</h3>
            <p>Al het personeel staat in direct overleg met Veiligheids- en Gezondheidscoördinatoren op alle verschillende werven. Alle terugkoppeling aangaande procedures worden regelmatig en in open vergadering gesproken ten burele. Personeel is teambreed geïnformeerd in zaken rond Brandregelgevingen waarbij het update info mag ervaren vanwege een brandweerofficier. Verder brengen we een schriftelijk G&V beleid samen in het teken van algemene interne procedures ter bevordering van het milieubeleid.</p>`
        }
    };
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
    
    window.policyContent = policyContent;
    
    policyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const i18nKey = link.getAttribute('data-i18n');
            if (i18nKey === 'policy_privacy' || i18nKey === 'policy_csr') {
                e.preventDefault();
                const contentKey = i18nKey === 'policy_privacy' ? 'privacy' : 'csr';
                const currentLang = localStorage.getItem('preferredLanguage') || 'en';
                
                modalBody.setAttribute('data-policy-key', contentKey);
                
                if (currentLang === 'en' || !window.translatedPolicyContent[currentLang]) {
                    modalBody.innerHTML = policyContent[contentKey];
                } else {
                    modalBody.innerHTML = window.translatedPolicyContent[currentLang][contentKey];
                }
                
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
const galleryAddress = document.getElementById("galleryModalAddress");
const galleryType = document.getElementById("galleryModalType");
const galleryYear = document.getElementById("galleryModalYear");

// Project metadata – placeholder data, replace with real values as needed
const projectMeta = {
    ambassador_residence: {
        address: "Vlaanderveldlaan",
        type: "New construction - Private shared residence",
        year: "2000-2001"
    },
    cts_housing: {
        address: "Kasteelstraat 48",
        type: "Student Housing",
        year: "2022-2025"
    },
    cts_chateau: {
        address: "Kasteelstraat 48",
        type: "Overall renovation - Change of function, research centre",
        year: "2026-"
    },
    watercolor: {
    },
    
    sluys: {
        address: "Nijverheidsstraat",
        type: "New construction - Private offices and storage facilities",
        year: "2000-2001"
    },
    minimalist: {
        address: "Ixelles, Brussels",
        type: "Interior Design",
        year: "2000-2001"
    },
    architect_residence: {
        address: "Rue Ducale",
        type: "Interior Renovation",
        year: "2020-2023"
    },
    courtyard: {
        address: "Saint-Gilles, Brussels",
        type: "Residential – Renovation",
        year: "2000-2001"
    }
};

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
        // Scroll modal to top on open
        galleryModal.scrollTop = 0;
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

        // Populate metadata fields
        const meta = projectMeta[currentProjectId];
        if (meta) {
            if (galleryAddress) galleryAddress.innerText = meta.address;
            if (galleryType)    galleryType.innerText    = meta.type;
            if (galleryYear)    galleryYear.innerText    = meta.year;
        } else {
            if (galleryAddress) galleryAddress.innerText = "—";
            if (galleryType)    galleryType.innerText    = "—";
            if (galleryYear)    galleryYear.innerText    = "—";
        }
    }

    function showImage(index) {
        const modalImages = document.querySelectorAll(".gallery-modal__img");
        modalImages.forEach(img => img.classList.remove("active"));
        
        if (index >= modalImages.length) currentImageIndex = 0;
        else if (index < 0) currentImageIndex = modalImages.length - 1;
        else currentImageIndex = index;
        
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
            if (e.key === "ArrowLeft")  showImage(currentImageIndex - 1);
            if (e.key === "ArrowRight") showImage(currentImageIndex + 1);
            if (e.key === "Escape")     galleryClose.click();
        }
    });

    const langBtns = document.querySelectorAll('.lang');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => { setTimeout(updateModalContent, 100); });
    });
}


