"use strict";
const demo = () => 'Webpack Boilerplate v5.6.0 - SASS/PostCSS, ES6/7, browser sync, source code listing and more.';

console.log(demo());
/* Ключ: 7bbcabd7451880efd46ec7f3f3b268c2

Запрос на получения фильма  популярности (убывание)
https://api.themoviedb.org/3/discover/movie?api_key=7bbcabd7451880efd46ec7f3f3b268c2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 

популярности (возрастание)
https://api.themoviedb.org/3/discover/movie?api_key=7bbcabd7451880efd46ec7f3f3b268c2&language=ru-RU&sort_by=popularity.asc&include_adult=false&include_video=false&page=1

рейтингу (убывание)
https://api.themoviedb.org/3/discover/movie?api_key=7bbcabd7451880efd46ec7f3f3b268c2&language=ru-RU&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1

рейтингу (возрастание)
https://api.themoviedb.org/3/discover/movie?api_key=7bbcabd7451880efd46ec7f3f3b268c2&language=ru-RU&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1

дате релиза (убывание)
https://api.themoviedb.org/3/discover/movie?api_key=7bbcabd7451880efd46ec7f3f3b268c2&language=ru-RU&sort_by=release_date.desk&include_adult=false&include_video=false&page=1

дате релиза (возрастание)
https://api.themoviedb.org/3/discover/movie?api_key=7bbcabd7451880efd46ec7f3f3b268c2&language=ru-RU&sort_by=release_date.asc&include_adult=false&include_video=false&page=1


главная страница https://developers.themoviedb.org/3/discover/movie-discover
Получить фильмы по жанрам:
https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=7bbcabd7451880efd46ec7f3f3b268c2

аватарка фильма:
https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg

https://api.themoviedb.org/3/discover/movie?api_key=7bbcabd7451880efd46ec7f3f3b268c2&sort_by=vote_count.desc&page=1

*/

const myUl = document.getElementById('myUl');
const ApiKey = '7bbcabd7451880efd46ec7f3f3b268c2';
let whichSorting = 'popularity.desc';
let content;

const sortingPopularityDecrease = 'popularity.desc';
const sortingPopularityIncrease = 'popularity.asc';
const sortingRatingDecrease = 'vote_average.desc';
const sortingRatingIncrease = 'vote_average.asc';
const sortingReleaseDecrease = 'release_date.desk';
const sortingReleaseIncrease = 'release_date.asc';

getResponse(whichSorting);

async function getResponse(whichSorting) {
  let response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&language=ru-RU&sort_by=' + whichSorting + '&include_adult=false&include_video=false&page=1');
  content = await response.json();
  //console.log(content);
  //console.log(content.results[1]);
  createCards();
}

function createCards() {
  //console.log(content.results.length);
  //content.results.length
  for (let i = 0; i < content.results.length; i++) {

    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const pRating = document.createElement('p');
    const pRelease = document.createElement('p');

    let  nodeTitle = document.createTextNode(content.results[i].title);
    let  nodeAttributeSrc = 'https://image.tmdb.org/t/p/w300' + content.results.[i].poster_path;
    let  nodeRating = document.createTextNode('Рейтинг: ' + content.results[i].vote_average);
    let  nodeRelease = document.createTextNode('Дата релиза: ' + content.results[i].release_date);

    h2.appendChild(nodeTitle);
    pRating.appendChild(nodeRating);
    pRelease.appendChild(nodeRelease);
    
    li.appendChild(img);
    li.appendChild(pRating);
    li.appendChild(pRelease);
    li.appendChild(h2);
    
    li.classList.add('all-cards__card');
    h2.classList.add('all-cards-card__title');
    img.classList.add('all-cards-card__img');
    img.setAttribute('src', nodeAttributeSrc);
    pRating.classList.add('all-cards-card__rating');
    pRelease.classList.add('all-cards-card__release');
    
    myUl.appendChild(li);
  }
}

document.getElementById('SelectSorting').onchange = function() {
  myUl.innerHTML = "";
  
  //console.log(this.options[this.selectedIndex].value);


   switch (this.options[this.selectedIndex].value) {
    case 'popularity-decrease':
      console.log('1');
      whichSorting = sortingPopularityDecrease;
      break;

    case 'popularity-increase':
      console.log('2');
      whichSorting = sortingPopularityIncrease;
      break;

    case 'rating-decrease':
      console.log('3')
      whichSorting = sortingRatingDecrease;
      break;

    case 'rating-increase':
      console.log('4');
      whichSorting = sortingRatingIncrease;
      break;

    case 'release-decrease':
      console.log('5');
      whichSorting = sortingReleaseDecrease;
      break;

    case 'release-increase':
      console.log('6');
      whichSorting = sortingReleaseIncrease;
      break;

    default:
      console.log('Error with sorting');
      break;
  }

  getResponse(whichSorting);
}
