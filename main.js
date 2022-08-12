// header
let fixedNav = document.querySelector('.header');
let scrollBtn = document.querySelector('.scroll-btn');

window.addEventListener('scroll', () => {
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active')
    // scroll btn
    window.scrollY > 400 ? scrollBtn.classList.add('active') : scrollBtn.classList.remove('active');
})

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top : 0 , behavior : "smooth"
    })
})
// star explore
let startBtn = document.querySelector('.title .btn'),
    hadithSection = document.querySelector('.hadith');

startBtn.addEventListener("click", ()=> {
    hadithSection.scrollIntoView({
        behavior : "smooth"
    })
})


// Hadeith change
let hadithContent = document.querySelector('.hadith-container .hadith-content'),
    prev = document.querySelector('.hadith-btns .prev'),
    next = document.querySelector('.hadith-btns .next'),
    number = document.querySelector('.hadith-container .number');

// hadithChanger();
// function hadithChanger() {
//         let hadithIndex = 0;
//         fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300").then(response => response.json())
//         .then(data => {
//             let hadiths = data.data.hadiths;
//             changeHadith();
//             prev.addEventListener('click', () => {
//                 hadithIndex == 0 ? hadithIndex = 299 : hadithIndex--;
//                 changeHadith();
//             })
//             next.addEventListener('click', () => {
//                 hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++;
//                 changeHadith();
//             })
//         function changeHadith() {
//         hadithContent.innerHTML = hadiths[hadithIndex].arab;
//         number.innerHTML = `${hadithIndex + 1} - 300`;
//         }
//     })
// }


// section links
let sectionLinks = document.querySelectorAll('section'),
    links = document.querySelectorAll('.header ul li');

links.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;

        sectionLinks.forEach(section => {
            if (section.classList.contains(target)) {
                section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        })
    })
})

// quran
let surahsContainer = document.querySelector('.surahs-container');
getSoret();
function getSoret() {
    fetch("http://api.alquran.cloud/v1/meta")
        .then(result => result.json())
        .then(data => {
            surahsContainer.innerHTML = "";
            let surahs = data.data.surahs.references;
            surahs.forEach(surah => {
                surahsContainer.innerHTML += `
                    <div class="surah">
                        <p>${surah.name}</p>
                        <p>${surah.englishName}</p>
                    </div>
                `
            })

            let surahsTitles = document.querySelectorAll('.surah');
            let popup = document.querySelector('.surah-popup'),
                ayatContainer = document.querySelector('.ayat');
            surahsTitles.forEach((title, index) => {
                title.addEventListener('click', () => {
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`).then(result => result.json())
                        .then(data => {
                            ayatContainer.innerHTML = "";
                            let ayat = data.data.ayahs;
                            ayat.forEach(aya => {
                                popup.classList.add('active');
                                ayatContainer.innerHTML += `
                                    <p> (${aya.numberInSurah}) - ${aya.text} </p>
                                `
            })
                    })
                })
            })

            let closePopup = document.querySelector('.close-popup');
            closePopup.addEventListener('click', () => {
                popup.classList.remove('active');
            })
        })
}

// pray time 
let cards = document.querySelector('.cards');
getPrayTime();
function getPrayTime() {
    fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
    .then(result => result.json())
    .then(data => {
        cards.innerHTML = "";
        let times = data.data.timings;
        for (let time in times) {
            cards.innerHTML +=
            `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <circle cx="100" cy="100" r="100"></circle>
                        </svg>
                        <div class="pray-time"> ${times[time]} </div>
                    </div>
                    <p>${time}</p>
                </div>
            `
        }
    })
}

// responsive section (bars)
let bars = document.querySelector('.bars'),
    sideBar = document.querySelector('.header ul');

bars.addEventListener( 'click', ()=> {
    sideBar.classList.toggle('active');
})

















































