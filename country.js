const countryName = new URLSearchParams(location.search).get('name');
const flagImage = document.querySelector('.country-details img')
const countryNameh1 = document.querySelector('.detailed-text-container h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currency = document.querySelector('.currency')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const themeSwitcher = document.querySelector('.theme-switcher')
const themeSwitcherText = document.querySelector('.theme-switcher span')
const body = document.querySelector('body')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    console.log(country)
    flagImage.src = country.flags.svg
    countryNameh1.innerHTML = country.name.common

    if(country.name.nativeName) {
    nativeName.innerHTML = Object.values(country.name.nativeName)[0].common
    } else {
        nativeName.innerHTML = country.name.common
    }

    population.innerHTML = country.population.toLocaleString('en-IN')
    region.innerHTML = country.region

    if (country.subregion) {
        subRegion.innerHTML = country.subregion
    }

    if(country.capital) {
        capital.innerHTML = country.capital?.[0]

    }
    topLevelDomain.innerHTML = country.tld.join(', ')
    // currency.innerHTML = country.currencies.XCD.name

    if(country.currencies) {
        currency.innerHTML = Object.values(country.currencies).map((currency) => currency.name).join(', ');
      }
    
      if (country.languages) {
        languages.innerHTML = Object.values(country.languages).join(', ');

      } 

      if (country.borders) {
        country.borders.forEach((border) => {
            console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountryData]) => {
                // console.log(borderCountryData)
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountryData.name.common
                borderCountryTag.href = `country.html?name=${borderCountryData.name.common}`
                //console.log(borderCountryTag);
                borderCountries.append(borderCountryTag)
                
                
            })
        }
        )
      }
    
})

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark')
    if (body.className === 'dark') {
        themeSwitcherText.innerText = 'Light Mode'
      } else {
        themeSwitcherText.innerText = 'Dark Mode'
      }
  })


// console.log(country.name.nativeName.eng.official);
