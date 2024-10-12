// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// let initialLoad = true;

let count = 5;
// const apiKey = 'NYYIArNqBto2tvmXYimjXYa36iwMbxDWawMNRIxvDcs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were imageLoaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // initialLoad = false;
    count = 30;
    // console.log('ready =', ready);
  }
}

//helper function to set attributes on dom element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // console.log('totalImages', totalImages);
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// check to see if scrolling near bottom of page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    // console.log('load more')
    ready = false;
    getPhotos();
  }
})

getPhotos();
