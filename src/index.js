import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 1000;
const refs = {
    searchBox: document.querySelector('input'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
    const countryName = refs.searchBox.value;
    const findUrl = `https://restcountries.com/v2/name/${countryName}`;
    Notiflix.Notify.info(countryName);
    console.log(findUrl);
    fetch(findUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log('Data>>>>', data);
            console.log('Name.official>>>>', data[0].name);
            console.log('capital>>>>', data[0].capital);
            console.log('population>>>>', data[0].population);
            console.log('flags>>>>', data[0].flags.svg);
            console.log('languages>>>>', langIterator(data[0].languages)
                .toString().split(',').join(', '));
            
        refs.countryInfo.innerHTML = '';
           refs.countryInfo.innerHTML = `
            <div class='flag-country'>
            <img class='flag-img'  src='${data[0].flags.svg}'> 
            <h2>${data[0].name}</h2>
            </div>
            <div class='details-div'>
            <ul class='list'>
            <li class='item'>Capital: <span class="text-span">${data[0].capital}</span></li>
            <li class='item'>Population: <span class="text-span"> ${data[0].population} people</span></li>
            <li class='item'>Languages: <span class="text-span">${langIterator(data[0].languages)
                .toString().split(',').join(', ')}</span></li>
            </ul>
            
            
            </div>

            `;          
        })
        .catch((data) => {
            if ( data[0].status == 404) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
        });
}


function langIterator(data) {
    return data.map(a => a.name);

}