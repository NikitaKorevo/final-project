"use strict";

const indexFilm = JSON.parse(localStorage.getItem('localIndexFilm'));
const content = JSON.parse(localStorage.getItem('localContent'));
const main = document.getElementById('mainAboutFilm');
const GenreFilmId = content[indexFilm].genre_ids;
let strGenre = 'Жанры:';

// Функция, которая получает жанры выбранного фильма через API
getGenre();
async function getGenre() {
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ru-RU&api_key=7bbcabd7451880efd46ec7f3f3b268c2');
  const arrGenres = await response.json();

  for (let i = 0; i < arrGenres.genres.length; i++) {
    for (let j = 0; j < GenreFilmId.length; j++) {
      if (GenreFilmId[j] === arrGenres.genres[i].id) {
        strGenre += ' ' + arrGenres.genres[i].name + ',';
      }
    }
  }
  strGenre = strGenre.slice(0, strGenre.length - 1);
  drawingContent();
}

// Функция, которая отображает информацию о фильма
function drawingContent() {
  // лого
  const logoImg = document.createElement('img');
  logoImg.classList.add('main-aboutfilm__link-home');
  logoImg.setAttribute('src', './images/content/house.svg');
  const link = document.createElement('a');
  link.setAttribute('href', '/');
  link.append(logoImg);
  main.append(link);

  // постер
  const img = document.createElement('img');
  let nodeAttributeSrc = 'https://image.tmdb.org/t/p/w300' + content[indexFilm].poster_path;
  if (content[indexFilm].poster_path === null) nodeAttributeSrc = './images/content/notFoundImage.jpg';
  img.setAttribute('src', nodeAttributeSrc);
  img.classList.add('main-aboutfilm__poster');
  main.append(img);

  // article, в нем весь контент
  const article = document.createElement('article');
  article.classList.add('main-aboutfilm__content');
  main.append(article);

  // заголовок
  const title = document.createElement('h2');
  const nodeTitle = document.createTextNode(content[indexFilm].title);
  title.append(nodeTitle);
  title.classList.add('main-aboutfilm-content__title');
  article.append(title);

  // Жанр
  const pGenre = document.createElement('p');
  const nodeGenre = document.createTextNode(strGenre);
  pGenre.append(nodeGenre);
  pGenre.classList.add('main-aboutfilm-content__genre');
  article.append(pGenre);

  // Описание
  const pOverview = document.createElement('p');
  const nodeOverview = document.createTextNode(content[indexFilm].overview);
  pOverview.append(nodeOverview);
  pOverview.classList.add('main-aboutfilm-content__description');
  article.append(pOverview);

  // Дата релиза
  const pRelease = document.createElement('p');
  const nodeRelease = document.createTextNode('Дата релиза: ' + content[indexFilm].release_date);
  pRelease.append(nodeRelease);
  pRelease.classList.add('main-aboutfilm-content__release-date');
  article.append(pRelease);

  // Рейтинг
  const pVoteAverage = document.createElement('p');
  const nodeVoteAverage = document.createTextNode('Рейтинг: ' + content[indexFilm].vote_average);
  pVoteAverage.append(nodeVoteAverage);
  pVoteAverage.classList.add('main-aboutfilm-content__rating');
  article.append(pVoteAverage);

  // Проголосовало n человек
  const pVoteCounty = document.createElement('p');
  const nodeVoteCounty = document.createTextNode('Проголосовало: ' + content[indexFilm].vote_count + ' человек');
  pVoteCounty.append(nodeVoteCounty);
  pVoteCounty.classList.add('main-aboutfilm-content__voted');
  article.append(pVoteCounty);

  // Очки популярности
  const pPopularity = document.createElement('p');
  const nodePopularity = document.createTextNode(`Очков популярности: ${Math.floor(content[indexFilm].popularity)}`);
  pPopularity.append(nodePopularity);
  pPopularity.classList.add('main-aboutfilm-content__popularity-index');
  article.append(pPopularity);
}
