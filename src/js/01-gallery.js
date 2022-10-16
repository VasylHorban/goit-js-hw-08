import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items';

const galleryElements = galleryItems.map(item => {
  return `<a class="gallery__item" href="${item.original}"><img class="gallery__image" title="${item.description}" alt="${item.description}" 
    src="${item.preview}"/></a>`;
});

document
  .querySelector('.gallery')
  .insertAdjacentHTML('afterbegin', galleryElements.join(''));

new SimpleLightbox('.gallery a', { captionDelay: 250 });
