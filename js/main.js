/**
 * @author Leon K.
 */

var images = [];
var index = 0;

window.onload = function () {
    //OnLoad calls
    requestApiImages();
};


/**
 * Next image.
 */
function nextImage() {
    if (index < images.length - 1) {
        console.log('NEXT - ' + (index + 1) + '/' + images.length);
        document.getElementById('imageSlide').src = images[++index].link;
    }
}

/**
 * Previous image.
 */
function prevImage() {
    if (index > 0) {
        console.log('PREV - ' + (index + 1) + '/' + images.length);
        document.getElementById('imageSlide').src = images[--index].link;
    }
}
/**
 * Reset image scroller position.
 */
function resetPosition() {
    index = 0;
    document.getElementById('imageSlide').src = images[0].link;
}

/**
 * HTTP request.
 */
function requestApiImages() {
    var galleryUrl = 'https://api.imgur.com/3/gallery';
    createGalleryRequest('GET', galleryUrl);
}

/**
 * Get all image Ids in a gallery.
 * @param methodType
 * @param url
 */
function createGalleryRequest(methodType, url) {
    var request = new XMLHttpRequest();
    var dataType = 'application/json';
    var token = 'Bearer f3a41fc4887671e74479acd921ca5161c168fbc1';
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var response = JSON.parse(request.responseText);
            //Save list of image IDs
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].type === 'image/jpeg' && response.data[i].nsfw === false) {
                    images.push({title: response.data[i].title, link: response.data[i].link + '.jpg'});
                }
            }
            document.getElementById('imageSlide').src = images[0].link;
            console.log('IMAGE IDs:');
            console.log(response);
        } else if (request.status === 403) {
            //API auth token sessions are timed
            alert('Your API Authentication Token has expired.  Please renew.')
        }
        //createImageRequest(methodType, url);
    };
    //Authenticated GET
    request.open(methodType, url, true);
    request.setRequestHeader('Authorization', token);
    request.setRequestHeader('Accept', dataType);
    request.send(null);
}