const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region')
let allCountriesData 
const searchInput = document.querySelector('.search-container input')
const themeSwitcher = document.querySelector('.theme-switcher')
const body = document.querySelector('body')
const themeSwitcherText = document.querySelector('.theme-switcher span')
const themeSwitcherIcon = document.querySelector('.icon')


function renderCountries(data){
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    //console.log(country)
    const countryCard = document.createElement('a');

    countryCard.classList.add('country-card');
    countryCard.href = `/country.html?name=${country.name.common}`

    countryCard.innerHTML = `
        <img src=${country.flags.svg} alt=${country.name.common} />
        <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital?.[0]}</p>
        </div>
`;
    countriesContainer.append(countryCard);
         

  });
}

fetch('countries.json')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  });

  filterByRegion.addEventListener('change', () => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then((res) => res.json())
  .then(renderCountries)
  })

  searchInput.addEventListener('input', (e) => {
    //console.log(e.target.value);
    //console.log(allCountriesData)
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filteredCountries);
    renderCountries(filteredCountries)
  })



  themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark')
    if (body.className === 'dark') {
      themeSwitcherText.innerText = 'Light Mode'
      themeSwitcherIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`
      themeSwitcherIcon.classList.remove = `fa-regular`
      themeSwitcherIcon.classList.remove = `fa-moon`
    } else if (body.className !== 'dark') {
      themeSwitcherText.innerText = 'Dark Mode'
      themeSwitcherIcon.innerHTML = `<i class="fa-regular fa-moon"></i>`
      themeSwitcherIcon.classList.remove = `fa-regular`
      themeSwitcherIcon.classList.remove = `fa-moon`
    }
  })
  

  
  
  