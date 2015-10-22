/**
 * @author Leon K.
 */

//Global variables
var images = [];
var index = 0;
/**
 * OnLoad
 */
window.onload = function () {
    requestApiImages();
};


/**
 * Next image.
 */
function nextImage() {
    if (index < images.length - 1) {
        var i = ++index;
        document.getElementById('imageSlide').src = images[i].link;
        document.getElementById('sliderCount').textContent = (i + 1) + '/' + images.length;
        document.getElementById('imageTitle').textContent = images[i].title;
    }
}

/**
 * Previous image.
 */
function prevImage() {
    if (index > 0) {
        var i = --index;
        document.getElementById('imageSlide').src = images[i].link;
        document.getElementById('sliderCount').textContent = (i + 1) + '/' + images.length;
        document.getElementById('imageTitle').textContent = images[i].title;
    }
}
/**
 * Reset image scroller position.
 */
function resetPosition() {
    index = 0;
    document.getElementById('imageSlide').src = images[index].link;
    document.getElementById('sliderCount').textContent = index + 1 + '/' + images.length;
    document.getElementById('imageTitle').textContent = images[index].title;
}

/**
 * HTTP request.
 */
function requestApiImages() {
    var galleryUrl = 'https://api.imgur.com/3/gallery';
    createGalleryRequest('GET', galleryUrl);
}

/**
 * Get images in a gallery.
 * @param methodType
 * @param url
 */
function createGalleryRequest(methodType, url) {
    var request = new XMLHttpRequest();
    var dataType = 'application/json';
    var token = 'Bearer 8d4b08967da8d738816580691de7efc6b56f2076';
    //Handle response
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var response = JSON.parse(request.responseText);
            //Save images
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].type === 'image/jpeg' && response.data[i].nsfw === false) {
                    images.push({title: response.data[i].title, link: response.data[i].link + '.jpg'});
                }
            }
            document.getElementById('imageSlide').src = images[0].link;
            document.getElementById('sliderCount').textContent = (index + 1) + '/' + images.length;
            document.getElementById('imageTitle').textContent = images[0].title;
        }
        else if (request.status === 403) {
            //API auth tokens are timed
            alert('Your API Authentication Token has expired.  Please renew.');
            console.log(request);
        }
    };
    //Authenticated GET request
    request.open(methodType, url, true);
    request.setRequestHeader('Authorization', token);
    request.setRequestHeader('Accept', dataType);
    request.send(null);
}