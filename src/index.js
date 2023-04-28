import './css/styles.css';
import PixabayService from './api-pixabay';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const searchForm = document.querySelector('#search-form');
const photosGallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');

const pixabayService = new PixabayService();
loadBtn.classList.add("hidden");

searchForm.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onLoadMore)

function onSearch(event) {
    event.preventDefault();
    
    pixabayService.searchQuery = event.currentTarget.elements.searchQuery.value;
    if (pixabayService.searchQuery === '') {
        return;
    }
    pixabayService.resetPage();
    pixabayService.getPhotos().then(data => {
        if (data.totalHits === 0) {
            clearGallery()
            loadBtn.classList.add("hidden");
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        } else {
            Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }
        clearGallery();
        if (data.totalHits > pixabayService.per_page) {
            loadBtn.classList.remove("hidden");
        }
        appendGalleryMarkup(data.hits);
    });
    
}
function onLoadMore() {
    if (pixabayService.searchQuery === '') {
        return;
    }

    pixabayService.getPhotos().then(data => {
        appendGalleryMarkup(data.hits);
        if (pixabayService.page >= data.totalHits / pixabayService.per_page) {
            loadBtn.classList.add("hidden");
            Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    });
}

function appendGalleryMarkup(hits) {
    const markup = hits.map(({ comments, downloads, likes, views, tags, webformatURL, largeImageURL }) => {
        return `
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </div>`
    }).join('');

    photosGallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
    photosGallery.innerHTML = '';
}