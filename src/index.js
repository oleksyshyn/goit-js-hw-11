import './css/styles.css';
import PixabayService from './api-pixabay';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import templateFunction from './template.hbs';

const searchForm = document.querySelector('#search-form');
const photosGallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const pixabayService = new PixabayService();

searchForm.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onLoadMore)

function onSearch(event) {
    event.preventDefault();
    pixabayService.query = event.currentTarget.elements.searchQuery.value;
    pixabayService.resetPage();
    pixabayService.getPhotos().then(appendGalleryMarkup);
}
function onLoadMore(event) {
    pixabayService.getPhotos().then(appendGalleryMarkup);
}

function appendGalleryMarkup(hits) {
    photosGallery.insertAdjacentHTML('beforeend', templateFunction(hits));
}
