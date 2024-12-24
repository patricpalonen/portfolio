// Lisää tapahtumankuuntelija hiiren rullaukselle ('wheel')
document.addEventListener('wheel', (event) => {
    event.preventDefault(); // Estää oletusrullauskäyttäytymisen

    // Valitse kaikki <section>-elementit
    const sections = document.querySelectorAll('section');

    // Selvitä, mikä osio on tällä hetkellä näkyvissä näytön yläreunassa
    const currentSection = [...sections].findIndex((section) =>
        Math.abs(section.getBoundingClientRect().top) < 10 // Tarkista, onko osion yläreuna lähellä ikkunan yläreunaa
    );

    // Jos rullataan alas ja nykyinen osio ei ole viimeinen
    if (event.deltaY > 0 && currentSection < sections.length - 1) {
        sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' }); // Siirry seuraavaan osioon
    }
    // Jos rullataan ylös ja nykyinen osio ei ole ensimmäinen
    else if (event.deltaY < 0 && currentSection > 0) {
        sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' }); // Siirry edelliseen osioon
    }
}, { passive: false });

// Lisää tapahtumankuuntelija vieritykselle ('scroll')
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // Valitse kaikki osiot
    const dots = document.querySelectorAll('nav.dots a'); // Valitse kaikki navigointipisteet

    // Käy läpi jokainen osio
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect(); // Hae osion sijainti suhteessa näkymään
        
        // Tarkista, onko osio aktiivinen (keskellä näkymää)
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            // Poista "active"-luokka kaikista pisteistä
            dots.forEach(dot => dot.classList.remove('active'));
            // Lisää "active"-luokka nykyiseen pisteeseen
            dots[index].classList.add('active');
        }
    });
});

// Valitaan kaikki aikajanan elementit
const timelineItems = document.querySelectorAll("#future-goals .timeline-item");

// Lisätään event listener hoverille ja klikkaukselle
timelineItems.forEach((item) => {
    // Hover-efekti
    item.addEventListener("mouseenter", () => {
        // Poistetaan "active"-luokka kaikista elementeistä
        timelineItems.forEach((el) => el.classList.remove("active"));
        
        // Lisätään "active"-luokka kohteeseen
        item.classList.add("active");
    });

    // Klikkauksen yhteydessä lisätoimintoja (esimerkiksi navigointi)
    item.addEventListener("click", () => {
        const content = item.querySelector(".timeline-content");
        if (content) {
            content.classList.toggle("visible");
        }
    });
});

// Responsiivisuus: Tehdään aikajana responsiiviseksi skrollauksen kanssa
const timelineContainer = document.querySelector("#future-goals .timeline");
let isScrolling = false;

timelineContainer.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (!isScrolling) {
        isScrolling = true;
        if (event.deltaY > 0) {
            // Scrollaa oikealle
            timelineContainer.scrollBy({ left: 300, behavior: "smooth" });
        } else {
            // Scrollaa vasemmalle
            timelineContainer.scrollBy({ left: -300, behavior: "smooth" });
        }
        setTimeout(() => (isScrolling = false), 500);
    }
});
